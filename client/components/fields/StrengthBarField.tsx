'use client';
import * as React from 'react';
import { useRecordContext, type FieldProps } from 'react-admin';
import { Box, Tooltip } from '@mui/material';

type Rec = { avgStrength?: number };

export default function StrengthBarField(props: FieldProps<Rec> & { label?: string }) {
  const record = useRecordContext<Rec>(props);
  if (!record) return null;

  const value = record.avgStrength ?? 0;     // 0..1
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));

  // Color based on strength
  const barColor =
    pct >= 74 ? 'success.main' :'warning.main'

  return (
    <Tooltip title={`${pct}%`} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{
          width: 64, height: 8, bgcolor: 'action.disabledBackground',
          borderRadius: 9999, overflow: 'hidden'
        }}>
          <Box sx={{ width: `${pct}%`, height: '100%', bgcolor: barColor }} />
        </Box>
        <Box component="span" sx={{ fontSize: 12, opacity: 0.7 }}>{pct}%</Box>
      </Box>
    </Tooltip>
  );
}
