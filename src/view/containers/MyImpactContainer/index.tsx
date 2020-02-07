import React from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';

import { DonationComponent } from 'view/components';

import {
  Container,
  Header,
  TopHeaderBlock,
  UserNameBlock,
  UserName,
  ProfileViewBlock,
  ProfileViewButton,
  BottomHeaderBlock,
  MainBlock,
  FlatListBlock,
  EditCharitiesBlock,
  EditCharitiesButton,
} from './styled';

interface ListProps {
  id: number;
  logo: ImageSourcePropType;
  charityName: string;
  donate: string;
}

interface MyImpactProps {
  list?: ListProps[];
  renderListItem: (item: ListProps) => JSX.Element;
}

export const MyImpactContainer = ({ list, renderListItem }: MyImpactProps) => {
  return (
    <Container>
      {/* header */}
      <Header>
        {/* top header */}
        <TopHeaderBlock>
          <UserNameBlock>
            <UserName>John Smithhgfhfghfhfhf</UserName>
          </UserNameBlock>
          <ProfileViewBlock>
            <ProfileViewButton label="Profile settings" onPress={() => console.log('1')} />
          </ProfileViewBlock>
        </TopHeaderBlock>
        {/* bottom header */}
        <BottomHeaderBlock>
          <DonationComponent price={8.25} description="this week donation" isMargin />
          <DonationComponent price={35.75} description="all time donation" />
        </BottomHeaderBlock>
      </Header>
      {/* main block */}
      <MainBlock>
        {/* flatlist */}
        <FlatListBlock>
          <FlatList
            data={list}
            renderItem={renderListItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            bounces={false}
            style={{
              width: '100%',
            }}
          />
        </FlatListBlock>
        {/* button */}
        <EditCharitiesBlock>
          <EditCharitiesButton label="Add / Edit Charities" onPress={() => console.log('1')} />
        </EditCharitiesBlock>
      </MainBlock>
    </Container>
  );
};
