import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from 'axios';
import BaseLayout from "../../layout/BaseLayout";

const Dashboard = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [nombrePublicationIndisponibilite, setNombrePublicationIndisponibilite] = useState("");
  const [nombrePublications, setNombrePublications] = useState("");
  const [nombrePublicationsDisponibilite, setNombrePublicationsDisponibilite] = useState("");
  const [nombreClient, setNombreClient] = useState("");

  useEffect(() => {
    setLoadingData(true);
    axios.get('http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherstatistiques')
      .then((response) => {
        setLoadingData(false);
        const data = response.data.donnee;
        setNombrePublicationIndisponibilite(data.nombrePublicationIndisponibilite);
        setNombrePublications(data.nombrePublications);
        setNombrePublicationsDisponibilite(data.nombrePublicationsDisponibilite);
        setNombreClient(data.nombreClient);
      })
      .catch((error) => {
        setLoadingData(false);
        console.error("Erreur lors de la récupération des statistiques :", error);
      });
  }, []);

  return (
    <BaseLayout>
      <div className="w-full py-8 px-5">
        <h1 className="text-3xl text-black font-bold">Tableau de bord</h1>
        <div className="w-full mt-7">
          {/* STATISTIQUES */}
          <div className="w-full grid grid-cols-2 gap-3 mt-5">
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <ThreeDots height="30" width="30" color="#000" />
                  ) : (
                    nombrePublicationIndisponibilite
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">Nombre de Publications Indisponibilité</p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <ThreeDots height="30" width="30" color="#000" />
                  ) : (
                    nombrePublications
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">Nombre de Publications</p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <ThreeDots height="30" width="30" color="#000" />
                  ) : (
                    nombrePublicationsDisponibilite
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">Nombre de Publications Disponibilité</p>
            </div>
            <div className="w-full h-fit rounded-lg bg-white drop-shadow-sm px-5 py-3">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-xl text-black font-semibold">
                  {loadingData ? (
                    <ThreeDots height="30" width="30" color="#000" />
                  ) : (
                    nombreClient
                  )}
                </span>
              </div>
              <p className="text-lg text-gray-400 font-normal">Nombre de Clients</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
