import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GameTableProps {
  tableNumber: number;
  onBack: () => void;
  hearts: number;
  setHearts: (h: number) => void;
  isVIP: boolean;
}

export default function GameTable({ 
  tableNumber, 
  onBack, 
  hearts, 
  setHearts,
  isVIP 
}: GameTableProps) {
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
