import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { rickAndMortyApi, localApi } from '../services/api';
import type { Character } from '../types';
import DashboardHeader from '../components/Home/DashboardHeader';
import StatsGrid from '../components/Home/StatsGrid';
import UserStats from '../components/Home/UserStats';
import FavoritesList from '../components/Home/FavoritesList';
import LoadingSpinner from '../components/Home/LoadingSpinner';
import { containerStyle } from '../styles/home.styles';
import '../styles/animations.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ characters: 0, locations: 0, episodes: 0 });
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [userFavCount, setUserFavCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [charRes, locRes, epiRes] = await Promise.all([
          rickAndMortyApi.get('/character'),
          rickAndMortyApi.get('/location'),
          rickAndMortyApi.get('/episode'),
        ]);
        setStats({
          characters: charRes.data.info.count,
          locations: locRes.data.info.count,
          episodes: epiRes.data.info.count,
        });

        if (isAuthenticated) {
          const favRes = await localApi.get('/my-characters');
          setUserFavCount(favRes.data.length);
          setFavorites(favRes.data.slice(-3).reverse());
        }
      } catch (error) {
        console.error("Erro ao buscar dados para a home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={containerStyle}>
      <DashboardHeader />
      <StatsGrid stats={stats} />

      {isAuthenticated && (
        <>
          <UserStats favCount={userFavCount} />
          <FavoritesList favorites={favorites} />
        </>
      )}
    </div>
  );
};

export default Home;
