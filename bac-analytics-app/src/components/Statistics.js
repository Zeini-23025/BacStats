
import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function Statistics({ data }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const totalStudents = data.length;

      // Decision Stats
      const decisionCounts = data.reduce((acc, item) => {
        const decision = item.Decision.startsWith('Admis') ? 'Admis' : item.Decision.startsWith('Ajourné') ? 'Ajourné' : item.Decision;
        acc[decision] = (acc[decision] || 0) + 1;
        return acc;
      }, {});

      const decisionData = Object.keys(decisionCounts).map(key => ({
        name: key,
        value: (decisionCounts[key] / totalStudents) * 100,
      }));

      // Stats by Serie
      const serieStats = data.reduce((acc, item) => {
        const serie = item.SERIE;
        if (!acc[serie]) {
          acc[serie] = { total: 0, admitted: 0 };
        }
        acc[serie].total++;
        if (item.Decision.startsWith('Admis')) {
          acc[serie].admitted++;
        }
        return acc;
      }, {});

      const serieData = Object.keys(serieStats).map(key => ({
        name: key,
        'Pourcentage Admis': (serieStats[key].admitted / serieStats[key].total) * 100,
      }));

      // Stats by Wilaya
      const wilayaStats = data.reduce((acc, item) => {
        const wilaya = item.Wilaya_FR;
        if (!acc[wilaya]) {
          acc[wilaya] = { total: 0, admitted: 0 };
        }
        acc[wilaya].total++;
        if (item.Decision.startsWith('Admis')) {
          acc[wilaya].admitted++;
        }
        return acc;
      }, {});

      const wilayaData = Object.keys(wilayaStats).map(key => ({
        name: key,
        'Pourcentage Admis': (wilayaStats[key].admitted / wilayaStats[key].total) * 100,
      }));

      // Stats by Noreg
      const noregStats = data.reduce((acc, item) => {
        const noreg = item.Noreg;
        if (!acc[noreg]) {
          acc[noreg] = { total: 0, admitted: 0 };
        }
        acc[noreg].total++;
        if (item.Decision.startsWith('Admis')) {
          acc[noreg].admitted++;
        }
        return acc;
      }, {});

      const noregData = Object.keys(noregStats).map(key => ({
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
    <Box>
      <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: '2rem' }}>
        Statistiques des Résultats du BAC 2024
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>Répartition des décisions</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.decisionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                    >
                      {stats.decisionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>Pourcentage Admis par Série</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.serieData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>Pourcentage Admis par Wilaya</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.wilayaData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>Pourcentage Admis par Noreg</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.noregData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Bar dataKey="Pourcentage Admis" fill="#ffc658" />
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
