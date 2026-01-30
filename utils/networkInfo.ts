import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Device from 'expo-device';

export type NetworkType = 'WiFi' | 'Cellular' | 'Ethernet' | 'Unknown';

export interface NetworkInfo {
  ipAddress: string | null;
  networkType: NetworkType;
  deviceName: string;
}

export async function getLocalIP(): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      return 'Web Client';
    }
    
    const netInfo = await NetInfo.fetch();
    
    if (netInfo.type === 'wifi' && netInfo.details) {
      const details = netInfo.details as { ipAddress?: string };
      return details.ipAddress || null;
    }
    
    if (netInfo.type === 'cellular') {
      return 'Cellular Network';
    }
    
    return null;
  } catch (error) {
    console.log('Error fetching IP:', error);
    return null;
  }
}

export async function getNetworkType(): Promise<NetworkType> {
  try {
    if (Platform.OS === 'web') {
      return 'Unknown';
    }
    
    const netInfo = await NetInfo.fetch();
    
    switch (netInfo.type) {
      case 'wifi':
        return 'WiFi';
      case 'cellular':
        return 'Cellular';
      case 'ethernet':
        return 'Ethernet';
      default:
        return 'Unknown';
    }
  } catch (error) {
    console.log('Error fetching network type:', error);
    return 'Unknown';
  }
}

export function getDeviceName(): string {
  if (Platform.OS === 'web') {
    return 'Web Browser';
  }
  
  return Device.deviceName || Device.modelName || 'Unknown Device';
}

export async function getAllNetworkInfo(): Promise<NetworkInfo> {
  const [ipAddress, networkType] = await Promise.all([
    getLocalIP(),
    getNetworkType()
  ]);
  
  return {
    ipAddress,
    networkType,
    deviceName: getDeviceName()
  };
}
