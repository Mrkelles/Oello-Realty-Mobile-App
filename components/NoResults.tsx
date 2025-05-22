import images from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const NoResults = () => {
    return (
        <View className='flex-1 items-center my-5'>
            <Image source={images.noResult}
                className="w-11/12 h-80"
                resizeMode='contain' />
            <Text className='text-2xl font-bolf text-black-300 mt-5'>No Results</Text>
            <Text className='text-base text-black-100 mt-2'>
                We couldn&apos;t find any results for your search.      </Text>
        </View>
    )
}

export default NoResults