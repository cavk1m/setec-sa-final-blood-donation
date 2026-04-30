'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import CampaignCard, { CampaignItem } from './campaign-card';
import ViewCampaignDrawer from './view-campaign-drawer';
import DeleteCampaignDrawer from './delete-dampaign-drawer';
import EditCampaignDrawer from './edit-campaign-drawer';
import { getCampaigns, deleteCampaign as deleteCampaignApi, CampaignData } from '@/src/features/campaign/campaign.api';

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
      
      const mapped: CampaignItem[] = data.map((c: CampaignData) => ({
        id: c.id,
        name: c.title,
        description: c.description,
        raised: c.current_amount,
        goal: c.target_amount,
        donorCount: 0, // Not available in simple backend model yet
        createdAt: new Date(c.created_at).toLocaleDateString(),
        status: c.current_amount >= c.target_amount ? 'completed' : 'active',
      }));
      
      setCampaigns(mapped);
    } catch (error) {
      message.error('Failed to load campaigns');
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
      await deleteCampaignApi(id);
      message.success('Campaign deleted successfully');
      setDeleteTarget(null);
      fetchCampaigns();
    } catch (error) {
      message.error('Failed to delete campaign');
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
