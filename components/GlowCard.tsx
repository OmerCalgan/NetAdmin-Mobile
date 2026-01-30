import React, { useEffect, useRef } from 'react';
import { View, ViewStyle, StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/colors';

interface GlowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  animated?: boolean;
}

export default function GlowCard({ 
  children, 
  style, 
  glowColor = Colors.primary,
  animated = false 
}: GlowCardProps) {
  const pulseAnim = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    if (animated) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.15,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [animated, pulseAnim]);

  if (animated) {
    return (
      <Animated.View 
        style={[
          styles.card, 
          { 
            shadowColor: glowColor,
            shadowOpacity: pulseAnim,
          },
          style
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={[styles.card, { shadowColor: glowColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
});
