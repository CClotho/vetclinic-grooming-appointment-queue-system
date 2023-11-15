// Import the API function
import { useFetchPendingAppointments, useUpdateStatusMutation } from '../../hooks/appointment/useAdminAppointment';



const PendingAppointmentsPage = () => {
    
    const { data: pendingAppointments } = useFetchPendingAppointments();
    console.log(pendingAppointments)
       // Mutation for updating the appointment status
       const { mutate } = useUpdateStatusMutation();

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
                    <p>Service Name: {serviceDetails.name}</p>
                    <p>Size: {chosenSizeDetail.size}</p>
                    <p>Price: {chosenSizeDetail.price}</p>
                    <p>Details: {chosenSizeDetail.description}</p>
                </div>
            ) : <p>Size not specified</p>;
        } else if (serviceType === 'treatment') {
            const serviceDetails = service.serviceId; // Assuming this is an object with service details
            return (
                <div>
                    <p>Appointment: {serviceDetails.name}</p>
                    <p>Price: {serviceDetails.price}</p>
                    <p>Description: {serviceDetails.description}</p>
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
                        {service.name}
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
            {pendingAppointments?.length > 0 ? (
                pendingAppointments.map(appointment => (
                    <div key={appointment._id}>
                        <p>Appointment ID: {appointment._id}</p>
                        <p>Client: {appointment.client?.first_name} {appointment.client?.last_name} </p>
                        <p>Pet: {appointment.pet?.pet_name}  </p>
                        <p>Service Type: {appointment.service_type}</p>
                        <p>Services:</p>
                        <ul>
                            {renderServices(appointment.services, appointment.service_type, appointment._id)}
                        </ul>
                        <button onClick={() => handleUpdateStatus(appointment._id, 'approved')}>
                            Approve
                        </button>
                        <button onClick={() => handleUpdateStatus(appointment._id, 'declined')}>
                            Decline
                        </button>
                    </div>
                ))
            ) : (
                <p>No pending appointments</p>
            )}
        </div>
    );
};

export default PendingAppointmentsPage;
