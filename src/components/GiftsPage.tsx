import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GiftsPageProps {
  onBack: () => void;
  hearts: number;
  setHearts: (h: number) => void;
}

export default function GiftsPage({ 
  onBack, 
  hearts, 
  setHearts 
}: GiftsPageProps) {
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
