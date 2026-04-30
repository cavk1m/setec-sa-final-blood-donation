import { axiosInstance } from '@/src/lib/axios';

export interface LocationData {
  id: string;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  donation_type: string;
  payment_qr_url: string | null;
}

export const getLocations = async (): Promise<LocationData[]> => {
  try {
    const response = await axiosInstance.get('/api/locations');
    return response.data.locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const createLocation = async (data: Partial<LocationData>) => {
  try {
    const response = await axiosInstance.post('/api/locations', data);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

export const updateLocation = async (id: string, data: Partial<LocationData>) => {
  try {
    const response = await axiosInstance.put(`/api/locations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating location:', error);
    throw error;
  }
};

export const deleteLocation = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/locations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
};
