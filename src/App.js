
import React, { useState, useEffect, createContext, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, AppBar, Toolbar, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './components/Home';
import Statistics from './components/Statistics';
import BacLogo from './components/BacLogo';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [mode, setMode] = useState('light');
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [mode],
  );

  useEffect(() => {
    fetch('/results.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data loaded successfully:', data.length, 'records');
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Try alternative path for GitHub Pages
        fetch(`${process.env.PUBLIC_URL}/results.json`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Data loaded successfully from alternative path:', data.length, 'records');
            setData(data);
            setLoading(false);
            setError(null);
          })
          .catch(altError => {
            console.error('Error fetching data from alternative path:', altError);
            setError('Impossible de charger les données. Vérifiez que le fichier results.json existe dans le dossier public.');
            setLoading(false);
          });
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des données...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <BacLogo size={36} color={theme.palette.mode} />
              <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                BAC 2024 Analytics
              </Typography>
            </Box>
            <Button sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>
          </Toolbar>
          <Tabs value={value} onChange={handleChange} centered textColor="inherit" indicatorColor="secondary">
            <Tab label="Accueil" {...a11yProps(0)} />
            <Tab label="Statistiques" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
          <TabPanel value={value} index={0}>
            <Home data={data} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Statistics data={data} />
          </TabPanel>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
