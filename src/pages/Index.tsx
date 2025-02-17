
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientList } from '@/components/ClientList';
import { BookingList } from '@/components/BookingList';

const Index = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CRM Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your clients and bookings efficiently.
        </p>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="clients" className="mt-6">
          <ClientList />
        </TabsContent>
        <TabsContent value="bookings" className="mt-6">
          <BookingList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
