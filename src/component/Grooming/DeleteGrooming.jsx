import { useDeleteGrooming } from '../../hooks/grooming/useAdminGrooming';
import styles from '../../assets/styles/modal.module.css';
const DeleteGroomingButton = ({ id}) => {
  const deleteGroomingMutation = useDeleteGrooming();

  console.log("Pet id frm delete btn", id)
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this grooming service?")) {
        deleteGroomingMutation.mutate(id);
    }
  };

  return <button className={styles.updateTreatmentBtn}onClick={handleDelete}>Delete</button>;
};

export default DeleteGroomingButton; 