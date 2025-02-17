
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { Button } from "@/components/ui/button";
import { X, Activity } from "lucide-react";

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

interface ClientDetailProps {
  client: Client;
  onClose: () => void;
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

const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    type: "Booking Created",
    description: "New booking created for Mount Bromo Tour",
    timestamp: "2024-03-15 10:30 AM",
    details: "Booking Reference: STS600155"
  },
  {
    id: 2,
    type: "Contact Updated",
    description: "Client phone number updated",
    timestamp: "2024-03-14 02:15 PM",
    details: "Previous: +62 811-1111-2222"
  },
  {
    id: 3,
    type: "Payment Received",
    description: "Full payment received for Ijen Crater Tour",
    timestamp: "2024-03-13 09:45 AM",
    details: "Amount: $250"
  }
];

export const ClientDetail = ({ client, onClose }: ClientDetailProps) => {
  // Adding mock activity logs to the client
  const clientWithLogs = {
    ...client,
    activityLogs: mockActivityLogs
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 border-b">
          <CardTitle>Client Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Client Information */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Client ID</p>
              <p className="font-medium">{clientWithLogs.ClientID}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{clientWithLogs.ClientName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nationality</p>
              <p className="font-medium">{clientWithLogs.Nationality}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Contact Number</p>
              <p className="font-medium">{clientWithLogs.ContactNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{clientWithLogs.EmailAddress}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="font-medium">{clientWithLogs.Bookings.length}</p>
            </div>
          </div>

          {/* Booking History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Booking History
              <span className="text-sm font-normal text-muted-foreground">
                ({clientWithLogs.Bookings.length} bookings)
              </span>
            </h3>
            <DataTable
              columns={bookingColumns}
              data={clientWithLogs.Bookings}
              onRowClick={(booking) => console.log('Booking details:', booking)}
            />
          </div>

          {/* Activity Logs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Log
              <span className="text-sm font-normal text-muted-foreground">
                ({clientWithLogs.activityLogs.length} activities)
              </span>
            </h3>
            <DataTable
              columns={activityColumns}
              data={clientWithLogs.activityLogs}
              onRowClick={(activity) => console.log('Activity details:', activity)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
