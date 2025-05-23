import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'

const TabsLayout = () => {

    const TabIcon = ({ focused, icon, title, }: {
        focused: boolean;
        icon: ImageSourcePropType;
        title: string;
    }) => (
        <View className='flex-1 mt-3 flex flex-col items-center'>
            <Image
                source={icon}
                tintColor={focused ? '#0061FF' : '#666876'}
                className='size-6'
                resizeMode='contain'
            />
            <Text
                className={`${focused
                    ? "text-primary-300 font-rubik-medium"
                    : "text-black-200 font-rubik"
                    } text-xs w-full text-center mt-1`}
            >
                {title}
            </Text>
        </View>
    )
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    borderTopColor: '#0061FF1A',
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title='Home'
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title='Explore'
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title='Profile'
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout