import * as React from 'react';
import {Box, Typography, LinearProgress } from '@mui/material';

 
function CupGauge({ value, max = 8 }: { value: number; max?: number }) {
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


export default React.memo(CupGauge);