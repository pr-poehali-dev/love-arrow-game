import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-red-600 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    💘
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white drop-shadow-lg">Стрела Любви</h1>
                    <p className="text-white/90 text-sm">Играй, знакомься, влюбляйся!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="text-2xl animate-pulse-heart">❤️</span>
                    <span className="text-white font-bold text-lg">{hearts}</span>
                  </div>
                  {isVIP && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-bold">
                      ⭐ VIP
                    </Badge>
                  )}
                  <Button 
                    onClick={() => setCurrentPage('profile')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white"
                  >
                    <Icon name="User" className="mr-2" size={18} />
                    {username}
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-scale-in">
            <Button 
              onClick={() => setCurrentPage('lobby')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
            >
              <Icon name="Home" className="mr-2" size={20} />
              Столики
            </Button>
            <Button 
              onClick={() => setCurrentPage('shop')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
            >
              <Icon name="ShoppingBag" className="mr-2" size={20} />
              Магазин
            </Button>
            <Button 
              onClick={() => setCurrentPage('gifts')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
            >
              <Icon name="Gift" className="mr-2" size={20} />
              Подарки
            </Button>
            <Button 
              onClick={() => setCurrentPage('profile')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
            >
              <Icon name="User" className="mr-2" size={20} />
              Профиль
            </Button>
          </nav>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-6 drop-shadow-lg">Игровые столики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((tableNum) => {
                const players = Math.floor(Math.random() * 17);
                const isFull = players === 16;
                return (
                  <Card 
                    key={tableNum}
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-6 hover:scale-105 transition-transform duration-200 cursor-pointer shadow-xl animate-fade-in"
                    style={{ animationDelay: `${tableNum * 0.02}s` }}
                    onClick={() => !isFull && handleSelectTable(tableNum)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Столик {tableNum}</h3>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Icon name="Users" size={18} className="text-white" />
                        <span className={`font-bold ${isFull ? 'text-red-300' : 'text-green-300'}`}>
                          {players}/16
                        </span>
                      </div>
                      {isFull ? (
                        <Badge className="bg-red-500 text-white w-full py-2">Заполнен</Badge>
                      ) : (
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white w-full font-bold">
                          Играть
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <footer className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center text-white shadow-xl border border-white/20">
            <p className="mb-3 text-lg">Вступайте в нашу группу ВКонтакте</p>
            <a 
              href="https://vk.ru/arrow_love" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold transition-colors"
            >
              <Icon name="Heart" size={20} />
              vk.ru/arrow_love
            </a>
          </footer>
        </div>
      </div>
    );
  }

  if (currentPage === 'game') {
    return <GameTable 
      tableNumber={selectedTable} 
      onBack={() => setCurrentPage('lobby')} 
      hearts={hearts}
      setHearts={setHearts}
      isVIP={isVIP}
    />;
  }

  if (currentPage === 'profile') {
    return <ProfilePage 
      onBack={() => setCurrentPage('lobby')} 
      hearts={hearts} 
      isVIP={isVIP}
      username={username}
    />;
  }

  if (currentPage === 'shop') {
    return <ShopPage 
      onBack={() => setCurrentPage('lobby')} 
      onPurchase={handlePurchase}
    />;
  }

  if (currentPage === 'gifts') {
    return <GiftsPage 
      onBack={() => setCurrentPage('lobby')} 
      hearts={hearts}
      setHearts={setHearts}
    />;
  }

  return null;
}

function GameTable({ 
  tableNumber, 
  onBack, 
  hearts, 
  setHearts,
  isVIP 
}: { 
  tableNumber: number; 
  onBack: () => void; 
  hearts: number;
  setHearts: (h: number) => void;
  isVIP: boolean;
}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [timer, setTimer] = useState(4);
  const [showTimer, setShowTimer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const players = [
    '😊 Анна', '🤩 Иван', '😎 Мария', '🥰 Петр', 
    '😍 Елена', '🤗 Сергей', '😘 Ольга', '😇 Дмитрий',
    '🥳 Наталья', '😄 Алексей', '🤪 Юлия', '🙃 Михаил',
    '😜 Виктория', '😁 Андрей', '🥲 Екатерина', '😊 Николай'
  ];

  const spinArrow = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomRotation = 360 * 5 + Math.random() * 360;
    setRotation(rotation + randomRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const playerIndex = Math.floor((randomRotation % 360) / (360 / 16));
      setSelectedPlayer(playerIndex);
      setShowTimer(true);
      setTimer(4);
      
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowTimer(false);
            setSelectedPlayer(null);
            
            if (Math.random() > 0.7) {
              const bonus = Math.random() > 0.5 ? 1 : 3;
              setHearts(hearts + bonus);
            }
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-red-600 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white"
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/40">
            <span className="text-3xl animate-pulse-heart">❤️</span>
            <span className="text-white font-bold text-2xl">{hearts}</span>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl mb-6">
          <h2 className="text-4xl font-black text-white text-center mb-8 drop-shadow-lg">
            🎯 Столик {tableNumber}
          </h2>

          <div className="relative w-full max-w-2xl mx-auto aspect-square mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-xl"></div>
            
            <div className="relative w-full h-full bg-white/20 rounded-full border-8 border-white/40 backdrop-blur-sm shadow-2xl">
              {players.map((player, index) => {
                const angle = (360 / 16) * index - 90;
                const radius = 42;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <div
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedPlayer === index ? 'scale-125 z-10' : ''
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className={`bg-white rounded-full px-3 py-2 shadow-lg border-2 ${
                      selectedPlayer === index ? 'border-yellow-400 bg-gradient-to-r from-pink-400 to-purple-500' : 'border-white/50'
                    }`}>
                      <span className="text-sm font-bold whitespace-nowrap">{player}</span>
                    </div>
                  </div>
                );
              })}

              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
                }}
              >
                <div className="text-8xl filter drop-shadow-2xl">💘</div>
              </div>
            </div>
          </div>

          {showTimer && (
            <div className="text-center mb-6 animate-scale-in">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold mb-2">Время поцелуя!</p>
                <p className="text-6xl font-black">{timer}</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={spinArrow}
              disabled={isSpinning}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-2xl font-black px-12 py-6 rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSpinning ? '🌀 Крутится...' : '💘 Крутить стрелу!'}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Icon name="MessageCircle" size={24} />
              Чат
            </h3>
            <div className="bg-white/10 rounded-xl p-4 h-64 overflow-y-auto mb-4">
              <p className="text-white/70 text-center py-8">Чат появится в следующей версии</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Напишите сообщение..."
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Icon name="Music" size={24} />
              Музыка
            </h3>
            <div className="space-y-3">
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white justify-start" disabled>
                <Icon name="Play" className="mr-2" size={18} />
                Включить музыку (10 ❤️)
              </Button>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white justify-start" disabled>
                <Icon name="Video" className="mr-2" size={18} />
                Включить видео (10 ❤️)
              </Button>
              {isVIP ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full py-3 text-center">
                  ⭐ VIP: Музыка и видео без ограничений!
                </Badge>
              ) : (
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold">
                  <Icon name="Crown" className="mr-2" size={18} />
                  Купить VIP
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ 
  onBack, 
  hearts, 
  isVIP,
  username 
}: { 
  onBack: () => void; 
  hearts: number; 
  isVIP: boolean;
  username: string;
}) {
  const stats = {
    gamesPlayed: Math.floor(Math.random() * 100),
    kisses: Math.floor(Math.random() * 200),
    giftsReceived: Math.floor(Math.random() * 50),
    friends: Math.floor(Math.random() * 30)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-red-600 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack}
          className="mb-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          Назад
        </Button>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl mb-6 animate-fade-in">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-5xl shadow-xl">
              👤
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-2">{username}</h2>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white px-4 py-2">
                  ❤️ {hearts} сердечек
                </Badge>
                {isVIP && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                    ⭐ VIP-аккаунт
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
              <Icon name="Gamepad2" className="mx-auto mb-2 text-white" size={32} />
              <p className="text-3xl font-bold text-white mb-1">{stats.gamesPlayed}</p>
              <p className="text-white/80 text-sm">Игр сыграно</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
              <span className="text-4xl mb-2 block">💋</span>
              <p className="text-3xl font-bold text-white mb-1">{stats.kisses}</p>
              <p className="text-white/80 text-sm">Поцелуев</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
              <Icon name="Gift" className="mx-auto mb-2 text-white" size={32} />
              <p className="text-3xl font-bold text-white mb-1">{stats.giftsReceived}</p>
              <p className="text-white/80 text-sm">Подарков</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
              <Icon name="Users" className="mx-auto mb-2 text-white" size={32} />
              <p className="text-3xl font-bold text-white mb-1">{stats.friends}</p>
              <p className="text-white/80 text-sm">Друзей</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Достижения</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🏆', name: 'Первая игра', unlocked: true },
              { icon: '💝', name: '10 поцелуев', unlocked: true },
              { icon: '🎁', name: 'Щедрый', unlocked: stats.giftsReceived > 10 },
              { icon: '👥', name: 'Популярный', unlocked: stats.friends > 20 },
              { icon: '🌟', name: 'VIP', unlocked: isVIP },
              { icon: '🔥', name: '100 игр', unlocked: stats.gamesPlayed >= 100 }
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                    : 'bg-white/10'
                } backdrop-blur-sm rounded-xl p-4 text-center border ${
                  achievement.unlocked ? 'border-yellow-300' : 'border-white/20'
                }`}
              >
                <span className={`text-4xl mb-2 block ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </span>
                <p className="text-white font-bold text-sm">{achievement.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ShopPage({ 
  onBack, 
  onPurchase 
}: { 
  onBack: () => void; 
  onPurchase: (amount: number, isVIP?: boolean) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-red-600 p-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={onBack}
          className="mb-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white"
        >
          <Icon name="ArrowLeft" className="mr-2" size={18} />
          Назад
        </Button>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl mb-8 animate-fade-in">
          <h2 className="text-4xl font-black text-white mb-8 text-center drop-shadow-lg">
            🛍️ Магазин
          </h2>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">VIP-аккаунт</h3>
            <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md border-2 border-yellow-400/50 p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">⭐</span>
                    <h4 className="text-3xl font-black text-white">VIP Premium</h4>
                  </div>
                  <ul className="space-y-2 text-white">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-300" />
                      Видеочат без ограничений
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-300" />
                      Голосовой чат
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-300" />
                      Все подарки бесплатно
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-300" />
                      Музыка и видео без ограничений
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-300" />
                      Эксклюзивный значок VIP
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black text-white mb-2">500₽</p>
                  <p className="text-white/80 mb-4">в месяц</p>
                  <Button 
                    onClick={() => onPurchase(0, true)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-xl font-black px-8 py-6 rounded-xl shadow-xl"
                  >
                    <Icon name="Crown" className="mr-2" size={24} />
                    Купить VIP
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Пакеты сердечек</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { hearts: 100, price: 50, icon: '💝' },
                { hearts: 500, price: 200, icon: '💖', popular: true },
                { hearts: 1000, price: 350, icon: '💗' }
              ].map((pack, index) => (
                <Card 
                  key={index}
                  className={`${
                    pack.popular 
                      ? 'bg-gradient-to-br from-pink-400/30 to-purple-500/30 border-pink-400' 
                      : 'bg-white/10'
                  } backdrop-blur-md border-2 border-white/30 p-6 shadow-xl hover:scale-105 transition-transform relative`}
                >
                  {pack.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1">
                      🔥 Популярно
                    </Badge>
                  )}
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">{pack.icon}</span>
                    <p className="text-4xl font-black text-white mb-2">{pack.hearts}</p>
                    <p className="text-white/80 mb-4">сердечек</p>
                    <p className="text-3xl font-bold text-white mb-6">{pack.price}₽</p>
                    <Button 
                      onClick={() => onPurchase(pack.hearts)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white w-full font-bold py-3"
                    >
                      Купить
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Способы оплаты</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Карты', icon: 'CreditCard' },
              { name: 'WebMoney', icon: 'Wallet' },
              { name: 'QIWI', icon: 'Smartphone' },
              { name: 'Телефон', icon: 'Phone' }
            ].map((method, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30"
              >
                <Icon name={method.icon as any} className="mx-auto mb-2 text-white" size={32} />
                <p className="text-white font-bold">{method.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function GiftsPage({ 
  onBack, 
  hearts, 
  setHearts 
}: { 
  onBack: () => void; 
  hearts: number;
  setHearts: (h: number) => void;
}) {
  const goodGifts = [
    { name: 'Роза', icon: '🌹', cost: 5 },
    { name: 'Мишка', icon: '🧸', cost: 10 },
    { name: 'Шоколад', icon: '🍫', cost: 8 },
    { name: 'Сердце', icon: '💝', cost: 15 },
    { name: 'Букет', icon: '💐', cost: 20 },
    { name: 'Торт', icon: '🎂', cost: 25 }
  ];

  const badGifts = [
    { name: 'Помидор', icon: '🍅', cost: 3 },
    { name: 'Снежок', icon: '⚾', cost: 3 },
    { name: 'Яйцо', icon: '🥚', cost: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-red-600 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white"
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/40">
            <span className="text-3xl animate-pulse-heart">❤️</span>
            <span className="text-white font-bold text-2xl">{hearts}</span>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-8 shadow-2xl mb-8 animate-fade-in">
          <h2 className="text-4xl font-black text-white mb-8 text-center drop-shadow-lg">
            🎁 Подарки
          </h2>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>💝</span>
              Добрые подарки
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {goodGifts.map((gift, index) => (
                <Card 
                  key={index}
                  className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 backdrop-blur-md border-2 border-white/30 p-4 shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => {
                    if (hearts >= gift.cost) {
                      setHearts(hearts - gift.cost);
                    }
                  }}
                >
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">{gift.icon}</span>
                    <p className="text-white font-bold mb-2">{gift.name}</p>
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      {gift.cost} ❤️
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>😈</span>
              Злые подарки
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badGifts.map((gift, index) => (
                <Card 
                  key={index}
                  className="bg-gradient-to-br from-red-400/20 to-orange-500/20 backdrop-blur-md border-2 border-white/30 p-4 shadow-xl hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => {
                    if (hearts >= gift.cost) {
                      setHearts(hearts - gift.cost);
                    }
                  }}
                >
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">{gift.icon}</span>
                    <p className="text-white font-bold mb-2">{gift.name}</p>
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white">
                      {gift.cost} ❤️
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 p-6 shadow-xl text-center animate-fade-in">
          <p className="text-white text-lg">
            💡 <strong>Совет:</strong> Используйте добрые подарки для симпатичных игроков, 
            а злые — против токсичных нарушителей!
          </p>
        </Card>
      </div>
    </div>
  );
}
