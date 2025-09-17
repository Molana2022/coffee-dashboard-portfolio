"use client";
import * as React from 'react';
import { Admin, Resource, List, Datagrid, DateField, NumberField, TextField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const dataProvider = jsonServerProvider(apiUrl);

const HistoryList = () => (
  <List resource="coffeeHistory">
    <Datagrid rowClick={"show"}>
      <DateField source="timestamp" />
      <NumberField source="cupsServed" />
      <NumberField source="avgTempC" />
      <NumberField source="avgStrength" />
      <NumberField source="avgPH" />
      <TextField source="wasteWaterColor" />
    </Datagrid>
  </List>
);

export default function AdminApp() {
  return (
    <Admin basename="/" dataProvider={dataProvider} dashboard={Dashboard}>
      <Resource name="coffeeHistory" list={HistoryList} />
      {/* coffeeStatus is a singleton at /status mapped to coffeeStatus/1 */}
    </Admin>
  );
}
