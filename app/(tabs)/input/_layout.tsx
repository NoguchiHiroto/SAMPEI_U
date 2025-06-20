import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tabs, TabBarIcon } from '@/assets/common/footer';
import Input from './index';

export default function GraphLayout() {
  const colorScheme = useColorScheme();

  return (
    <Input />
  );
}