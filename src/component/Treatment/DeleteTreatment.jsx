import { useDeleteTreatment } from '../../hooks/treatment/useTreatment';

const DeleteTreatmentButton = ({ id}) => {
  const deleteTreatmentMutation = useDeleteTreatment();

  console.log("Pet id frm delete btn", id)
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
        deleteTreatmentMutation.mutate(id);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTreatmentButton; // You can integrate this button into any component where you want to provide the option to delete a pet, such as in a pet details page or within a list of pets.