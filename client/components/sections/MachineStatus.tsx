
import * as React from 'react';
import {Box, Typography, Grid} from '@mui/material';
import StatCard from '../ui/StatCard';
import CupGauge from '../ui/CupGauge';
import styles from '../Dashboard.module.css';
import type { CoffeeStatus  } from '../types';

type Props = {
  status: CoffeeStatus;
  maxCups: number;
};

export default function MachineStatus({ status, maxCups }: Props) {
    type CSSVars = React.CSSProperties & { ['--swatch-color']?: string };
    const swatch = (c: string): CSSVars => ({ '--swatch-color': c });

    return(
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', my: 1 }}>
              <Typography variant="h6">Machine Status</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Updated:{' '}
                {status?.updatedAt
                    ? new Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                        timeZone: 'Europe/Berlin',
                    }).format(new Date(status.updatedAt))
                    : '—'}
                </Typography>
            </Box>

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
                      style={swatch(status.waterColor)} />
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
              <CupGauge value={status.cupsLeft ?? 0} max={status.capacity ?? maxCups} />
            </Box>
        </Box>
    );
}

