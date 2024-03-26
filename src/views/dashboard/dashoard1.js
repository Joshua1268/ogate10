import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import des icônes de Feather Icons
import { IconActivity, IconBook, IconCheckCircle, IconUsers } from 'react-feather';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherstatistiques'); // Endpoint pour les données du tableau de bord
      setDashboardData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du tableau de bord :', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
      </header>
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData && (
          <>
            <DashboardCard icon={<IconActivity />} title="Nombre de Publications Indisponible" value={dashboardData.nombrePublicationIndisponibilite} />
            <DashboardCard icon={<IconBook />} title="Nombre de Publications" value={dashboardData.nombrePublications} />
            <DashboardCard icon={<IconCheckCircle />} title="Nombre de Publications Disponible" value={dashboardData.nombrePublicationsDisponibilite} />
            <DashboardCard icon={<IconUsers />} title="Nombre de Clients" value={dashboardData.nombreClient} />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl text-gray-800">{value}</p>
    </div>
  );
};

export default Dashboard;
