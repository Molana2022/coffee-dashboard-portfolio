import * as React from 'react';
import {Box, Stack, Typography, Alert } from '@mui/material';
import styles from '../AdminApp.module.css';
import type { CoffeeHistoryEntry } from '../types';

type CSSVars = React.CSSProperties & { ['--waste-water-color']?: string };
const ww = (c: string): CSSVars => ({ '--waste-water-color': c });

type Props = {
  history: CoffeeHistoryEntry[];   
  loading?: boolean;
  error?: unknown;
  title?: string;
  count?: number;                    
};


const RecentBrews: React.FC<Props> = ({ history = [], loading, error, title = 'Recent Brews', count }) =>
{
  {
    if (error)   return <Alert severity="error">Error fetching history</Alert>;
    if (loading) return <Typography>Loading history…</Typography>;
    if (!history.length) return <Typography sx={{ opacity: .7 }}>No history.</Typography>;
    const shown = history.length; 
    
    return(
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', mt:2, mb:1 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" sx={{ color:'text.secondary' }}>
            Showing last {count ? Math.min(shown, count) : shown} entries
          </Typography>
        </Box>

        <Stack spacing={1}>
          {history.map((h) => (
            <Box key={h.id}>
              {new Date(h.timestamp).toLocaleString()}:
              {' '}Cups: {h.cupsServed} ·
              {' '}Temp: {h.avgTempC} °C ·
              {' '}Strength: {h.avgStrength} ·
              {' '}pH: {h.avgPH} ·
              {' '}Water:{' '}
              <Box
                component="span"
                className={styles.wasteWaterSwatch}
                style={ww(h.wasteWaterColor)}
              />
              {h.wasteWaterColor}
            </Box>
          ))}
        </Stack>
      </Box>
    );
    }
}

export default RecentBrews;