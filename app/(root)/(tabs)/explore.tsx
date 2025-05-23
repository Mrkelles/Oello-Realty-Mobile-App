import { Card } from "@/components/Cards";
import Filter from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {

    const params = useLocalSearchParams<{
        query?: string;
        filter?: string;
    }>();


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
            limit: 20,
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
                        <View className="flex flex-row items-center justify-between mt-5">

                            <TouchableOpacity onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-5" />
                            </TouchableOpacity>

                            <Text className="text-base mr-2 text-center font-medium text-black-300">Search For Your Ideal Home</Text>

                            <Image source={icons.bell} className="size-6" />

                        </View>
                        <Search />

                        <View className="mt-5">
                            <Filter />
                            <Text className="text-xl font-bold mt-5 text-black-300">
                                Found {properties?.length} Properties
                            </Text>
                        </View>
                    </View>
                }
            />








        </SafeAreaView>
    );
}