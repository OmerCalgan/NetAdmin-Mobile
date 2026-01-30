import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { PortItem } from '@/constants/PortsData';
import ThemedText from './ThemedText';

interface PortListItemProps {
  item: PortItem;
}

function PortListItem({ item }: PortListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.portCircle}>
        <ThemedText style={styles.portNumber}>{item.port}</ThemedText>
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <ThemedText style={styles.serviceName}>{item.service}</ThemedText>
          <View style={styles.protocolPill}>
            <ThemedText style={styles.protocolText}>{item.protocol}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description} numberOfLines={2}>
          {item.description}
        </ThemedText>
      </View>
    </View>
  );
}

export default memo(PortListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.1)',
  },
  portCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  portNumber: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.textPrimary,
  },
  protocolPill: {
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  protocolText: {
    fontSize: 11,
    fontWeight: 'bold' as const,
    color: Colors.secondary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
