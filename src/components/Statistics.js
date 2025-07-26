import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        count: decisionCounts[key],
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
        totalStudents,
        decisionCounts,
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
    <Box sx={{ 
      mt: 4,
      px: { xs: 2, md: 0 }
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ 
        mb: 4, 
        fontWeight: 'bold',
        fontSize: { xs: '1.5rem', md: '2.125rem' }
      }}>
        Statistiques des Résultats du BAC 2024
      </Typography>

      {/* Section des statistiques numériques */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            mb: 3
          }}>
            Résumé des Résultats
          </Typography>
          <Grid container spacing={2} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ 
                p: { xs: 1.5, md: 2 }, 
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                border: '2px solid #2196F3',
                minWidth: '150px',
                margin: '2px'
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#2196F3',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {stats.totalStudents.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Total Étudiants
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ 
                p: { xs: 1.5, md: 2 }, 
                textAlign: 'center',
                backgroundColor: '#e8f5e8',
                border: '2px solid #4CAF50',
                minWidth: '150px',
                margin: '2px'
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#4CAF50',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {(stats.decisionCounts.Admis || 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Admis
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ 
                p: { xs: 1.5, md: 2 }, 
                textAlign: 'center',
                backgroundColor: '#fff8e1',
                border: '2px solid #FFC107',
                minWidth: '150px',
                margin: '2px'
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#FFC107',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {(stats.decisionCounts.Sessionnaire || 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Sessionnaires
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ 
                p: { xs: 1.5, md: 2 }, 
                textAlign: 'center',
                backgroundColor: '#ffebee',
                border: '2px solid #F44336',
                minWidth: '150px',
                margin: '2px'
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#F44336',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  {(stats.decisionCounts.Ajourné || 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Ajournés
                </Typography>
              </Paper>
            </Grid>
            {(stats.decisionCounts.Absent && stats.decisionCounts.Absent > 0) && (
              <Grid item xs={6} sm={3}>
                <Paper sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  border: '2px solid #9E9E9E',
                  minWidth: '150px',
                  margin: '2px'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    color: '#9E9E9E',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    {stats.decisionCounts.Absent.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}>
                    Absents
                  </Typography>
                </Paper>
              </Grid>
            )}
            {(stats.decisionCounts.Autre && stats.decisionCounts.Autre > 0) && (
              <Grid item xs={6} sm={3}>
                <Paper sx={{ 
                  p: { xs: 1.5, md: 2 }, 
                  textAlign: 'center',
                  backgroundColor: '#e3f2fd',
                  border: '2px solid #2196F3'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 'bold', 
                    color: '#2196F3',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    {stats.decisionCounts.Autre.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}>
                    Autre
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
          
          {/* Pourcentages */}
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            <Chip 
              label={`Taux de réussite: ${((stats.decisionCounts.Admis || 0) / stats.totalStudents * 100).toFixed(1)}%`}
              color="success"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            />
            <Chip 
              label={`Taux de rattrapage: ${((stats.decisionCounts.Sessionnaire || 0) / stats.totalStudents * 100).toFixed(1)}%`}
              color="warning"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            />
            <Chip 
              label={`Taux d'échec: ${((stats.decisionCounts.Ajourné || 0) / stats.totalStudents * 100).toFixed(1)}%`}
              color="error"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            />
            {(stats.decisionCounts.Absent && stats.decisionCounts.Absent > 0) && (
              <Chip 
                label={`Taux d'absence: ${((stats.decisionCounts.Absent || 0) / stats.totalStudents * 100).toFixed(1)}%`}
                sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  backgroundColor: '#9E9E9E',
                  color: 'white'
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* PieChart - Décisions */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" align="center" gutterBottom sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}>
                  Répartition des décisions
                </Typography>
                <ResponsiveContainer width={isMobile ? '100%' : '450px'} height={isMobile ? 250 : 300}>
                  <PieChart>
                    <Pie
                      data={stats.decisionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={isMobile ? 50 : 80}
                      dataKey="value"
                      label={({ name, percent, count }) => 
                        isMobile ? `${percent.toFixed(0)}%` : `${name}: ${count} (${percent.toFixed(1)}%)`
                      }
                    >
                      {stats.decisionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DECISION_COLORS[entry.name] || '#CCCCCC'}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [
                      `${value.toFixed(1)}% (${props.payload.count} étudiants)`, 
                      name
                    ]} />
                    {!isMobile && <Legend />}
                  </PieChart>
                </ResponsiveContainer>
                {isMobile && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                    {stats.decisionData.map((entry, index) => (
                      <Chip
                        key={`legend-${index}`}
                        label={`${entry.name}: ${entry.count}`}
                        size="small"
                        sx={{
                          backgroundColor: DECISION_COLORS[entry.name] || '#CCCCCC',
                          color: 'white',
                          fontSize: '0.7rem'
                        }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* BarChart - Série */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card sx={{ boxShadow: 3, height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" align="center" gutterBottom sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}>
                  Pourcentage Admis par Série
                </Typography>
                <ResponsiveContainer width={isMobile ? '100%' : '450px'} height={isMobile ? 250 : 300}>
                  <BarChart data={stats.serieData} margin={{ 
                    top: 5, 
                    right: isMobile ? 10 : 30, 
                    left: isMobile ? 10 : 20, 
                    bottom: isMobile ? 40 : 5 
                  }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={theme.palette.text.primary} 
                      fontSize={isMobile ? 8 : 12}
                      angle={isMobile ? -45 : 0}
                      textAnchor={isMobile ? "end" : "middle"}
                      height={isMobile ? 40 : 30}
                      interval={0}
                    />
                    <YAxis 
                      stroke={theme.palette.text.primary} 
                      fontSize={isMobile ? 8 : 12}
                      width={isMobile ? 30 : 40}
                    />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    {!isMobile && <Legend />}
                    <Bar 
                      dataKey="Pourcentage Admis" 
                      fill={theme.palette.primary.main}
                      radius={[2, 2, 0, 0]}
                    />
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
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" align="center" gutterBottom sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}>
                  Pourcentage Admis par Wilaya
                </Typography>
                <ResponsiveContainer width={isMobile ? '100%' : '450px'} height={isMobile ? 250 : 300}>
                  <BarChart data={stats.wilayaData} margin={{ 
                    top: 5, 
                    right: isMobile ? 5 : 30, 
                    left: isMobile ? 5 : 20, 
                    bottom: isMobile ? 80 : 40 
                  }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={theme.palette.text.primary} 
                      fontSize={isMobile ? 6 : 10}
                      angle={-45}
                      textAnchor="end"
                      height={isMobile ? 80 : 60}
                      interval={0}
                    />
                    <YAxis 
                      stroke={theme.palette.text.primary} 
                      fontSize={isMobile ? 8 : 12}
                      width={isMobile ? 25 : 40}
                    />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    {!isMobile && <Legend />}
                    <Bar 
                      dataKey="Pourcentage Admis" 
                      fill={theme.palette.secondary.main}
                      radius={[2, 2, 0, 0]}
                    />
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
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" align="center" gutterBottom sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}>
                  Pourcentage Admis par Noreg
                </Typography>
                <ResponsiveContainer width={isMobile ? '100%' : '450px'} height={isMobile ? 250 : 300}>
                  <BarChart data={stats.noregData} margin={{ 
                    top: 5, 
                    right: isMobile ? 10 : 30, 
                    left: isMobile ? 10 : 20, 
                    bottom: isMobile ? 40 : 5 
                  }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'} />
                    <XAxis 
                      dataKey="name" 
                      fontSize={isMobile ? 8 : 12}
                      angle={isMobile ? -45 : 0}
                      textAnchor={isMobile ? "end" : "middle"}
                      height={isMobile ? 40 : 30}
                    />
                    <YAxis 
                      fontSize={isMobile ? 8 : 12}
                      width={isMobile ? 30 : 40}
                    />
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    {!isMobile && <Legend />}
                    <Bar 
                      dataKey="Pourcentage Admis"
                      fill="#FFBB28"
                      radius={[2, 2, 0, 0]}
                    />
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
