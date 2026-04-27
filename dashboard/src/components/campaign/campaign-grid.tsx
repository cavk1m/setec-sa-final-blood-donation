'use client';

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CampaignCard, { CampaignItem } from './campaign-card';
import ViewCampaignDrawer from './view-campaign-drawer';
import DeleteCampaignDrawer from './delete-dampaign-drawer';
import EditCampaignDrawer from './edit-campaign-drawer';


const MOCK_CAMPAIGNS: CampaignItem[] = [
  {
    id: '1',
    name: 'Emergency O-Negative Drive',
    description: 'Urgent mobilization for regional hospitals facing critical blood shortages. High priority for trauma centers.',
    raised: 12600, goal: 15000,
    donorCount: 142,
    createdAt: 'Oct 12, 2023',
    status: 'active',
  },
  {
    id: '2',
    name: 'Spring Community Health Fair',
    description: 'Annual partnership with City Hall. Focus on general wellness and voluntary blood screening.',
    raised: 3200, goal: 10000,
    donorCount: 48,
    createdAt: 'Nov 01, 2023',
    status: 'active',
  },
  {
    id: '3',
    name: 'Winter Holiday Reserve',
    description: 'Building surplus reserves for the holiday season when donation rates typically decrease by 40%.',
    raised: 18200, goal: 20000,
    donorCount: 210,
    createdAt: 'Dec 05, 2023',
    status: 'active',
  },
  {
    id: '4',
    name: 'Mobile Unit Fundraising',
    description: 'Completed campaign for a new mobile blood collection unit servicing rural counties.',
    raised: 20000, goal: 20000,
    donorCount: 560,
    createdAt: 'Jan 15, 2024',
    status: 'completed',
  },
];

interface CampaignGridProps {
  filter?: 'all' | 'active' | 'completed';
  searchQuery?: string;
}

export default function CampaignGrid({ filter = 'all', searchQuery = '' }: CampaignGridProps) {
  const [campaigns, setCampaigns]       = useState<CampaignItem[]>(MOCK_CAMPAIGNS);

  // Drawer targets
  const [editTarget,   setEditTarget]   = useState<CampaignItem | null>(null);
  const [viewTarget,   setViewTarget]   = useState<CampaignItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CampaignItem | null>(null);

  // Handlers
  const handleSave = (updated: CampaignItem) => {
    setCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setDeleteTarget(null);
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
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
