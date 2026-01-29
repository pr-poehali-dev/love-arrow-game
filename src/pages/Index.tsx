import { useState, useEffect } from 'react';
import GameLobby from '@/components/GameLobby';
import GameTable from '@/components/GameTable';
import ProfilePage from '@/components/ProfilePage';
import ShopPage from '@/components/ShopPage';
import GiftsPage from '@/components/GiftsPage';
import { initVK, getUserInfo, checkIfVKApp, VKUser } from '@/lib/vkAuth';

type Page = 'lobby' | 'game' | 'profile' | 'shop' | 'gifts';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('lobby');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [hearts, setHearts] = useState(100);
  const [isVIP, setIsVIP] = useState(false);
  const [username, setUsername] = useState('Игрок' + Math.floor(Math.random() * 9999));
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
  }, [isVKApp]);

  const handleSelectTable = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    setCurrentPage('game');
  };

  const handlePurchase = (amount: number, isVIPPurchase: boolean = false) => {
    if (isVIPPurchase) {
      setIsVIP(true);
    } else {
      setHearts(hearts + amount);
    }
  };

  if (currentPage === 'lobby') {
    return (
      <GameLobby
        hearts={hearts}
        isVIP={isVIP}
        username={username}
        onNavigate={setCurrentPage}
        onSelectTable={handleSelectTable}
        isVKApp={isVKApp}
      />
    );
  }

  if (currentPage === 'game') {
    return (
      <GameTable 
        tableNumber={selectedTable} 
        onBack={() => setCurrentPage('lobby')} 
        hearts={hearts}
        setHearts={setHearts}
        isVIP={isVIP}
      />
    );
  }

  if (currentPage === 'profile') {
    return (
      <ProfilePage 
        onBack={() => setCurrentPage('lobby')} 
        hearts={hearts} 
        isVIP={isVIP}
        username={username}
        vkUser={vkUser}
      />
    );
  }

  if (currentPage === 'shop') {
    return (
      <ShopPage 
        onBack={() => setCurrentPage('lobby')} 
        onPurchase={handlePurchase}
      />
    );
  }

  if (currentPage === 'gifts') {
    return (
      <GiftsPage 
        onBack={() => setCurrentPage('lobby')} 
        hearts={hearts}
        setHearts={setHearts}
      />
    );
  }

  return null;
}