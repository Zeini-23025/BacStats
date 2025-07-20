
import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSerie, setSelectedSerie] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [student, setStudent] = useState(null);
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    // Afficher les 12 meilleurs étudiants par défaut sur la page d'accueil
    const sortedData = [...data].sort((a, b) => parseFloat(b.Moy_Bac) - parseFloat(a.Moy_Bac));
    setTopStudents(sortedData.slice(0, 12));
  }, [data]);

  const handleSearch = () => {
    const result = data.find(item => item.Num_Bac === searchTerm || item.NNI === searchTerm);
    setStudent(result);
  };

  const filteredData = data.filter(item => {
    return (
      (selectedSerie ? item.SERIE === selectedSerie : true) &&
      (selectedWilaya ? item.Wilaya_FR === selectedWilaya : true)
    );
  }).sort((a, b) => parseFloat(b.Moy_Bac) - parseFloat(a.Moy_Bac)); // Tri par moyenne décroissante

  return (
    <Box>
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Rechercher par Numéro de BAC ou NNI"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="contained" color="primary" onClick={handleSearch} style={{ height: '100%' }}>
            Rechercher
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card style={{ marginTop: '2rem' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {student.Nom_FR}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {student.Serie_FR}
              </Typography>
              <Typography variant="body2">
                <strong>NNI:</strong> {student.NNI} <br />
                <strong>Num_Bac:</strong> {student.Num_Bac} <br />
                <strong>Moyenne:</strong> {student.Moy_Bac} <br />
                <strong>Décision:</strong> {student.Decision}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          {selectedSerie || selectedWilaya ? 'Résultats Filtrés' : 'Top 12 des Étudiants'}
        </Typography>
        <Grid container spacing={2}>
          {(selectedSerie || selectedWilaya ? filteredData : topStudents).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.Nom_FR}</Typography>
                    <Typography color="text.secondary">{item.Serie_FR}</Typography>
                    <Typography variant="body2">Moyenne: {item.Moy_Bac}</Typography>
                    <Typography variant="body2" style={{ color: item.Decision.startsWith('Admis') ? 'green' : 'red' }}>
                      {item.Decision}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}

export default Home;
