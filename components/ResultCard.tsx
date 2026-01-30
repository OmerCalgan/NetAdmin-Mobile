import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '@/constants/colors';
import ThemedText from './ThemedText';

interface ResultCardProps {
  title: string;
  value: string;
  accentColor?: string;
  largeValue?: boolean;
}

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

export default function ResultCard({ 
  title, 
  value, 
  accentColor = Colors.primary,
  largeValue = false 
}: ResultCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <ThemedText variant="caption">{title}</ThemedText>
      <ThemedText 
        variant="mono" 
        style={[
          styles.value,
          largeValue && styles.largeValue
        ]}
      >
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  value: {
    marginTop: 6,
    fontFamily: monoFont,
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  largeValue: {
    fontSize: 24,
    color: Colors.primary,
  },
});
