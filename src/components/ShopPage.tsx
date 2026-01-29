import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ShopPageProps {
  onBack: () => void;
  onPurchase: (amount: number, isVIP?: boolean) => void;
}

export default function ShopPage({ 
  onBack, 
  onPurchase 
}: ShopPageProps) {
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
