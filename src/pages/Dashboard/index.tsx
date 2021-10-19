import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
  ProdiversListTitle,
} from './styles';

export interface Providers {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Providers[]>();

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => setProviders(response.data));
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProdiversListTitle>Cabeleireiros</ProdiversListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>08:00 às 18:00</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
