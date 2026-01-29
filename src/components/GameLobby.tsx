import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { shareApp } from '@/lib/vkAuth';
import VKAuthButton from './VKAuthButton';

type Page = 'lobby' | 'game' | 'profile' | 'shop' | 'gifts';

interface GameLobbyProps {
  hearts: number;
  isVIP: boolean;
  username: string;
  onNavigate: (page: Page) => void;
  onSelectTable: (tableNumber: number) => void;
  isVKApp?: boolean;
}

export default function GameLobby({ 
  hearts, 
  isVIP, 
  username, 
  onNavigate, 
  onSelectTable,
  isVKApp = false
}: GameLobbyProps) {
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
                  onClick={() => onNavigate('profile')}
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
            onClick={() => onNavigate('lobby')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
          >
            <Icon name="Home" className="mr-2" size={20} />
            Столики
          </Button>
          <Button 
            onClick={() => onNavigate('shop')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
          >
            <Icon name="ShoppingBag" className="mr-2" size={20} />
            Магазин
          </Button>
          <Button 
            onClick={() => onNavigate('gifts')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white h-16 text-lg font-bold"
          >
            <Icon name="Gift" className="mr-2" size={20} />
            Подарки
          </Button>
          <Button 
            onClick={() => onNavigate('profile')}
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
                  onClick={() => !isFull && onSelectTable(tableNum)}
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
          <p className="mb-4 text-lg">Вступайте в нашу группу ВКонтакте</p>
          
          {isVKApp ? (
            <VKAuthButton isVKApp={isVKApp} />
          ) : (
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://vk.ru/arrow_love" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold transition-colors"
              >
                <Icon name="Heart" size={20} />
                vk.ru/arrow_love
              </a>
              <Button
                onClick={shareApp}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold"
              >
                <Icon name="Share2" className="mr-2" size={20} />
                Поделиться
              </Button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}