export type UserRole = 'admin' | 'shop' | 'customer';

export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  token?: string;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  hours: string;
  distance: string;
  price: string;
  tags: string[];
  image: string;
  verified: boolean;
  badge?: string | null;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  weight: string;
  image: string;
  ownerId?: string;
}
