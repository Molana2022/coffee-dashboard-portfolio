"use client";
import * as React from 'react';
import {Title, useGetList, useGetOne} from 'react-admin';
import {Box, Divider, Typography, Alert } from '@mui/material';
import MachineStatus from './sections/MachineStatus';
import BrewingTrends from './charts/BrewingTrends';
import type { CoffeeStatus, CoffeeHistoryEntry, TrendPoint, RangeKey } from './types';
import RecentBrews from './sections/RecentBrews';

export default function Dashboard() {

  const { data: status, isLoading: statusLoading, error: statusError } =
    useGetOne<CoffeeStatus>('coffeeStatus', { id: 1 });
  const MAX_CUPS = Number(process.env.NEXT_PUBLIC_MAX_CUPS) || 8;

  // Fetch recent history entries
  const RECENT_COUNT = 5;
  const { data: history  = [], isLoading: historyLoading, error: historyError } = useGetList<CoffeeHistoryEntry>(
    'coffeeHistory',
    {
      pagination: { page: 1, perPage: RECENT_COUNT },
      sort: { field: 'timestamp', order: 'DESC' },
      filter: {},
    },
    { retry: 1 }
  );

  // Brewing Trends
  const [range, setRange] = React.useState<RangeKey>('all');

  // --- Fetching History data (typed)
  const {
    data: historyChart = [],
    isLoading: chartLoading,
    error: chartError,
  } = useGetList<CoffeeHistoryEntry>('coffeeHistory', {
    pagination: { page: 1, perPage: 100 },     
    sort: { field: 'timestamp', order: 'ASC' }, 
    filter: {},
  });

  // X Axis
  const trendData: TrendPoint[] = React.useMemo(() => {
    const sorted = [...historyChart].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    return sorted.map((h) => ({
      ...h,
      tLabel: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  }, [historyChart]);

  // --- Filter by time range
  const filteredData: TrendPoint[] = React.useMemo(() => {
    if (range === 'all') return trendData;

    const hours = range === '1h' ? 1 : 3;
    const nowTs = Date.now();
    const fromTs = nowTs - hours * 60 * 60 * 1000;

    return trendData.filter((d) => {
      const t = new Date(d.timestamp).getTime();
      return t >= fromTs && t <= nowTs; 
    });
  }, [trendData, range]);

  
  return (
    <Box sx={{ m: 2 }}>
      <Title title="Dashboard" />
      
      {statusError ? (
        <Alert severity="error">Error fetching status</Alert>
      ) : statusLoading ? (
      <Typography>Loading status…</Typography>
      ): status ? (
          <MachineStatus status={status} maxCups={MAX_CUPS} />
      ) : null}

      <Divider sx={{ my: 3 }} />
      <BrewingTrends data={filteredData} range={range} onChangeRange={setRange} loading={chartLoading}  error={chartError} />
      <RecentBrews history={history} loading={historyLoading} error={historyError} count={RECENT_COUNT} />
    </Box>
  );
}
