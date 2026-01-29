import { useGameState } from '@/hooks/useGameState';
import { useVKIntegration } from '@/hooks/useVKIntegration';
import AppRouter from '@/components/AppRouter';

export default function Index() {
  const {
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
  } = useGameState();

  const { vkUser, isVKApp } = useVKIntegration(setUsername);

  return (
    <AppRouter
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      selectedTable={selectedTable}
      hearts={hearts}
      setHearts={setHearts}
      isVIP={isVIP}
      username={username}
      vkUser={vkUser}
      isVKApp={isVKApp}
      handleSelectTable={handleSelectTable}
      handlePurchase={handlePurchase}
    />
  );
}
