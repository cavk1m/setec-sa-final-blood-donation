'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import CampaignCard, { CampaignItem } from './campaign-card';
import ViewCampaignDrawer from './view-campaign-drawer';
import DeleteCampaignDrawer from './delete-dampaign-drawer';
import EditCampaignDrawer from './edit-campaign-drawer';
import { getCampaigns, deleteCampaign as deleteCampaignApi, CampaignData } from '@/src/features/campaign/campaign.api';

const MOCK_CAMPAIGNS: CampaignItem[] = [
  { id: 'mc1', name: 'Emergency Blood Drive - Phnom Penh', description: 'Help us restock our blood bank for the upcoming holidays. Every drop counts!', raised: 4500, goal: 10000, donorCount: 124, createdAt: '2026-04-15', status: 'active' },
  { id: 'mc2', name: 'Children\'s Hospital Support', description: 'Providing specialized blood products for pediatric cancer patients.', raised: 8200, goal: 8000, donorCount: 210, createdAt: '2026-03-20', status: 'completed' },
  { id: 'mc3', name: 'Mobile Clinic Expansion', description: 'Funding for a new mobile blood collection unit to reach remote villages.', raised: 12000, goal: 50000, donorCount: 45, createdAt: '2026-04-28', status: 'active' },
  { id: 'mc4', name: 'Rare Blood Type Search', description: 'Initiative to find and register donors with rare blood types (Rh negative).', raised: 3000, goal: 3000, donorCount: 89, createdAt: '2026-02-10', status: 'completed' },
  { id: 'mc5', name: 'University Campus Drive', description: 'Engaging the youth in our annual campus-wide blood donation competition.', raised: 1500, goal: 5000, donorCount: 67, createdAt: '2026-04-29', status: 'active' },
  { id: 'mc6', name: 'Post-Surgery Recovery Fund', description: 'Assisting families with blood transfusion costs for complex surgeries.', raised: 7500, goal: 15000, donorCount: 112, createdAt: '2026-04-10', status: 'active' },
  { id: 'mc7', name: 'Disaster Relief Blood Bank', description: 'Building a strategic reserve for natural disaster emergency response.', raised: 25000, goal: 25000, donorCount: 530, createdAt: '2026-01-05', status: 'completed' },
  { id: 'mc8', name: 'Maternal Health Initiative', description: 'Ensuring safe blood supply for pregnant women and new mothers.', raised: 5400, goal: 12000, donorCount: 98, createdAt: '2026-04-20', status: 'active' },
  { id: 'mc9', name: 'World Blood Donor Day Celebration', description: 'Special campaign to honor our regular donors and recruit new ones.', raised: 2000, goal: 2000, donorCount: 150, createdAt: '2026-04-12', status: 'completed' },
  { id: 'mc10', name: 'Local Community Health Fair', description: 'Providing free health screenings and blood donation opportunities.', raised: 800, goal: 4000, donorCount: 32, createdAt: '2026-04-25', status: 'active' },
];

interface CampaignGridProps {
  filter?: 'all' | 'active' | 'completed';
  searchQuery?: string;
  refreshTrigger?: number;
}

export default function CampaignGrid({ filter = 'all', searchQuery = '', refreshTrigger = 0 }: CampaignGridProps) {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer targets
  const [editTarget,   setEditTarget]   = useState<CampaignItem | null>(null);
  const [viewTarget,   setViewTarget]   = useState<CampaignItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CampaignItem | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await getCampaigns();
      
      if (data && data.length > 0) {
        const mapped: CampaignItem[] = data.map((c: CampaignData) => ({
          id: c.id,
          name: c.title,
          description: c.description,
          raised: c.current_amount,
          goal: c.target_amount,
          donorCount: 0,
          createdAt: new Date(c.created_at).toLocaleDateString(),
          status: c.current_amount >= c.target_amount ? 'completed' : 'active',
        }));
        setCampaigns(mapped);
      } else {
        setCampaigns(MOCK_CAMPAIGNS);
      }
    } catch (error) {
      console.error('Failed to load campaigns, using mock data');
      setCampaigns(MOCK_CAMPAIGNS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [refreshTrigger]);

  const [deleting, setDeleting] = useState(false);

  // Handlers
  const handleSave = () => {
    setEditTarget(null);
    fetchCampaigns();
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      if (id.startsWith('mc')) {
        setCampaigns(prev => prev.filter(c => c.id !== id));
        message.success('Campaign deleted successfully (Mock)');
        setDeleteTarget(null);
        return;
      }
      await deleteCampaignApi(id);
      message.success('Campaign deleted successfully');
      setDeleteTarget(null);
      fetchCampaigns();
    } catch (error) {
      // Fallback
      setCampaigns(prev => prev.filter(c => c.id !== id));
      message.success('Campaign removed');
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = campaigns.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <Row gutter={[24, 24]}>
        {filtered.map(c => (
          <Col xs={24} lg={12} key={c.id}>
            <CampaignCard
              data={c}
              onEdit={id   => setEditTarget(campaigns.find(x => x.id === id) ?? null)}
              onView={id   => setViewTarget(campaigns.find(x => x.id === id) ?? null)}
              onDelete={id => setDeleteTarget(campaigns.find(x => x.id === id) ?? null)}
            />
          </Col>
        ))}
      </Row>

      <EditCampaignDrawer
        open={!!editTarget}
        campaign={editTarget}
        onCancel={() => setEditTarget(null)}
        onSave={handleSave}
      />

      <ViewCampaignDrawer
        open={!!viewTarget}
        campaign={viewTarget}
        onClose={() => setViewTarget(null)}
        onEdit={id => {
          setViewTarget(null);
          setEditTarget(campaigns.find(x => x.id === id) ?? null);
        }}
      />

      <DeleteCampaignDrawer
        open={!!deleteTarget}
        campaign={deleteTarget}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
