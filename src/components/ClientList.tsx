import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { SearchBar } from './SearchBar';
import { useNavigate } from 'react-router-dom';

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
    ],
    activityLogs: [
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
    ],
    activityLogs: [
      {
        id: 1,
        type: "Booking Created",
        description: "New booking created for Bromo Sunrise Tour",
        timestamp: "2024-03-10 09:15 AM",
        details: "Booking Reference: STS600157"
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
  const [filteredClients, setFilteredClients] = React.useState<Client[]>(mockClients);
  const navigate = useNavigate();

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

  const handleClientClick = (client: Client) => {
    navigate(`/client/${client.ClientID}`, { state: { client } });
  };

  return (
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
          onRowClick={handleClientClick}
        />
      </CardContent>
    </Card>
  );
};
