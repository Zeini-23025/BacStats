import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

// 🎨 Couleurs par type de décision
const DECISION_COLORS = {
  Admis: '#4CAF50',
  Sessionnaire: '#FFC107',
  Ajourné: '#F44336',
  Absent: '#9E9E9E',
  Autre: '#2196F3',
};

function Statistics({ data }) {
  const theme = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const totalStudents = data.length;

      // ✅ Nettoyage et regroupement des décisions
      const decisionCounts = data.reduce((acc, item) => {
        const raw = item.Decision.trim().toLowerCase();
        let decision = 'Autre';
        if (raw.startsWith('admis')) {
          decision = 'Admis';
        } else if (raw.startsWith('sessionnaire')) {
          decision = 'Sessionnaire';
        } else if (raw.startsWith('ajourné')) {
          decision = 'Ajourné';
        } else if (raw.startsWith('abs')) {
          decision = 'Absent';
        }

        acc[decision] = (acc[decision] || 0) + 1;
        return acc;
      }, {});

      const decisionData = Object.keys(decisionCounts).map((key) => ({
        name: key,
        value: (decisionCounts[key] / totalStudents) * 100,
      }));

      // Stats par Série
      const serieStats = data.reduce((acc, item) => {
        const serie = item.SERIE;
        if (!acc[serie]) {
          acc[serie] = { total: 0, admitted: 0 };
        }
        acc[serie].total++;
        if (item.Decision.toLowerCase().startsWith('admis')) {
          acc[serie].admitted++;
        }
        return acc;
      }, {});

      const serieData = Object.keys(serieStats).map((key) => ({
        name: key,
        'Pourcentage Admis': (serieStats[key].admitted / serieStats[key].total) * 100,
      }));

      // Stats par Wilaya
      const wilayaStats = data.reduce((acc, item) => {
        const wilaya = item.Wilaya_FR;
        if (!acc[wilaya]) {
          acc[wilaya] = { total: 0, admitted: 0 };
        }
        acc[wilaya].total++;
        if (item.Decision.toLowerCase().startsWith('admis')) {
          acc[wilaya].admitted++;
        }
        return acc;
      }, {});

      const wilayaData = Object.keys(wilayaStats).map((key) => ({
        name: key,
        'Pourcentage Admis': (wilayaStats[key].admitted / wilayaStats[key].total) * 100,
      }));

      // Stats par Noreg
      const noregStats = data.reduce((acc, item) => {
        const noreg = item.Noreg;
        if (!acc[noreg]) {
          acc[noreg] = { total: 0, admitted: 0 };
        }
        acc[noreg].total++;
        if (item.Decision.toLowerCase().startsWith('admis')) {
          acc[noreg].admitted++;
        }
        return acc;
      }, {});

      const noregData = Object.keys(noregStats).map((key) => ({
        name: `Noreg ${key}`,
        'Pourcentage Admis': (noregStats[key].admitted / noregStats[key].total) * 100,
      }));

      setStats({
        decisionData,
        serieData,
        wilayaData,
        noregData,
      });
    }
  }, [data]);

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Statistiques des Résultats du BAC 2024
      </Typography>

      <Grid container spacing={4}>
        {/* PieChart - Décisions */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Répartition des décisions
                </Typography>
                <ResponsiveContainer width={500} height={300}>
                  <PieChart>
                    <Pie
                      data={stats.decisionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${percent.toFixed(2)}%`}
                    >
                      {stats.decisionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DECISION_COLORS[entry.name] || '#CCCCCC'}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* BarChart - Série */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Pourcentage Admis par Série
                </Typography>
                <ResponsiveContainer width={500} height={300}>
                  <BarChart data={stats.serieData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                    <YAxis stroke={theme.palette.text.primary} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* BarChart - Wilaya */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Pourcentage Admis par Wilaya
                </Typography>
                <ResponsiveContainer width={500} height={300}>
                  <BarChart data={stats.wilayaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                    <YAxis stroke={theme.palette.text.primary} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill={theme.palette.secondary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* BarChart - Noreg */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Pourcentage Admis par Noreg
                </Typography>
                <ResponsiveContainer width={500} height={300}>
                  <BarChart data={stats.noregData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statistics;
