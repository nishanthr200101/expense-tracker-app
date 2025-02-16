import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSegments, useRouter } from 'expo-router';

export function useProtectedRoute() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page if not signed in
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Redirect to the home page if signed in
      router.replace('/');
    }
  }, [user, loading, segments]);
}