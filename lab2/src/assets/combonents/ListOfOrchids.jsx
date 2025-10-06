import React from 'react'
import { ListOfOrchids } from '../share/ListOfOrchids';
import OrchidItem from './OrchidItem';
import OrchidModal from '../../components/OrchidModal';
import { useModal } from '../../hooks/useModal';

export default function OrchidsFlowerList() {
  const { isModalOpen, selectedOrchid, openModal, closeModal } = useModal();

  return (
    <>
      <div className="container-fluid px-4 mt-4" >
        <h2 className="text-center mb-4 d-flex justify-content-center">🌸 List of Orchids</h2>
        <div className="row justify-content-center g-4">
          {ListOfOrchids.map((orchid) => (
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
