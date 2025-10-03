import { FlatList } from 'react-native';
import { ListItem, View, YStack } from 'tamagui';
import { Ellipsis, Music } from '@tamagui/lucide-icons';
import React, { Children } from 'react';

interface Track {
  id: number;
  title: string;
  youtube_url?: string;
  duration: number;
}

const TrackItem = ({ item, active, onPressTrack }: { item: Track, active: boolean, onPressTrack?: CallableFunction }) => {

  const onClickItem = () => {
    if (onPressTrack) {
      onPressTrack(item);
    }
  }

  return (
    <ListItem
      title={item.title}
      icon={Music}
      iconAfter={(props) => <Ellipsis  {...props} />}
      onPress={onClickItem}
      hoverTheme
      pressTheme
      active={active}
    />
  );
};

export const MusicList = ({ tracks, onPressTrack, children, active }: { tracks: Track[], onPressTrack?: CallableFunction, children?: React.ReactNode, active?: number }) => {

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