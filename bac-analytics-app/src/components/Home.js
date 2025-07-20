import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSerie, setSelectedSerie] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [student, setStudent] = useState(null);
  const [displayData, setDisplayData] = useState([]);

  // Function to sort data by Moy_Bac in descending order
  const sortDataByMoyenne = (arr) => {
    return [...arr].sort((a, b) => {
      const moyA = parseFloat(a.Moy_Bac);
      const moyB = parseFloat(b.Moy_Bac);
      return moyB - moyA;
    });
  };

  useEffect(() => {
    // Initial display: Top 12 students by default
    setDisplayData(sortDataByMoyenne(data).slice(0, 12));
  }, [data]);

  useEffect(() => {
    // Apply filters and sort when filters change
    let currentFilteredData = data.filter(item => {
      return (
        (selectedSerie ? item.SERIE === selectedSerie : true) &&
        (selectedWilaya ? item.Wilaya_FR === selectedWilaya : true)
      );
    });
    currentFilteredData = sortDataByMoyenne(currentFilteredData);
    setDisplayData(currentFilteredData.slice(0, 12)); // Display top 12 of filtered data
  }, [selectedSerie, selectedWilaya, data]);

  const handleSearch = () => {
    const result = data.find(item => item.Num_Bac === searchTerm || item.NNI === searchTerm);
    setStudent(result);
  };

  const getDecisionColor = (decision) => {
    if (decision.startsWith('Admis')) return 'green';
    if (decision.startsWith('Sessionnaire')) return 'orange';
    if (decision.startsWith('Ajourné')) return 'red';
    return 'inherit';
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Rechercher par Numéro de BAC ou NNI"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ bgcolor: 'background.paper' }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" color="primary" onClick={handleSearch} sx={{ height: '56px' }}>
            Rechercher
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'background.paper' , minHeight: 56 }}>
            <InputLabel>Série</InputLabel>
            <Select value={selectedSerie} label="Série" onChange={(e) => setSelectedSerie(e.target.value)}>
              <MenuItem value=""><em>Toutes</em></MenuItem>
              {[...new Set(data.map(item => item.SERIE))].map(serie => (
                <MenuItem key={serie} value={serie}>{serie}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'background.paper'  , minHeight: 56 }}>
            <InputLabel>Wilaya</InputLabel>
            <Select value={selectedWilaya} label="Wilaya" onChange={(e) => setSelectedWilaya(e.target.value)}>
              <MenuItem value=""><em>Toutes</em></MenuItem>
              {[...new Set(data.map(item => item.Wilaya_FR))].map(wilaya => (
                <MenuItem key={wilaya} value={wilaya}>{wilaya}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {student && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ mt: 4, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                {student.Nom_FR}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {student.Serie_FR}
              </Typography>
              <Typography variant="body1">
                <strong>NNI:</strong> {student.NNI} <br />
                <strong>Num_Bac:</strong> {student.Num_Bac} <br />
                <strong>Moyenne:</strong> {student.Moy_Bac} <br />
                <strong style={{ color: getDecisionColor(student.Decision) }}>Décision:</strong> {student.Decision}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedSerie || selectedWilaya ? 'Résultats Filtrés (Top 12)' : 'Top 12 des Étudiants'}
        </Typography>
        <Grid container spacing={3}>
          {displayData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.NNI || index}> 
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                      {item.Nom_FR}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {item.Serie_FR}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Moyenne:</strong> {item.Moy_Bac}
                    </Typography>
                    <Typography variant="body2" sx={{ color: getDecisionColor(item.Decision) }}>
                      <strong>Décision:</strong> {item.Decision}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;