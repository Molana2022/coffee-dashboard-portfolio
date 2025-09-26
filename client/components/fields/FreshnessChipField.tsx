'use client';
import * as React from 'react';
import { useRecordContext, type FieldProps } from 'react-admin';
import { Chip } from '@mui/material';

type Rec = { timestamp?: string };

function minutesSince(iso?: string): number | null {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(diff / 60000));
}

export default function FreshnessChipField(props: FieldProps<Rec> & { label?: string }) {
  const record = useRecordContext<Rec>(props);
  if (!record) return null;

  const mins = minutesSince(record.timestamp);
  if (mins == null) return <Chip size="small" label="—" />;
  
// Thresholds
  const color: 'success' | 'warning' | 'error' =
    mins <= 15 ? 'success' : mins <= 60 ? 'warning' : 'error';

  const label = mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h`;
  return <Chip size="small" label={label} color={color} sx={{ textAlign: 'center' }} variant="filled" />;
}
