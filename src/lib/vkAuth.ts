import bridge from '@vkontakte/vk-bridge';

export interface VKUser {
  id: number;
  first_name: string;
  last_name: string;
  photo_100?: string;
  city?: {
    title: string;
  };
}

export const initVK = async () => {
  try {
    await bridge.send('VKWebAppInit');
    return true;
  } catch (error) {
    console.error('VK Init Error:', error);
    return false;
  }
};

export const getUserInfo = async (): Promise<VKUser | null> => {
  try {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return user;
  } catch (error) {
    console.error('Get User Info Error:', error);
    return null;
  }
};

export const shareApp = async () => {
  try {
    await bridge.send('VKWebAppShare', {
      link: 'https://vk.ru/arrow_love'
    });
  } catch (error) {
    console.error('Share Error:', error);
  }
};

export const joinGroup = async () => {
  try {
    await bridge.send('VKWebAppJoinGroup', {
      group_id: 0
    });
  } catch (error) {
    console.error('Join Group Error:', error);
  }
};

export const checkIfVKApp = (): boolean => {
  return window.location.search.includes('vk_') || 
         window.location.hash.includes('vk_') ||
         navigator.userAgent.includes('VKCOM');
};
