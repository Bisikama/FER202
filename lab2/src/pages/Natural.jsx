import React from 'react';
import { ListOfOrchids } from '../assets/share/ListOfOrchids';
import OrchidItem from '../assets/combonents/OrchidItem';
import { useModal } from '../hooks/useModal';
import OrchidModal from '../components/OrchidModal';

export default function Natural() {
  const natural = ListOfOrchids.filter(o => o.isNatural);
  const { isModalOpen, selectedOrchid, openModal, closeModal } = useModal();

  return (
    <>
      <div className="container-fluid px-4 mt-4" >
        <h2 className="text-center mb-4">🌿 Natural Orchids</h2>
        <div className="row justify-content-center g-4">
          {natural.map((orchid) => (
            <div key={orchid.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
              <OrchidItem orchid={orchid} onShowDetail={openModal} />
            </div>
          ))}
        </div>
      </div>

      <OrchidModal 
        orchid={selectedOrchid}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
