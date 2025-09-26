'use client';
import * as React from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid, Cell
} from 'recharts';
import type { TrendPoint, RangeKey } from '../types';

type Props = {
  data: TrendPoint[];                 // filteredData
  range: RangeKey;                    
  onChangeRange: (r: RangeKey) => void;
  loading?: boolean;
  error?: unknown;
};

export default function BrewingTrends({
  data,
  range,
  onChangeRange,
  loading,
  error,
}: Props) {

  const handleRangeChange = (_: React.MouseEvent<HTMLElement>, v: RangeKey | null) => {
    if (v) onChangeRange(v);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Brewing Trends</Typography>
        <ToggleButtonGroup
          size="small"
          value={range}
          exclusive
          onChange={handleRangeChange}
          aria-label="time range"
        >
          <ToggleButton value="1h">1h</ToggleButton>
          <ToggleButton value="3h">3h</ToggleButton>
          <ToggleButton value="all">All</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 320 }}>
        {loading ? (
          <Typography variant="body2">Loading chart…</Typography>
        ) : error ? (
          <Typography variant="body2" color="error.main">Error fetching history for the chart</Typography>
        ) : data.length === 0 ? (
          <Box sx={{
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px dashed #ddd', borderRadius: 1, color: 'text.secondary'
          }}>
            No data in the selected range.
          </Box>
        ) : (
          <ResponsiveContainer>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tLabel" />
              <YAxis yAxisId="left"  label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" label={{ value: 'Cups', angle: -90, position: 'insideRight' }} orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="right" dataKey="cupsServed" name="Cups Served">
                {data.map(d => <Cell key={d.id} fill={d.wasteWaterColor ?? '#6A463F'} />)}
              </Bar>
              <Line yAxisId="left" type="monotone" dataKey="avgTempC" name="Avg Temp (°C)" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
}
