"use client";
import * as React from 'react';
import {Title, useGetList, useGetOne} from 'react-admin';
import {Box, Divider, Stack} from '@mui/material';

export default function Dashboard() {
  // Better fetch singleton coffee status from API via react-admins dataprovider
  const status={cupsLeft:2,strength:100,waterPH:7.5};

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

  //const loading = statusLoading || historyLoading;

  return (
    <Box sx={{ p: 3 }}>
      <Title title="Dashboard" />
        {status && (
            <Stack spacing={1}>
                <Box>Cups left: {status.cupsLeft ?? 0}</Box>
                <Box>Strength: {status.strength}</Box>
                <Box>pH: {status.waterPH}</Box>
            </Stack>
        )}

        <Divider />

        {history && (
            <Stack spacing={1}>
                {history.map((h: any) => (
                    <Box>
                        {new Date(h.timestamp).toLocaleString()}: Cups: {h.cupsServed} · Temp: {h.avgTempC} °C · Strength: {h.avgStrength} · pH: {h.avgPH} · Water: <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, bgcolor: h.wasteWaterColor, border: '1px solid #ccc', verticalAlign: 'middle', mr: 0.5 }} /> {h.wasteWaterColor}
                    </Box>
                ))}
            </Stack>
        )}
    </Box>
  );
}
