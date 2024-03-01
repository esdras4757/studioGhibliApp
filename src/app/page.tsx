'use client'
import styled from "styled-components";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import BlogContent from "./Components/MoviesContainer";
import OfflineView from "./Components/OfflineView";

const Home = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      setIsOnline(false);
    }
    if (navigator.onLine) {
      setIsOnline(!offlineMode);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineMode]);


  return (
    <Container style={{visibility:'hidden'}} className="primary-glow">
      <Header offlineMode={offlineMode} setOfflineMode={setOfflineMode}/>
      {isOnline ? (
        <BlogContent offlineMode={offlineMode} setOfflineMode={setOfflineMode}/>
      ) : (
        <OfflineView offlineMode={offlineMode}  setOfflineMode={setOfflineMode}/>
      )}
    </Container>
  );
};

const Container = styled.div`
visibility: visible !important;
  color: ${({ theme }) => theme.palette.text.primary};
  h4 {
    color: #1c8ebb;
  }
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: 0px 20px;
  height: 100vh;
  overflow: hidden;
  .MuiTabs-flexContainer {
    justify-content: center;
  }

  @media (max-width:400px) {
    padding: 0px 10px;
  }
`;

export default Home;
