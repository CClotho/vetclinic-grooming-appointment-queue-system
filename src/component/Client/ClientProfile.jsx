import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetClientById } from "../../hooks/clients/useAdminClients";
import styles from '../../assets/styles/style.module.css'; // Import CSS module
import DeletePetButton from "../Pet/PetDeleteButton";
import EditPetForm from "../Pet/EditPetForm";

export const ClientProfile = () => {
  const { clientId } = useParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const { data: client, isLoading, isError, error } = useGetClientById(clientId);
  const [isEditingPet, setIsEditingPet] = useState(false);

 

  useEffect(() => {
    // Reset selectedPet when clientId changes
    setSelectedPet(null);
    setIsEditingPet(false); 
  }, [clientId]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    console.error('Error fetching client details:', error);
    return <div className={styles.error}>Error loading the client profile.</div>;
  }

  if (!client) {
    return <div className={styles.notFound}>Client not found.</div>;
  }

  const handlePetClick = (pet) => {
    if (selectedPet && selectedPet._id === pet._id) {
      setSelectedPet(null);
    } else {
      setSelectedPet(pet);
    }

    setIsEditingPet(false);
  };

  return (
    <div className={styles.clientProfile}>
      <h2>{client.first_name} {client.last_name}</h2>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Phone:</strong> {client.phone_number}</p>
      <p><strong>Age:</strong> {client.age}</p>
      <p><strong>Member Since:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
      {client.pets && client.pets.length > 0 && (
        <div className={styles.clientPets}>
          <h3>Pets ({client.pets.length})</h3>
          <ul className={styles.petList}>
            {client.pets.map(pet => (
              <li key={pet._id} 
                  className={`${styles.petLink} ${selectedPet && selectedPet._id === pet._id ? styles.active : ''}`} 
                  onClick={() => handlePetClick(pet)}>
                {pet.pet_name}
              </li>
            ))}
        </ul>
          {selectedPet && (
            <>
            {isEditingPet ? (
                // Edit Pet Form
                <EditPetForm pet={selectedPet} clientId={clientId} onClose={handlePetClick} />
              ) : (
              
                <div className={styles.selectedPetDetails}>
                  <h4>{selectedPet.pet_name}</h4>
                  <p><strong>Type:</strong> {selectedPet.type}</p>
                  <p><strong>Breed:</strong> {selectedPet.breed}</p>
                  <p><strong>Gender:</strong> {selectedPet.gender}</p>
                  
             
                  <div className={styles.petActions}>
                    <button onClick={() => setIsEditingPet(true)}>Edit Pet</button>
                  </div>
                </div>
              )}
          </> 
          )}
        </div>
      )}
    </div>
  );
};
