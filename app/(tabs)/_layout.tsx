import { Tabs } from 'expo-router';
import { Calculator, Globe, Wifi } from 'lucide-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: Colors.textPrimary,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="calc"
        options={{
          title: 'Calc',
          headerTitle: 'NetAdmin',
          tabBarIcon: ({ color, size }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ports"
        options={{
          title: 'Ports',
          headerTitle: 'NetAdmin',
          tabBarIcon: ({ color, size }) => (
            <Globe size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myip"
        options={{
          title: 'MyIP',
          headerTitle: 'NetAdmin',
          tabBarIcon: ({ color, size }) => (
            <Wifi size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(21, 27, 61, 0.98)',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    height: 85,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  header: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
