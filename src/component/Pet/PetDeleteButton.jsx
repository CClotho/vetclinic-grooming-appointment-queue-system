import { useDeletePet } from '../../hooks/usePets';

const DeletePetButton = ({ petId, onSuccess, onError }) => {
  const deletePetMutation = useDeletePet();

  const handleDelete = () => {
    deletePetMutation.mutate(petId, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
      onError: (error) => {
        if (onError) onError(error);
      }
    });
  };

  return <button onClick={handleDelete}>Delete Pet</button>;
};

export default DeletePetButton; // You can integrate this button into any component where you want to provide the option to delete a pet, such as in a pet details page or within a list of pets.