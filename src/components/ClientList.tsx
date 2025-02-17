
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from './DataTable';
import { SearchBar } from './SearchBar';

interface Client {
  ClientID: number;
  ClientName: string;
  ContactNumber: string;
  EmailAddress: string;
  Nationality: string;
}

const mockClients: Client[] = [
  {
    ClientID: 101,
    ClientName: "YONG ERN LIM",
    ContactNumber: "+62 812-3456-7890",
    EmailAddress: "client@example.com",
    Nationality: "Malaysian"
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'ClientID', label: 'ID', sortable: true },
  { key: 'ClientName', label: 'Name', sortable: true },
  { key: 'ContactNumber', label: 'Contact', sortable: false },
  { key: 'EmailAddress', label: 'Email', sortable: true },
  { key: 'Nationality', label: 'Nationality', sortable: true },
];

export const ClientList = () => {
  const [clients, setClients] = React.useState<Client[]>(mockClients);
  const [filteredClients, setFilteredClients] = React.useState<Client[]>(mockClients);

  const handleSearch = (query: string) => {
    const filtered = clients.filter((client) =>
      Object.values(client).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredClients(filtered);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    const sorted = [...filteredClients].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredClients(sorted);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} placeholder="Search clients..." />
        </div>
        <DataTable
          columns={columns}
          data={filteredClients}
          onSort={handleSort}
          onRowClick={(client) => console.log('Clicked client:', client)}
        />
      </CardContent>
    </Card>
  );
};
