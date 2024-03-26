import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from "../../layout/BaseLayout";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherpublicationparpage?page=${page}&taille=20`)
      .then(response => {
        setIsLoading(false);
        setPublications(response.data.donnee.publications);
      })
      .catch(error => {
        console.error('Error fetching publications:', error);
        setIsLoading(false);
      });
  }, [page]);

  const handleDeletePublication = async (id) => {
    try {
      await axios.delete(`http://185.98.139.246:9090/ogatemanagement-api/admin/supprimerpublication/${id}`);
      axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherpublicationparpage?page=${page}&taille=20`)
      setPage(0);
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  const handlePublicationClick = async (id) => {
    try {
      const response = await axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherdetailpublication/${id}`);
      setSelectedPublication(response.data.donnee);
    } catch (error) {
      console.error('Error fetching publication details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPublication(null);
  };

  return (
    <BaseLayout>
      <div className="overflow-y-scroll h-screen-3/4 px-3">
        <h1 className="text-3xl font-bold mb-4 py-8 px-3">Publications</h1>
        {isLoading ? (
          <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            {/* Placeholder de chargement */}
          </div>
        ) : (
          <div className="card-container">
            {publications.map((publication, index) => (
              <div key={index} className="card" onClick={() => handlePublicationClick(publication.id)}>
                <button onClick={(e) => {e.stopPropagation(); handleDeletePublication(publication.id)}} className="absolute top-2 right-2 focus:outline-none text-gray-500 hover:text-red-500">
                  <FontAwesomeIcon icon={faTrash} className="h-6 w-6" />
                </button>
                <div className="card-content">
                  <p className="font-bold"> Prix: {publication.prix}</p>
                  <p className="font-bold">Localisation: {publication.localisation}</p>
                  <p className="text-sm"> {publication.datePublication}</p>
                </div>
                <div className={`flex ${publication.fichiers.filter(fichier => fichier.typeFichier === "IMAGE").length > 1 ? 'overflow-x-auto' : ''}`}>
                  {publication.fichiers.map((fichier, fileIndex) => (
                    <div key={fileIndex} className={`flex-shrink-0 mr-4`}>
                      {fichier.typeFichier === "IMAGE" && (
                        <img
                          src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${fichier.id}`}
                          alt={fichier.nom}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      {fichier.typeFichier === "VIDEO" && (
                        <video className="w-32 h-32 object-cover rounded-lg" controls>
                          <source src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${fichier.id}`} type="video/mp4" />
                          Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                      )}
                      {fichier.typeFichier === "DOCUMENT" && (
                        <div className="p-4">
                          <a href={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${fichier.id}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline ">{fichier.nom}</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedPublication && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-3/4"> {/* Réduction de la taille de la modal */}
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none">
              <FontAwesomeIcon icon={faCircleXmark} className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Détails de la publication</h2>
            <p>Nombre de pièces : {selectedPublication.nombrePieces}</p>
            <p>Type de requête : {selectedPublication.typeRequete}</p>
            <p>Nombre de salons : {selectedPublication.nombreSalon}</p>
            <p>Nombre de likes : {selectedPublication.nombrelike}</p>
            <p>Localisation : {selectedPublication.localisation}</p>
            <p>Date de publication : {selectedPublication.datePublication}</p>
            <p>Description : {selectedPublication.description}</p>
            <p>Nombre de favoris : {selectedPublication.nombrefavoris}</p>
            <div className="flex flex-wrap mt-4">
              {selectedPublication.fichiers.map((fichier, index) => (
                <img
                  key={index}
                  src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${fichier.id}`}
                  alt={fichier.nom}
                  className="w-32 h-32 object-cover rounded-lg mr-4 mb-4"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default Publications;
