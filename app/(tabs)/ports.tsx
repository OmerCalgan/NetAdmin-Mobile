import React, { useState, useMemo, useCallback } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, SearchX } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { PORTS_DATA, PortItem } from '@/constants/PortsData';
import ThemedText from '@/components/ThemedText';
import PortListItem from '@/components/PortListItem';

export default function PortsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPorts = useMemo(() => {
    if (!searchQuery.trim()) {
      return PORTS_DATA;
    }
    
    const query = searchQuery.toLowerCase();
    return PORTS_DATA.filter(port => 
      port.port.toString().includes(query) ||
      port.service.toLowerCase().includes(query) ||
      port.description.toLowerCase().includes(query) ||
      port.protocol.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const renderItem = useCallback(({ item }: { item: PortItem }) => (
    <PortListItem item={item} />
  ), []);

  const keyExtractor = useCallback((item: PortItem) => item.port.toString(), []);

  const ListEmptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <SearchX size={48} color={Colors.textSecondary} />
      <ThemedText style={styles.emptyText}>
        No ports found matching your search
      </ThemedText>
    </View>
  ), []);

  const ListHeaderComponent = useMemo(() => (
    <View style={styles.listHeader}>
      <ThemedText style={styles.resultCount}>
        {filteredPorts.length} {filteredPorts.length === 1 ? 'port' : 'ports'} found
      </ThemedText>
    </View>
  ), [filteredPorts.length]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <ThemedText variant="title">Port Reference</ThemedText>
        <ThemedText style={styles.subtitle}>
          Common network ports and protocols
        </ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search port, service, or description..."
          placeholderTextColor={Colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          testID="port-search-input"
        />
        {searchQuery.length > 0 && (
          <Pressable 
            onPress={handleClear} 
            style={styles.clearButton}
            hitSlop={8}
          >
            <X size={18} color={Colors.textSecondary} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredPorts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  resultCount: {
    color: Colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
