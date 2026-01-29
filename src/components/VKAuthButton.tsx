import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { shareApp, joinGroup } from '@/lib/vkAuth';

interface VKAuthButtonProps {
  isVKApp: boolean;
}

export default function VKAuthButton({ isVKApp }: VKAuthButtonProps) {
  if (!isVKApp) {
    return null;
  }

  const handleJoinGroup = async () => {
    await joinGroup();
  };

  const handleShare = async () => {
    await shareApp();
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleJoinGroup}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full font-bold"
      >
        <Icon name="Users" className="mr-2" size={18} />
        Вступить в группу ВК
      </Button>
      <Button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-600 text-white w-full font-bold"
      >
        <Icon name="Share2" className="mr-2" size={18} />
        Поделиться с друзьями
      </Button>
    </div>
  );
}
