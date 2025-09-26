import * as React from 'react';
import { Paper, Typography } from '@mui/material';

type StatCardProps = {
  label: string;
  value: React.ReactNode;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>{label}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}

export default React.memo(StatCard);
