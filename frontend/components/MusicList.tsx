import { FlatList } from 'react-native';
import { ListItem, View, YStack, Square } from 'tamagui';
import { Ellipsis, Music } from '@tamagui/lucide-icons';
import React, { Children } from 'react';

interface Track {
  id: number;
  title: string;
  youtube_url?: string;
  duration: number;
}

const TrackItem = ({ item, active, onPressTrack }: { item: Track, active: boolean, onPressTrack?: (track: Track) => void }) => {

  const onClickItem = () => {
    if (onPressTrack) {
      onPressTrack(item);
    }
  }

  return (
    <ListItem
      title={item.title}
      icon={
        <Square size={40} backgroundColor="$gray8" borderRadius="$4" justifyContent="center" alignItems="center">
          <Music size={24} color="$gray10" />
        </Square>
      }
      iconAfter={(props) => <Ellipsis  {...props} />}
      onPress={onClickItem}
      hoverTheme
      pressTheme
      animation="quick"
      backgroundColor={active ? '$blue5' : '$background'}
    />
  );
};

export const MusicList = ({ tracks, onPressTrack, children, active }: { tracks: Track[], onPressTrack?: (track: Track) => void, children?: React.ReactNode, active?: number }) => {

  return (
    <YStack flex={1} padding={"$2"}>
      <View flex={1}>
        <FlatList
          data={tracks}
          renderItem={({ item }) => <TrackItem item={item} onPressTrack={onPressTrack} active={active == item.id} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
      {children}
    </YStack>
  );
};

export default MusicList;