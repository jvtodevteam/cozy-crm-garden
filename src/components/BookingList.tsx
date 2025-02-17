
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { SearchBar } from './SearchBar';
import { format } from 'date-fns';

interface Booking {
  BookingID: number;
  BookingReferenceID: string;
  ClientID: number;
  OrderChannel: string;
  TourPackage: string;
  NumberOfParticipants: number;
  ArrivalDate: string;
  ArrivalTime: string;
  PickupLocation: string;
  DropoffLocation: string;
  SpecialRequirements: string;
}

const mockBookings: Booking[] = [
  {
    BookingID: 5001,
    BookingReferenceID: "STS600155",
    ClientID: 101,
    OrderChannel: "Klook",
    TourPackage: "3D2N Mount Bromo, Madakaripura Waterfall & Ijen Crater Tour",
    NumberOfParticipants: 2,
    ArrivalDate: "2024-08-19",
    ArrivalTime: "10:00 AM",
    PickupLocation: "Juanda International Airport",
    DropoffLocation: "Bumi Surabaya City Resort",
    SpecialRequirements: "Vegetarian meals, additional tour guide"
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'BookingID', label: 'ID', sortable: true },
  { key: 'BookingReferenceID', label: 'Reference', sortable: true },
  { key: 'ClientID', label: 'Client ID', sortable: true },
  { key: 'OrderChannel', label: 'Channel', sortable: true },
  { key: 'TourPackage', label: 'Package', sortable: true },
  { key: 'NumberOfParticipants', label: 'Participants', sortable: true },
  { key: 'ArrivalDate', label: 'Arrival Date', sortable: true },
  { key: 'ArrivalTime', label: 'Time', sortable: true },
];

export const BookingList = () => {
  const [bookings, setBookings] = React.useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = React.useState<Booking[]>(mockBookings);

  const handleSearch = (query: string) => {
    const filtered = bookings.filter((booking) =>
      Object.values(booking).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredBookings(filtered);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    const sorted = [...filteredBookings].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredBookings(sorted);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search bookings..." />
        </div>
        <DataTable
          columns={columns}
          data={filteredBookings}
          onSort={handleSort}
          onRowClick={(booking) => console.log('Clicked booking:', booking)}
        />
      </CardContent>
    </Card>
  );
};
