import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tabs, TabBarIcon } from '@/assets/common/footer';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {
        tabs.map((tab, index) => (
          <Tabs.Screen
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }: TabBarIcon) => <IconSymbol size={28} name={tab.iconName} color={color} />,
            }}
            key={index}
          />
        ))
      }
    </Tabs>
  );
}