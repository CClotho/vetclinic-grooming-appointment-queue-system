
import { useDeletePet } from '../../hooks/pet/useAdminPets';

const DeletePetButton = ({ petId}) => {
  const deletePetMutation = useDeletePet();

  console.log("Pet id frm delete btn", petId)
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      deletePetMutation.mutate(petId);
    }
  };

  return <button onClick={handleDelete}>Delete Pet</button>;
};

export default DeletePetButton; // You can integrate this button into any component where you want to provide the option to delete a pet, such as in a pet details page or within a list of pets.