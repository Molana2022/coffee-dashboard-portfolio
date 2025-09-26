"use client";
import * as React from 'react';
import StrengthBarField from './fields/StrengthBarField';
import FreshnessChipField from './fields/FreshnessChipField';
import { Admin, FunctionField, Resource, List, Datagrid, DateField, NumberField, TextField } from 'react-admin';
import { Box } from '@mui/material';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';
import { CoffeeHistoryShow } from './CoffeeHistoryShow';
import type { CoffeeHistoryEntry } from './types';
import styles from './AdminApp.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const dataProvider = jsonServerProvider(apiUrl);

const HistoryList = () => (
  <List resource="coffeeHistory">
    <Datagrid rowClick={"show"}>
      <DateField source="timestamp" label="Timestamp" showTime />
      <NumberField source="cupsServed" label="Cups" sx={{ textAlign: 'center' }} />
      <NumberField source="avgTempC" label="Avg Temp (°C)" sx={{ textAlign: 'left' }} />
      {/* Visual column for strength/concentration */}
      <StrengthBarField source="avgStrength" label="Strength" />
      <NumberField source="avgStrength" />
      <NumberField source="avgPH" label="pH" sx={{ textAlign: 'left' }} />
      <TextField source="wasteWaterColor" />
      {/* Waste water color column (small swatch) */}
      <FunctionField
        label="Water"
        sx={{ textAlign: 'center' }}
        render={(rec: CoffeeHistoryEntry) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              component="span"
              className={styles.waterSwatch}
              style={{ backgroundColor: rec.wasteWaterColor}}
            />
            <span>{rec.wasteWaterColor}</span>
          </Box>
        )}
      />
      {/* Freshness column */}
      <FreshnessChipField source="timestamp" label="Freshness" />
    </Datagrid>
  </List>
);

export default function AdminApp() {
  return (
    <Admin basename="/" dataProvider={dataProvider} dashboard={Dashboard}>
      <Resource name="coffeeHistory" list={HistoryList} show={CoffeeHistoryShow} />
    </Admin>
  );
}
