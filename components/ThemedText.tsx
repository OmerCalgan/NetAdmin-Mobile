import React from 'react';
import { Text, TextStyle, StyleSheet, Platform } from 'react-native';
import Colors from '@/constants/colors';

type TextVariant = 'title' | 'body' | 'mono' | 'caption' | 'headline';

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: TextStyle;
  color?: string;
  numberOfLines?: number;
}

export default function ThemedText({ 
  children, 
  variant = 'body', 
  style,
  color,
  numberOfLines
}: ThemedTextProps) {
  const variantStyle = styles[variant];
  
  return (
    <Text 
      style={[variantStyle, color ? { color } : null, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.textAccent,
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  body: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '400' as const,
  },
  mono: {
    fontSize: 18,
    fontFamily: monoFont,
    color: Colors.textPrimary,
    fontWeight: 'bold' as const,
  },
  caption: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
