import { FlatList } from 'react-native';
import { ListItem, View, YStack } from 'tamagui';
import { MusicPlayer } from './MusicPlayer';
import { Ellipsis, Music } from '@tamagui/lucide-icons';

interface Track {
  id: number;
  title: string;
  youtube_url?: string;
  duration: number;
}

const renderTrackItem = ({ item }: { item: Track }) => {
  return <ListItem title={item.title} icon={Music} hoverTheme iconAfter={Ellipsis} />;
};

export const MusicList = ({ tracks }: {tracks: Track[]}) => {
  

  return (
    <YStack flex={1} padding={"$2"}>
      <View flex={1}>
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
      <MusicPlayer />
    </YStack>
  );
};

export default MusicList;