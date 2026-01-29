import { useState } from 'react';

type Page = 'lobby' | 'game' | 'profile' | 'shop' | 'gifts';

export function useGameState() {
  const [currentPage, setCurrentPage] = useState<Page>('lobby');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [hearts, setHearts] = useState(100);
  const [isVIP, setIsVIP] = useState(false);
  const [username, setUsername] = useState('Игрок' + Math.floor(Math.random() * 9999));

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

  return {
    currentPage,
    setCurrentPage,
    selectedTable,
    hearts,
    setHearts,
    isVIP,
    username,
    setUsername,
    handleSelectTable,
    handlePurchase
  };
}
