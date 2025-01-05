import { TouchableOpacity, FlatList } from 'react-native';
import {View, XStack, YStack, Text, styled, Image } from 'tamagui';
import { ChevronDown, Play, Info, X } from '@tamagui/lucide-icons';

// Types
interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

// Styled components
const Container = styled(YStack, {
  flex: 1,
  backgroundColor: '#121212',
  padding: 16,
});

const Header = styled(XStack, {
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
});

const HeaderText = styled(Text, {
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold',
});

const GenreSelector = styled(XStack, {
  backgroundColor: '#282828',
  padding: 8,
  borderRadius: 4,
  marginBottom: 20,
});

const GenreText = styled(Text, {
  color: 'white',
  marginRight: 8,
});

const SongItem = styled(XStack, {
  alignItems: 'center',
  marginBottom: 12,
});

const CoverImage = styled(Image, {
  width: 50,
  height: 50,
  borderRadius: 4,
});

const SongInfo = styled(YStack, {
  flex: 1,
  marginLeft: 12,
});

const PlayerBar = styled(XStack, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#282828',
  padding: 12,
  alignItems: 'center',
});

const MusicPlayer = () => {
  const songs: Song[] = [
    {
      id: '1',
      title: 'Orange Peel',
      artist: 'Oneheart, Reidenshi',
      coverUrl: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    },
    {
      id: '2',
      title: 'Snowfall',
      artist: 'Oneheart, Reidenshi',
      coverUrl: 'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    },
    {
      id: '3',
      title: 'Bongr',
      artist: 'Oneheart, Reidenshi',
      coverUrl: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
    },
  ];

  const renderSongItem = ({ item }: { item: Song }) => (
    <SongItem>
      <CoverImage source={{ uri: item.coverUrl }} />
      <SongInfo>
        <Text color="white">{item.title}</Text>
        <Text color="gray">{item.artist}</Text>
      </SongInfo>
      <XStack space={8}>
        <TouchableOpacity>
          <Info color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Play color="white" size={20} />
        </TouchableOpacity>
      </XStack>
    </SongItem>
  );

  return (
    <Container>
      <Header>
        <HeaderText>Let's Explore Our Records</HeaderText>
        <ChevronDown color="white" size={24} />
      </Header>

      <GenreSelector>
        <GenreText>Genre: Ambient</GenreText>
        <ChevronDown color="white" size={16} />
      </GenreSelector>

      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
      />

      <PlayerBar>
        <CoverImage source={{ uri: songs[0].coverUrl }} />
        <SongInfo>
          <Text color="white">{songs[0].title}</Text>
          <Text color="gray">{songs[0].artist}</Text>
        </SongInfo>
        <XStack space={16}>
          <TouchableOpacity>
            <Play color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <X color="white" size={24} />
          </TouchableOpacity>
        </XStack>
      </PlayerBar>
    </Container>
  );
};

export default MusicPlayer;