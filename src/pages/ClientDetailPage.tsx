
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from '@/components/DataTable';
import { Activity } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface Booking {
  BookingID: number;
  BookingReferenceID: string;
  OrderChannel: string;
  TourPackage: string;
  NumberOfParticipants: number;
  ArrivalDate: string;
  ArrivalTime: string;
  PickupLocation: string;
  DropoffLocation: string;
  SpecialRequirements: string;
}

interface ActivityLog {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  details?: string;
}

interface Client {
  ClientID: number;
  ClientName: string;
  ContactNumber: string;
  EmailAddress: string;
  Nationality: string;
  Bookings: Booking[];
  activityLogs: ActivityLog[];
}

const bookingColumns = [
  { key: 'BookingReferenceID', label: 'Reference ID', sortable: true },
  { key: 'TourPackage', label: 'Package', sortable: true },
  { key: 'OrderChannel', label: 'Channel', sortable: true },
  { key: 'NumberOfParticipants', label: 'Pax', sortable: true },
  { key: 'ArrivalDate', label: 'Date', sortable: true },
  { key: 'ArrivalTime', label: 'Time', sortable: true },
];

const activityColumns = [
  { key: 'type', label: 'Type', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'timestamp', label: 'Time', sortable: true },
  { key: 'details', label: 'Details', sortable: true },
];

const ClientDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  if (!client) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p>Client not found</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Back to Clients
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Client Details</h1>
        <Button onClick={() => navigate('/')}>
          Back to Clients
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Client Information */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Client ID</p>
              <p className="font-medium">{client.ClientID}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{client.ClientName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nationality</p>
              <p className="font-medium">{client.Nationality}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Contact Number</p>
              <p className="font-medium">{client.ContactNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.EmailAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="font-medium">{client.Bookings.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle>
            Booking History
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({client.Bookings.length} bookings)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={bookingColumns}
            data={client.Bookings}
            onRowClick={(booking) => console.log('Booking details:', booking)}
          />
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Log
            <span className="text-sm font-normal text-muted-foreground">
              ({client.activityLogs.length} activities)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={activityColumns}
            data={client.activityLogs}
            onRowClick={(activity) => console.log('Activity details:', activity)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailPage;
