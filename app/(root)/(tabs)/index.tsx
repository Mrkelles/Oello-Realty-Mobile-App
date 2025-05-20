import { Card, FeaturedCard } from "@/components/Cards";
import Filter from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
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

            <FlatList
              data={[1, 2, 3]}
              renderItem={({ item }) => <FeaturedCard />}
              keyExtractor={(item) => item.toString()}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5 mt-5"
            />


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
