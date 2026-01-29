import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { VKUser } from '@/lib/vkAuth';

interface ProfilePageProps {
  onBack: () => void;
  hearts: number;
  isVIP: boolean;
  username: string;
  vkUser?: VKUser | null;
}

export default function ProfilePage({ 
  onBack, 
  hearts, 
  isVIP,
  username,
  vkUser
}: ProfilePageProps) {
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
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-5xl shadow-xl overflow-hidden">
              {vkUser?.photo_100 ? (
                <img src={vkUser.photo_100} alt={username} className="w-full h-full object-cover" />
              ) : (
                '👤'
              )}
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