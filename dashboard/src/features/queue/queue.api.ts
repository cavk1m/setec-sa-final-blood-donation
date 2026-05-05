import { axiosInstance } from '@/src/lib/axios';
import { QueueEntry } from '@/src/types/dashboard';

export const getQueue = async (): Promise<QueueEntry[]> => {
  try {
    const response = await axiosInstance.get('/api/dashboard/queue');
    return response.data.queue;
  } catch (error) {
    console.error('Error fetching queue:', error);
    throw error;
  }
};

export const completeQueue = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/api/dashboard/queue/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error('Error completing queue:', error);
    throw error;
  }
};

export const skipQueue = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/api/dashboard/queue/${id}/skip`);
    return response.data;
  } catch (error) {
    console.error('Error skipping queue:', error);
    throw error;
  }
};
