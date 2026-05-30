'use client';

import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { tokenAtom, userAtom, isAuthLoadingAtom } from '@/lib/auth-atoms';
import { getUser } from '@/lib/auth';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const token = useAtomValue(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const setIsLoading = useSetAtom(isAuthLoadingAtom);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (token) {
      getUser(token)
        .then((res) => {
          setUser(res.user);
          localStorage.setItem('auth_user', JSON.stringify(res.user));
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}