import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  Platform,
  Animated,
  RefreshControl,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wifi, RefreshCw } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import ThemedText from '@/components/ThemedText';
import GlowCard from '@/components/GlowCard';
import { getAllNetworkInfo, NetworkInfo } from '@/utils/networkInfo';

export default function MyIpScreen() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [glowAnim]);

  const fetchNetworkInfo = useCallback(async () => {
    try {
      setError(null);
      const info = await getAllNetworkInfo();
      setNetworkInfo(info);
      console.log('Network info fetched:', info);
    } catch (err) {
      console.error('Error fetching network info:', err);
      setError('Unable to fetch IP - Check network permissions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNetworkInfo();
  }, [fetchNetworkInfo]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNetworkInfo();
  }, [fetchNetworkInfo]);

  const handleCopy = useCallback(async () => {
    if (!networkInfo?.ipAddress) return;

    try {
      await Clipboard.setStringAsync(networkInfo.ipAddress);
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      setCopied(true);
      
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [networkInfo?.ipAddress, pulseAnim]);

  const ipTextShadow = glowAnim.interpolate({
    inputRange: [0.4, 0.8],
    outputRange: ['rgba(0, 212, 255, 0.3)', 'rgba(0, 212, 255, 0.6)'],
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Animated.View style={[styles.iconContainer, { shadowOpacity: glowAnim }]}>
            <Wifi size={48} color={Colors.primary} />
          </Animated.View>

          <ThemedText variant="caption" style={styles.label}>
            YOUR DEVICE
          </ThemedText>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ThemedText style={styles.loadingText}>Detecting...</ThemedText>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
              <Pressable style={styles.refreshButton} onPress={handleRefresh}>
                <RefreshCw size={18} color={Colors.primary} />
                <ThemedText style={styles.refreshText}>Refresh</ThemedText>
              </Pressable>
            </View>
          ) : (
            <>
              <Animated.Text style={[styles.ipAddress, { textShadowColor: ipTextShadow }]}>
                {networkInfo?.ipAddress || 'N/A'}
              </Animated.Text>

              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Pressable 
                  style={[
                    styles.copyButton,
                    copied && styles.copyButtonCopied
                  ]} 
                  onPress={handleCopy}
                  testID="copy-button"
                >
                  <ThemedText style={[
                    styles.copyButtonText,
                    copied && styles.copyButtonTextCopied
                  ]}>
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </ThemedText>
                </Pressable>
              </Animated.View>
            </>
          )}
        </View>

        {networkInfo && !error && (
          <View style={styles.infoGrid}>
            <GlowCard style={styles.infoCard} glowColor={Colors.secondary}>
              <View style={styles.cardAccent} />
              <ThemedText variant="caption">DEVICE</ThemedText>
              <ThemedText style={styles.cardValue} numberOfLines={1}>
                {networkInfo.deviceName}
              </ThemedText>
            </GlowCard>

            <GlowCard style={styles.infoCard} glowColor={Colors.secondary}>
              <View style={styles.cardAccent} />
              <ThemedText variant="caption">CONNECTION</ThemedText>
              <ThemedText style={styles.cardValue}>
                {networkInfo.networkType}
              </ThemedText>
            </GlowCard>
          </View>
        )}

        <View style={styles.decorativeLine} />
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 8,
  },
  label: {
    marginBottom: 8,
  },
  ipAddress: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    fontFamily: monoFont,
    color: Colors.primary,
    marginVertical: 16,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    marginVertical: 24,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 18,
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    gap: 8,
  },
  refreshText: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  copyButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  copyButtonCopied: {
    borderColor: Colors.secondary,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
  },
  copyButtonText: {
    color: Colors.primary,
    fontWeight: '600' as const,
    fontSize: 16,
  },
  copyButtonTextCopied: {
    color: Colors.secondary,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  infoCard: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.secondary,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.textPrimary,
    marginTop: 8,
  },
  decorativeLine: {
    height: 2,
    backgroundColor: Colors.border,
    marginTop: 40,
    marginHorizontal: 60,
    borderRadius: 1,
  },
});
