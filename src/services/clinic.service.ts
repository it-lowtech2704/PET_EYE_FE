import apiClient from './apiClient';
import { Clinic } from '../types';

const MOCK_CLINICS: Clinic[] = [
    {
        id: 1,
        name: 'Phòng Khám Thú Y PetCare Sài Gòn',
        address: '123 Nguyễn Thị Thập, Quận 7, TP.HCM',
        rating: 4.8,
        reviewCount: 120,
        isOpen: true,
        hours: '08:00 - 20:00',
        distance: '1.2 km',
        price: 'Từ 150.000đ',
        tags: ['Siêu âm', 'Phẫu thuật', 'Spa', 'Cấp cứu 24/7'],
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop',
        verified: true,
        badge: 'Top rated',
    },
    {
        id: 2,
        name: 'Bệnh Viện Thú Y Quận 1',
        address: '45 Lê Lai, Quận 1, TP.HCM',
        rating: 4.6,
        reviewCount: 85,
        isOpen: true,
        hours: '07:30 - 21:00',
        distance: '2.8 km',
        price: 'Từ 200.000đ',
        tags: ['Khám tổng quát', 'Tiêm phòng', 'Nội soi'],
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
        verified: true,
        badge: null,
    },
    {
        id: 3,
        name: 'Pet Spa & Grooming Luxury',
        address: '77 Nguyễn Huệ, Quận 1, TP.HCM',
        rating: 4.9,
        reviewCount: 200,
        isOpen: false,
        hours: '09:00 - 18:00',
        distance: '3.1 km',
        price: 'Từ 250.000đ',
        tags: ['Grooming', 'Spa', 'Cắt tỉa lông'],
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop',
        verified: false,
        badge: 'Phổ biến',
    },
    {
        id: 4,
        name: 'PetCare Bình Thạnh',
        address: '234 Bạch Đằng, Quận Bình Thạnh, TP.HCM',
        rating: 4.5,
        reviewCount: 60,
        isOpen: true,
        hours: '08:00 - 19:00',
        distance: '4.5 km',
        price: 'Từ 100.000đ',
        tags: ['Khám bệnh', 'Tiêm phòng', 'Phẫu thuật'],
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
        verified: true,
        badge: null,
    },
    {
        id: 5,
        name: 'Khách Sạn Thú Cưng Luxury',
        address: '90 Lê Văn Sỹ, Quận 3, TP.HCM',
        rating: 4.7,
        reviewCount: 95,
        isOpen: true,
        hours: '24/7',
        distance: '2.0 km',
        price: 'Từ 200.000đ/ngày',
        tags: ['Lưu trú', 'Camera live', 'Chăm sóc 24/7'],
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
        verified: true,
        badge: 'Mới',
    },
    {
        id: 6,
        name: 'Phòng Khám Thú Y Tân Bình',
        address: '56 Hoàng Văn Thụ, Quận Tân Bình, TP.HCM',
        rating: 4.4,
        reviewCount: 42,
        isOpen: false,
        hours: '08:30 - 18:30',
        distance: '5.8 km',
        price: 'Từ 120.000đ',
        tags: ['Khám tổng quát', 'Xét nghiệm'],
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
        verified: false,
        badge: null,
    },
];

export const clinicService = {
  getAll: async (): Promise<Clinic[]> => {
    // Simulating for now
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_CLINICS;
  },

  getById: async (id: number): Promise<Clinic> => {
    // Fallback to mock if API fails or for demo
    const mock = MOCK_CLINICS.find(c => c.id === id);
    if (mock) return mock;
    
    const response = await apiClient.get<Clinic>(`/clinics/${id}`);
    return response.data;
  },
};
