import { useDeleteClient } from '../../hooks/clients/useAdminClients';
import { useNavigate } from "react-router-dom";
import styles from '../../assets/styles/modal.module.css';
const DeleteClientButton = ({ id}) => {
  const deleteClientMutation = useDeleteClient()
  const navigate =useNavigate();
  console.log("Pet id frm delete btn", id)
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
        deleteClientMutation.mutate(id);
        navigate("/clients/")
    }
  };

  return <button className={styles.updateTreatmentBtn}onClick={handleDelete}>Delete Client</button>;
};

export default DeleteClientButton; 