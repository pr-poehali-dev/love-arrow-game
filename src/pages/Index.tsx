import { useState } from 'react';
import GameLobby from '@/components/GameLobby';
import GameTable from '@/components/GameTable';
import ProfilePage from '@/components/ProfilePage';
import ShopPage from '@/components/ShopPage';
import GiftsPage from '@/components/GiftsPage';

type Page = 'lobby' | 'game' | 'profile' | 'shop' | 'gifts';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('lobby');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [hearts, setHearts] = useState(100);
  const [isVIP, setIsVIP] = useState(false);
  const [username] = useState('Игрок' + Math.floor(Math.random() * 9999));

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
