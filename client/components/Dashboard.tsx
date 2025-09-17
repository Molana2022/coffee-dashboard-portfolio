"use client";
import * as React from 'react';
import { Title, useGetOne, useGetList } from 'react-admin';
import { Card, CardContent, CardHeader, Grid, Typography, LinearProgress, List, ListItem, ListItemText, Box, Chip, Stack, Divider } from '@mui/material';

export default function Dashboard() {
  // Fetch singleton coffee status via react-admin
  const { data: status, isLoading: statusLoading, error: statusError } = useGetOne(
    'coffeeStatus',
    { id: 1 },
    { retry: 1 }
  );

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

  const loading = statusLoading || historyLoading;

  return (
    <Box sx={{ p: 3 }}>
      <Title title="Dashboard" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardHeader title="Machine Status" />
            {loading && <LinearProgress />}
            <CardContent>
              {statusError && (
                <Typography color="error">Failed to load status: {String(statusError)}</Typography>
              )}
              {!status && !loading && !statusError && (
                <Typography color="text.secondary">No status available</Typography>
              )}
              {status && (
                <Stack spacing={1}>
                  <Typography>
                    Creator: <b>{status.creator}</b>
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={`Cups left: ${status.cupsLeft ?? 0}`} color="primary" variant="outlined" />
                    <Chip label={`Strength: ${status.strength}`} variant="outlined" />
                    <Chip label={`pH: ${status.waterPH}`} variant="outlined" />
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 120, height: 160, border: '2px solid #333', borderRadius: 1, position: 'relative', bgcolor: '#fff' }}>
                      {(() => {
                        const maxCups = 12;
                        const cupsLeft = Math.max(0, Math.min(maxCups, Number(status.cupsLeft || 0)));
                        const fillPct = Math.round((cupsLeft / maxCups) * 100);
                        return (
                          <>
                            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${fillPct}%`, bgcolor: '#6f4e37' }} />
                            <Box sx={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center' }}>Cups left: {cupsLeft}</Box>
                          </>
                        );
                      })()}
                    </Box>
                    <Stack>
                      <Typography>
                        Temperature: <b>{status.temperatureC} °C</b>
                      </Typography>
                      <Typography>
                        Water color: <Box component="span" sx={{ display: 'inline-block', width: 16, height: 16, bgcolor: status.waterColor, border: '1px solid #ccc', verticalAlign: 'middle', mr: 1 }} />
                        <code>{status.waterColor}</code>
                      </Typography>
                      <Typography>
                        Last brew: <b>{new Date(status.lastBrewFinishedAt).toLocaleTimeString()}</b>
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardHeader title="Recent Brews" action={<a href="#/coffeeHistory">View all</a>} />
            {loading && <LinearProgress />}
            <CardContent>
              {historyError && (
                <Typography color="error">Failed to load history: {String(historyError)}</Typography>
              )}
              {history && history.length > 0 ? (
                <List dense>
                  {history.map((h: any) => (
                    <React.Fragment key={h.id}>
                      <ListItem secondaryAction={<Chip size="small" label={`${h.cupsServed} cups`} />}>
                        <ListItemText
                          primary={<span><b>{new Date(h.timestamp).toLocaleString()}</b></span>}
                          secondary={
                            <span>
                              Temp: {h.avgTempC} °C · Strength: {h.avgStrength} · pH: {h.avgPH} · Water: <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: h.wasteWaterColor, border: '1px solid #ccc', verticalAlign: 'middle', mr: 0.5 }} /> {h.wasteWaterColor}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                !loading && <Typography color="text.secondary">No recent history</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
