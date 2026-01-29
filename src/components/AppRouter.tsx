import GameLobby from '@/components/GameLobby';
import GameTable from '@/components/GameTable';
import ProfilePage from '@/components/ProfilePage';
import ShopPage from '@/components/ShopPage';
import GiftsPage from '@/components/GiftsPage';
import { VKUser } from '@/lib/vkAuth';

type Page = 'lobby' | 'game' | 'profile' | 'shop' | 'gifts';

interface AppRouterProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedTable: number;
  hearts: number;
  setHearts: (h: number) => void;
  isVIP: boolean;
  username: string;
  vkUser: VKUser | null;
  isVKApp: boolean;
  handleSelectTable: (tableNumber: number) => void;
  handlePurchase: (amount: number, isVIPPurchase?: boolean) => void;
}

export default function AppRouter({
  currentPage,
  setCurrentPage,
  selectedTable,
  hearts,
  setHearts,
  isVIP,
  username,
  vkUser,
  isVKApp,
  handleSelectTable,
  handlePurchase
}: AppRouterProps) {
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
