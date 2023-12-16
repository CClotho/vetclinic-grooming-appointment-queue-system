import { useDeleteTreatment } from '../../hooks/treatment/useTreatment';
import styles from '../../assets/styles/modal.module.css';
const DeleteTreatmentButton = ({ id, onDeleteSuccess}) => {
  const deleteTreatmentMutation = useDeleteTreatment();

  console.log("Pet id frm delete btn", id)
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
        deleteTreatmentMutation.mutate(id);
        onDeleteSuccess();
    }
  };

  return <button className={styles.updateTreatmentBtn} onClick={handleDelete}>Delete</button>;
};

export default DeleteTreatmentButton; // You can integrate this button into any component where you want to provide the option to delete a pet, such as in a pet details page or within a list of pets.