// Import the API function

import { useFetchClientPendingAppointments} from '../../hooks/appointment/useClientAppointment';
import styles from '../../assets/styles/pending.module.css'; // Import CSS module
import { useAuth } from '../../hooks/AuthContext';


const ClientPending = () => {
    

    const {data: pendingClientAppointments} = useFetchClientPendingAppointments();
    const {user} = useAuth();
    


    const handleUpdateStatus = (appointmentId, newStatus) => {
        console.log({appointmentId, newStatus})
      mutate( {appointmentId, newStatus });
    };

    const renderServiceDetails = (service, serviceType) => {
        if (serviceType === 'grooming') {
            const chosenSizeDetail = service.chosenSize;
            const serviceDetails = service.serviceId; // Assuming this is an object with service details
            
            return chosenSizeDetail ? (
                <div>
                    <p>Service Name: {serviceDetails?.name}</p>
                    <p>Size: {chosenSizeDetail?.size}</p>
                    <p>Price: {chosenSizeDetail?.price}</p>
                    <p>Details: {chosenSizeDetail?.description}</p>
                </div>
            ) : <p>Size not specified</p>;
        } else if (serviceType === 'treatment') {
            const serviceDetails = service.serviceId; // Assuming this is an object with service details
            return (
                <div>
                    <p>Appointment: {serviceDetails?.name}</p>
                    <p>Price: {serviceDetails?.price}</p>
                    <p>Description: {serviceDetails?.description}</p>
                </div>
            );
        }
    };
    
    
    

    const renderServices = (services, serviceType, appointmentId) => {
        if (Array.isArray(services)) {
            return services.map((service, index) => {
                // Using a combination of appointmentId and service unique identifier
                const serviceKey = service._id ? `${appointmentId}-${service._id}` : `${appointmentId}-missing-${index}`;
    
                return (
                    <li key={serviceKey}>
                        {service?.name}
                        {renderServiceDetails(service, serviceType)}
                    </li>
                );
            });
        }
       
        return null;
    };

   

    

    return (
        <div>
            <h1>Pending Appointments</h1>
            {pendingClientAppointments?.length > 0 ? (
                pendingClientAppointments.map(appointment => (
                    <div key={appointment._id} className={styles.appointmentCard}>
                       <div className={styles.appointmentHeader}>
                        <p>Appointment ID: {appointment._id}</p>
                            <p>Client: {appointment.client?.first_name} {appointment.client?.last_name} </p>
                            <p>Pet: {appointment.pet?.pet_name}  </p>
                            <p>Service Type: {appointment.service_type}</p>
                            <p>Services:</p>
                            <div className={styles.serviceList}>
                                <ul>
                                    {renderServices(appointment.services, appointment.service_type, appointment._id)}
                                </ul>
                            </div>
                          
                        </div>
                    </div>
                ))
            ) : (
                <p>No pending appointments</p>
            )}
        </div>
    );
};

export default ClientPending;
