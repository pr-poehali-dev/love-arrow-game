import { useState, useEffect } from 'react';
import { initVK, getUserInfo, checkIfVKApp, VKUser } from '@/lib/vkAuth';

export function useVKIntegration(setUsername: (name: string) => void) {
  const [vkUser, setVkUser] = useState<VKUser | null>(null);
  const [isVKApp] = useState(checkIfVKApp());

  useEffect(() => {
    const loadVKData = async () => {
      if (isVKApp) {
        const initialized = await initVK();
        if (initialized) {
          const user = await getUserInfo();
          if (user) {
            setVkUser(user);
            setUsername(user.first_name + ' ' + user.last_name);
          }
        }
      }
    };
    loadVKData();
  }, [isVKApp, setUsername]);

  return {
    vkUser,
    isVKApp
  };
}
