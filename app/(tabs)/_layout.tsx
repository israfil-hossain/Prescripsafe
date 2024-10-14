import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          borderTopColor: "gray",
          borderTopLeftRadius: 30, 
          borderTopRightRadius:30,
          paddingBottom: 8,
          paddingTop: 2, 
          height: 65, 
        },
      }}
      
      >
      <Tabs.Screen
        name="mytrip"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-sharp' : 'home-outline'} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
            fontFamily: "outfit"
          }
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'globe-sharp' : 'globe-outline'} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
            fontFamily: "outfit"
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people-circle' : 'people-circle'} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
            fontFamily: "outfit"
          }
        }}
      />
    </Tabs>
  );
}
