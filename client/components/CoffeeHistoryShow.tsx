// CoffeeHistoryShow.tsx
'use client';
import * as React from 'react';
import { Show, SimpleShowLayout, TextField, NumberField, FunctionField } from 'react-admin';
import { Box, Typography } from '@mui/material';
import StrengthBarField from './fields/StrengthBarField';
import FreshnessChipField from './fields/FreshnessChipField';
import styles from './CoffeeHistoryShow.module.css';

export const CoffeeHistoryShow = () => {
  type CoffeeHistoryEntry = {
  id: number;
  timestamp: string;
  cupsServed: number;
  avgTempC: number;
  avgStrength: number;
  avgPH: number;
  wasteWaterColor: string;
  };

  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="timestamp" label="Time" />
        <NumberField source="cupsServed" label="Cups" />
        <NumberField source="avgTempC" label="Avg Temp (°C)" />
        {/* Strength visual bar */}
        <StrengthBarField source="avgStrength" label="Strength" />
        <NumberField source="avgPH" label="pH" />
        {/* Freshness indicator */}
        <FreshnessChipField source="timestamp" label="Freshness" />
        {/* Waste water color with swatch */}
        <FunctionField
          label="Water"
          render={(record: any) => (
            <Box className={styles.waterContainer}>
              <Box
                component="span"
                className={styles.waterSwatch}
                style={{ backgroundColor: record.wasteWaterColor }}
              />
              <Typography variant="body2">{record.wasteWaterColor}</Typography>
            </Box>
          )}
        />
        {/* Quality Score */}
        <FunctionField
            label="Quality Score"

            render={(record: CoffeeHistoryEntry) => {
                const score =Math.round((record.avgStrength || 0) * 100);
                let textLabel = '';
                if (score > 74) textLabel = 'Good';
                else if (score >= 65) textLabel = 'Acceptable';
                else textLabel = 'Weak';

                return (
                  <span>
                      {score} ({textLabel})
                  </span>
                );
            }}
        />
        {/* Deviation from maximum strength */}
        <FunctionField
          label="Deviation from Max"
          render={(record: CoffeeHistoryEntry) => {
            const maxStrength = 1; // assuming max strength is 1
            return `${Math.round((maxStrength - (record.avgStrength || 0)) * 100)}%`;
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
};
