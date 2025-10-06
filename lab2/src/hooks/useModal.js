import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const openModal = (orchid) => {
    setSelectedOrchid(orchid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrchid(null);
  };

  return {
    isModalOpen,
    selectedOrchid,
    openModal,
    closeModal
  };
};