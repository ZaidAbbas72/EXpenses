import React, { useState, useMemo, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';

// Define light and dark mode themes
const lightTheme = {
  background: "rgba(252, 246, 249, 0.78)",
  textColor: "#000000",
  mainBgColor: "#FFFFFF",
  buttonBgColor: "#E0E0E0", // Added button background for light mode
  buttonTextColor: "#000000",
};

const darkTheme = {
  background: "rgba(18, 18, 18, 0.9)",
  textColor: "#FFFFFF",
  mainBgColor: "#121212",
  buttonBgColor: "#333333", // Added button background for dark mode
  buttonTextColor: "#FFFFFF",
};

function App() {
  const [active, setActive] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Retrieve theme from localStorage

  const global = useGlobalContext();
  console.log(global);

  // Store theme preference in localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme); // Save theme to localStorage on change
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <Button onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
            {displayData()}
          </main>
        </MainLayout>
      </AppStyled>
    </ThemeProvider>
  );
}

// Styled components for the app layout and button
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  
  main {
    flex: 1;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
    border: 3px solid ${(props) => props.theme.mainBgColor};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

// Styled button for toggling theme
const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonTextColor};
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.mainBgColor};
    color: ${(props) => props.theme.textColor};
  }
`;

export default App;
