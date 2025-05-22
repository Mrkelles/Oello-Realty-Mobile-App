import { Card, FeaturedCard } from "@/components/Cards";
import Filter from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{
    query?: string;
    filter?: string;
  }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getLatestProperties });
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  })

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  }

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item}
          onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large"
              className="text-primary-300 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row mt-5 items-center justify-between">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }}
                  className="size-12 rounded-full" />

                <View className="flex flex-col ml-2 items-start justify-center">
                  <Text className="text-xs text-black-100">Good Morning</Text>
                  <Text className="text-base font-medium text-black-300">{user?.name}</Text>
                </View>

              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {latestPropertiesLoading ?
              <ActivityIndicator size="large" className="text-primary-300" />
              : !latestProperties || latestProperties.length === 0 ?
                <NoResults /> : (
                  <FlatList
                    data={latestProperties}
                    renderItem={({ item }) => <FeaturedCard item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />}
                    keyExtractor={(item) => item.$id}
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                  />
                )}



            {/* 
            <View className="flex flex-row gap-5 mt-5">
              <FeaturedCard />
              <FeaturedCard />
              <FeaturedCard />
            </View>
            */}

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-bold text-black-300">
                  Our Recommendations
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Filter />

              {/* 
                <View className="flex flex-row gap-5 mt-5">
                <Card />
                <Card />
                </View>
                */}
            </View>

          </View>
        }
      />








    </SafeAreaView>
  );
}