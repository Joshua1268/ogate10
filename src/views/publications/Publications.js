import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from "../../layout/BaseLayout";

const Publications = () => {
  const [publications, setPublications] = useState([]);
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

  return (
    <BaseLayout>
      <div className="overflow-y-scroll h-screen-3/4 px-3">
        <h1 className="text-3xl font-bold mb-4 py-8 px-3">Publications</h1>
        {isLoading ? (
          
<div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-300">
        <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>


        ) : (
          <div className="card-container">
            {publications.map((publication, index) => (
              <div key={index} className="card">
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
                          className="w-64 h-64 object-cover rounded-lg"
                        />
                      )}
                      {fichier.typeFichier === "VIDEO" && (
                        <video className="w-64 h-64 object-cover rounded-lg" controls>
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
    </BaseLayout>
  );
};

export default Publications;
