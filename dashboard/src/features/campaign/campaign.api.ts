import { axiosInstance } from '@/src/lib/axios';

export interface CampaignData {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  image_url: string;
  campaign_type: string;
  progress_percent: number;
  created_at: string;
}

export const getCampaigns = async (): Promise<CampaignData[]> => {
  try {
    const response = await axiosInstance.get('/api/campaigns');
    return response.data.campaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const createCampaign = async (data: Partial<CampaignData>) => {
  try {
    const response = await axiosInstance.post('/api/campaigns', data);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, data: Partial<CampaignData>) => {
  try {
    const response = await axiosInstance.put(`/api/campaigns/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};
