import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { SearchBar } from './SearchBar';
import { ClientDetail } from './ClientDetail';

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

const mockClients: Client[] = [
  {
    ClientID: 101,
    ClientName: "YONG ERN LIM",
    ContactNumber: "+62 812-3456-7890",
    EmailAddress: "client@example.com",
    Nationality: "Malaysian",
    Bookings: [
      {
        BookingID: 5001,
        BookingReferenceID: "STS600155",
        OrderChannel: "Klook",
        TourPackage: "3D2N Mount Bromo, Madakaripura Waterfall & Ijen Crater Tour",
        NumberOfParticipants: 2,
        ArrivalDate: "2024-08-19",
        ArrivalTime: "10:00 AM",
        PickupLocation: "Juanda International Airport",
        DropoffLocation: "Bumi Surabaya City Resort",
        SpecialRequirements: "Vegetarian meals, additional tour guide"
      },
      {
        BookingID: 5002,
        BookingReferenceID: "STS600156",
        OrderChannel: "Direct",
        TourPackage: "2D1N Ijen Crater Blue Fire Tour",
        NumberOfParticipants: 1,
        ArrivalDate: "2024-09-15",
        ArrivalTime: "08:00 AM",
        PickupLocation: "Ketapang Harbor",
        DropoffLocation: "Ketapang Harbor",
        SpecialRequirements: "Early morning pickup"
      }
    ]
  },
  {
    ClientID: 102,
    ClientName: "JOHN DOE",
    ContactNumber: "+1 234-567-8900",
    EmailAddress: "john.doe@example.com",
    Nationality: "American",
    Bookings: [
      {
        BookingID: 5003,
        BookingReferenceID: "STS600157",
        OrderChannel: "Website",
        TourPackage: "1D Mount Bromo Sunrise Tour",
        NumberOfParticipants: 4,
        ArrivalDate: "2024-10-01",
        ArrivalTime: "03:00 AM",
        PickupLocation: "Surabaya Hotel",
        DropoffLocation: "Surabaya Hotel",
        SpecialRequirements: "Family with children"
      }
    ]
  }
];

const columns = [
  { key: 'ClientID', label: 'ID', sortable: true },
  { key: 'ClientName', label: 'Name', sortable: true },
  { key: 'ContactNumber', label: 'Contact', sortable: false },
  { key: 'EmailAddress', label: 'Email', sortable: true },
  { key: 'Nationality', label: 'Nationality', sortable: true },
  { 
    key: 'Bookings', 
    label: 'Total Bookings', 
    sortable: true,
    render: (bookings: Booking[]) => bookings.length.toString()
  }
];

export const ClientList = () => {
  const [clients, setClients] = React.useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [filteredClients, setFilteredClients] = React.useState<Client[]>(mockClients);

  const handleSearch = (query: string) => {
    const filtered = clients.filter((client) =>
      Object.entries(client).some(([key, value]) => {
        if (key === 'Bookings') {
          return client.Bookings.some(booking => 
            Object.values(booking).some(v => 
              v.toString().toLowerCase().includes(query.toLowerCase())
            )
          );
        }
        return value.toString().toLowerCase().includes(query.toLowerCase());
      })
    );
    setFilteredClients(filtered);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    const sorted = [...filteredClients].sort((a, b) => {
      if (key === 'Bookings') {
        if (direction === 'asc') {
          return a.Bookings.length - b.Bookings.length;
        }
        return b.Bookings.length - a.Bookings.length;
      }
      
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredClients(sorted);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} placeholder="Search clients and bookings..." />
          </div>
          <DataTable
            columns={columns}
            data={filteredClients}
            onSort={handleSort}
            onRowClick={(client) => setSelectedClient(client)}
          />
        </CardContent>
      </Card>

      {selectedClient && (
        <ClientDetail 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </>
  );
};
