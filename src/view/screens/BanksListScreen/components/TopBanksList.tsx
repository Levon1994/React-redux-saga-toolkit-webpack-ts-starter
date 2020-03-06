/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { Navigation, RootState } from 'types';

import { TopFlatListBlock, ContainerTopList, TopLogoBlock, TopStyledImage } from '../styled';

interface Props {
  navigation: Navigation;
}

export const TopBanksList: React.FC<Props> = React.memo(({ navigation }) => {
  const { topBanks } = useSelector((state: RootState) => state.bankReducer);

  const renderTopBanks = ({ item }) => {
    return (
      <View style={{ width: '50%' }}>
        <ContainerTopList
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateBankAccount', { item })}
            style={{
              width: '100%',
            }}
          >
            <TopLogoBlock>
              <TopStyledImage source={{ uri: item.logo_square }} />
            </TopLogoBlock>
          </TouchableOpacity>
        </ContainerTopList>
      </View>
    );
  };
  return (
    <TopFlatListBlock>
      <FlatList
        key={2}
        data={topBanks}
        renderItem={renderTopBanks}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        style={{
          width: '100%',
        }}
      />
    </TopFlatListBlock>
  );
});
