export interface Listing {
  id: string;
  title: string;
  address: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
  type: string;
  status: string;
  isActive: boolean;
  price: number;
  area: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    name: string;
    contact: string;
  };
}

export interface AddressDetails {
  country: string;
  city: string;
  street: string;
  number: string;
}

export interface ValidationErrors {
  title?: string;
  country?: string;
  city?: string;
  street?: string;
  number?: string;
  description?: string;
  type?: string;
  status?: string;
  isActive?: string;
  price?: string;
  area?: string;
  ownerName?: string;
  ownerContact?: string;
}

export interface AddedPropertyCardProps {
  property: Listing;
}

export interface PropertyMapProps {
  center: [number, number];
  zoom: number;
  address: string;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export interface SortButtonsProps {
  onSort: (order: "asc" | "desc") => void;
}
