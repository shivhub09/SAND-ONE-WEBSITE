import React, { useState } from 'react';
import './AdminLandingPage.css';
import AdminOverViewPage from '../AdminOverViewPage/AdminOverViewPage';
import AdminViewClientsPage from '../AdminViewClientsPage/AdminViewClientsPage';
import AdminProfilePage from '../AdminProfilePage/AdminProfilePage';
import AdminViewCampaignsPage from '../AdminViewCampaignsPage/AdminViewCampaignsPage';
import AdminCreateNewClient from '../AdminCreateNewClient/AdminCreateNewClient';
import AdminCreateNewCampaign from '../AdminCreateNewCampaign/AdminCreateNewCampaign';
import AdminCampaignDetailsPage from '../AdminCampaignDetailsPage/AdminCampaignDetailsPage';
import AdminFormDetails from '../AdminFormDetails/AdminFormDetails';

const AdminLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeClient, setActiveClient] = useState('');

  // Extract the part of activeTab other than 'client-detail'
  const tabName = activeTab.startsWith('client-detail') ? activeTab.substring('client-detail'.length + 1) : activeTab;
  const tabName2 = activeTab.startsWith('createNewCampaign') ? activeTab.substring('createNewCampaign'.length + 1) : activeTab;
  const tabName3 = activeTab.startsWith('campaignDetailsPage') ? activeTab.substring('campaignDetailsPage'.length + 1) : activeTab;
  const tabName4 = activeTab.startsWith('view-form-details') ? activeTab.substring('view-form-details'.length + 1) : activeTab;

  return (
    <div className='LandingPage-container'>
      <div className='sidebar'>
        <div className="navbar">
          <img src="https://sandnetwork.in/wp-content/uploads/2024/02/sand-logo.png" alt="" />
          <a onClick={() => setActiveTab('overview')}>Overview</a>
          <a onClick={() => setActiveTab('newClient')}>New Client</a>
          <a onClick={() => setActiveTab('viewClients')}>View Clients</a>
          <a onClick={() => setActiveTab('profile')}>Profile</a>
          <input type="button" value="Logout" />
        </div>
      </div>
      <div className='content'>
        {activeTab === 'overview' && <AdminOverViewPage />}
        {activeTab === 'newClient' && <AdminCreateNewClient />}
        {activeTab === 'viewClients' && (
          <AdminViewClientsPage setActiveTab={setActiveTab} setActiveClient={setActiveClient} />
        )}
        {activeTab === 'profile' && <AdminProfilePage />}
        {activeTab.startsWith('client-detail') && (
          <AdminViewCampaignsPage clientId={tabName} setActiveTab={setActiveTab} />
        )}
        {activeTab.startsWith('createNewCampaign') && (
          <AdminCreateNewCampaign clientId={tabName2} setActiveTab={setActiveTab} />
        )}

        {/* working */}
        {activeTab.startsWith('campaignDetailsPage') && (
          <AdminCampaignDetailsPage campaignId={tabName3} setActiveTab={setActiveTab} />
        )}

        {activeTab.startsWith('view-form-details') && (
          <AdminFormDetails campaignId={tabName4}></AdminFormDetails>
        )}




      </div>
    </div>
  );
};

export default AdminLandingPage;
