
import React from 'react';
import { ClientList } from '@/components/ClientList';

const Index = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CRM Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your clients and their bookings efficiently.
        </p>
      </div>
      <ClientList />
    </div>
  );
};

export default Index;
