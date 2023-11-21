
import { useState, useEffect } from "react";
import { useGetProfile } from "../../hooks/profile/useClientProfile";
import styles from '../../assets/styles/style.module.css'; // Import CSS module

export const UserProfile = () => {
 
  const [selectedPet, setSelectedPet] = useState(null);
  const { data: profile, isLoading, isError } = useGetProfile();

  useEffect(() => {
    console.log(profile)
    if (profile?.pets) {
      console.log('Pets:', profile.pets); // This will log the pets array to the console
    }
  }, [profile]); // Add profile to the dependency array to run the effect when profile changes
  

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    
    return <div className={styles.error}>Error loading the client profile.</div>;
  }

  if (!profile) {
    return <div className={styles.notFound}>Client not found.</div>;
  }

  const handlePetClick = (pet) => {
    if (selectedPet && selectedPet._id === pet._id) {
      setSelectedPet(null);
    } else {
      setSelectedPet(pet);
    }
  };

  return (
    <div className={styles.clientProfile}>
      <h2>{profile?.first_name} {profile?.last_name}</h2>
      <p><strong>Email:</strong> {profile?.email}</p>
      <p><strong>Phone:</strong> {profile?.phone_number}</p>
      <p><strong>Age:</strong> {profile?.age}</p>
      <p><strong>Member Since:</strong> {new Date(profile?.createdAt).toLocaleDateString()}</p>
      {profile?.pets && profile.pets.length > 0 && (
        <div className={styles.clientPets}>
          <h3>Pets ({profile.pets.length})</h3>
          <ul className={styles.petList}>
            {profile.pets?.map(pet => (
              <li key={pet._id} 
                  className={`${styles.petLink} ${selectedPet && selectedPet._id === pet._id ? styles.active : ''}`} 
                  onClick={() => handlePetClick(pet)}>
                {pet.pet_name}
              </li>
            ))}
        </ul>
          {selectedPet && (
            <div className={styles.selectedPetDetails}>
              <h4>{selectedPet?.pet_name}</h4>
              <p><strong>Breed:</strong> {selectedPet?.breed}</p>
              <p><strong>Gender:</strong> {selectedPet?.gender}</p>
              {/* Add more details if needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
