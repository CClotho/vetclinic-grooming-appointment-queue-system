import { Outlet, Link } from "react-router-dom"
import { useFetchClientsInfo } from "../../hooks/clients/useAdminClients";
import styles from '../../assets/styles/style.module.css';

export const AdminClientsPage = () => {
    const { data: clients, isLoading: isLoadingClient } = useFetchClientsInfo();
  
    console.log(clients)
    if (isLoadingClient) {
      return <div>Loading clients...</div>;
    }
  
    return (
      <div className={styles.adminClientsContainer}>
        <div className={styles.clientList}>
          <h1>Client List</h1>
          {/* Client list goes here */}
         
          <div className={styles.clientLink}>
          {clients?.map(client => (
              <div key={client._id}>
                <Link to={`/clients/${client._id}`}>{client.first_name} {client.last_name}</Link>
              </div>
            ))}
          </div>
          <Link to="/register" className={styles.addClientLink}>Add New Client</Link>
        </div>
  
        <div className={styles.clientProfileContainer}>
          <Outlet /> {/* This will render the selected client's profile */}
        </div>
      </div>
    );
  }
  

