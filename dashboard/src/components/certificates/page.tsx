'use client';

import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import CertificateStatsBar from './certificate-statsBar';
import CertificateTable, { CertificateEntry } from './certificate-table';
import { getDashboardCertificates } from '@/src/features/certificate/certificate.api';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<CertificateEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const data = await getDashboardCertificates();
        
        const mapped: CertificateEntry[] = data.map(cert => ({
          id: cert.id,
          certificateNumber: cert.certificate_number,
          donorName: cert.user?.full_name || 'N/A',
          bloodType: cert.user?.blood_type || 'N/A',
          donationDate: new Date(cert.issued_date).toLocaleDateString(),
          locationName: cert.location_name,
          issuedDate: new Date(cert.issued_date).toLocaleDateString(),
        }));
        
        setCertificates(mapped);
      } catch (error) {
        message.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <SideNavBar activeKey="certificates" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={1} style={{ margin: 0, fontWeight: 800, fontSize: 36, letterSpacing: '-0.04em', color: '#0f172a' }}>
              Donation Certificates
            </Title>
            <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 16, fontWeight: 500 }}>
              Validate and issue official donation documentation for clinical compliance.
            </Text>
          </div>

          <CertificateStatsBar 
            onSearch={setSearchQuery} 
            totalIssued={certificates.length}
            topLocation={
              certificates.length > 0 
                ? Object.entries(
                    certificates.reduce((acc, curr) => {
                      acc[curr.locationName] = (acc[curr.locationName] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0][0]
                : "N/A"
            }
            topLocationCount={
              certificates.length > 0 
                ? Object.entries(
                    certificates.reduce((acc, curr) => {
                      acc[curr.locationName] = (acc[curr.locationName] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0][1]
                : 0
            }
          />
          <CertificateTable data={certificates} loading={loading} searchQuery={searchQuery} />
        </Content>
      </Layout>
    </Layout>
  );
}

