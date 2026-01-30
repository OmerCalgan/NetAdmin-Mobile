import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>Page not found</Text>
        <Link href="/calc" style={styles.link}>
          <Text style={styles.linkText}>Return to Calculator</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  errorCode: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  link: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});
