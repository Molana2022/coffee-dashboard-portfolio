"use client";
import * as React from 'react';
import {Title, useGetList, useGetOne} from 'react-admin';
import StatCard from '../components/ui/StatCard';
import {Box, Divider, Stack, Grid, Typography, LinearProgress } from '@mui/material';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  // Actual status from /coffeeStatus/1
  const { data: status, isLoading: statusLoading, error: statusError } =
    useGetOne('coffeeStatus', { id: 1 });

  // Fetch recent history entries
  const { data: history, isLoading: historyLoading, error: historyError } = useGetList(
    'coffeeHistory',
    {
      pagination: { page: 1, perPage: 5 },
      sort: { field: 'timestamp', order: 'DESC' },
      filter: {},
    },
    { retry: 1 }
  );
  const MAX_CUPS = Number(process.env.NEXT_PUBLIC_MAX_CUPS) || 15;
  //console.log('MAX_CUPS=' , MAX_CUPS);
  //loading 
  if (statusLoading || historyLoading) 
    return <Box sx={{ p: 3 }}>Loading…</Box>;

  if (statusError) 
    return <Box sx={{ p: 3, color: 'error.main' }}>Error fetching status</Box>;

  if (historyError) 
    return <Box sx={{ p: 3, color: 'error.main' }}>Error fetching history</Box>;

  return (
    <Box sx={{ mb: 2 }}>
      <Title title="Dashboard" />
        {status && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ my: 1 }}>Machine Status</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="Cups left" value={status.cupsLeft ?? 0} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="Temperature" value={`${status.temperatureC} °C`} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="Strength" value={status.strength} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="pH" value={status.waterPH} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="Water Color" value={
                  <>
                    <Box 
                      component="span" 
                      className= {styles.swatch} 
                      style={{ ['--swatch-color' as any]: status.waterColor }} />
                    {status.waterColor}
                  </>
                }
              />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatCard label="Creator" value={status.creator} />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>Cups left gauge</Typography>
              <CupGauge value={status.cupsLeft ?? 0} max={status.capacity ?? MAX_CUPS} />
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {history && (
            <Stack spacing={1}>
                {history.map((h: any) => (
                    <Box key={h.id}>
                        {new Date(h.timestamp).toLocaleString()}: 
                        {' '}Cups: {h.cupsServed} · 
                        {' '}. Temp: {h.avgTempC} °C · 
                        {' '}. Strength: {h.avgStrength} · 
                        {' '}. pH: {h.avgPH} · 
                        {' '}. Water:{' '} 
                        <Box 
                          component="span" 
                          className={styles.wasteWaterSwatch}
                          style={{ ['--waste-water-color' as any]: h.wasteWaterColor }} />
                        {h.wasteWaterColor}
                    </Box>
                ))}
            </Stack>
        )}
    </Box>
  );
}

function CupGauge({ value, max = 15 }: { value: number; max?: number }) {
  const safeMax = Math.max(1, max);
  const pct = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span>☕</span>
      <Box sx={{ flex: 1 }}>
        <LinearProgress variant="determinate" value={pct} />
      </Box>
      <Typography variant="body2">{value}/{safeMax}</Typography>
    </Box>
  );
}

