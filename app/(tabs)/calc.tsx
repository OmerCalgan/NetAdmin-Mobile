import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import ThemedText from '@/components/ThemedText';
import ResultCard from '@/components/ResultCard';
import { parseCIDR, calculateSubnet, SubnetResult } from '@/utils/subnetCalc';

export default function CalcScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderAnim]);

  const handleCalculate = useCallback((text: string) => {
    setInput(text);
    
    if (!text.trim()) {
      setResult(null);
      setError(null);
      return;
    }

    const parsed = parseCIDR(text);
    
    if (!parsed) {
      setResult(null);
      setError('Invalid format. Use IP/CIDR (e.g., 192.168.1.0/24)');
      return;
    }

    try {
      const subnetResult = calculateSubnet(parsed.ip, parsed.cidr);
      setResult(subnetResult);
      setError(null);
    } catch {
      setError('Calculation error');
      setResult(null);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        handleCalculate(input);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, handleCalculate]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.borderGlow],
  });

  const formatHostCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(2)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(2)}K`;
    }
    return count.toLocaleString();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <ThemedText variant="title">Subnet Calculator</ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter IP address with CIDR notation
            </ThemedText>
          </View>

          <Animated.View style={[styles.inputWrapper, { borderColor }]}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="192.168.1.0/24"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="numbers-and-punctuation"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              testID="subnet-input"
            />
          </Animated.View>

          {error && (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </View>
          )}

          {result && (
            <View style={styles.resultsContainer}>
              <ResultCard 
                title="NETWORK ID" 
                value={result.networkId} 
                accentColor={Colors.primary}
              />
              <ResultCard 
                title="BROADCAST ADDRESS" 
                value={result.broadcast} 
                accentColor={Colors.primary}
              />
              <ResultCard 
                title="SUBNET MASK" 
                value={result.subnetMask} 
                accentColor={Colors.secondary}
              />
              <ResultCard 
                title="FIRST USABLE HOST" 
                value={result.firstUsable} 
                accentColor={Colors.secondary}
              />
              <ResultCard 
                title="LAST USABLE HOST" 
                value={result.lastUsable} 
                accentColor={Colors.secondary}
              />
              <ResultCard 
                title="TOTAL USABLE HOSTS" 
                value={formatHostCount(result.totalHosts)}
                accentColor={Colors.primary}
                largeValue
              />
            </View>
          )}

          {!result && !error && (
            <View style={styles.placeholder}>
              <View style={styles.placeholderIcon}>
                <ThemedText style={styles.placeholderIconText}>⌘</ThemedText>
              </View>
              <ThemedText style={styles.placeholderText}>
                Enter an IP/CIDR to calculate subnet details
              </ThemedText>
              <View style={styles.examplesContainer}>
                <ThemedText style={styles.exampleLabel}>Examples:</ThemedText>
                <ThemedText style={styles.exampleText}>10.0.0.0/8</ThemedText>
                <ThemedText style={styles.exampleText}>172.16.0.0/16</ThemedText>
                <ThemedText style={styles.exampleText}>192.168.1.0/24</ThemedText>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const monoFont = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    fontSize: 18,
    fontFamily: monoFont,
    color: Colors.textPrimary,
  },
  errorContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
  resultsContainer: {
    marginTop: 24,
  },
  placeholder: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  placeholderIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  placeholderIconText: {
    fontSize: 32,
    color: Colors.primary,
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  examplesContainer: {
    alignItems: 'center',
  },
  exampleLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  exampleText: {
    color: Colors.primary,
    fontFamily: monoFont,
    fontSize: 14,
    marginVertical: 4,
  },
});
