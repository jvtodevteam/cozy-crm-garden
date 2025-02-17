
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

interface Client {
  ClientID: number;
  ClientName: string;
  ContactNumber: string;
  EmailAddress: string;
  Nationality: string;
  Bookings: Booking[];
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

export const ClientDetail = ({ client, onClose }: ClientDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10">
          <CardTitle>Client Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Booking History</h3>
            <DataTable
              columns={bookingColumns}
              data={client.Bookings}
              onRowClick={(booking) => console.log('Booking details:', booking)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
