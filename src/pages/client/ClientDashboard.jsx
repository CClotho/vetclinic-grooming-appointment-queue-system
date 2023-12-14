import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../hooks/users/useProfile';
import { useAuth } from '../../hooks/AuthContext';
import ClientAppointmentForm from '../../component/Appointment/ClientAppointmentForm';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import { useFetchClientAppointmentsQueue, useFetchClientPendingAppointments } from '../../hooks/appointment/useClientAppointment';
import ClientAppointmentCard from '../../component/Appointment/ClientAppointmentCard';
export const ClientDashboard= () => {
 
    const [profileDetails, setProfileDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const {data: appointments, isLoadingAppointments }= useFetchClientAppointmentsQueue();
    const {data: pendingAppointments }= useFetchClientPendingAppointments();
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
    

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const response = await profile();
                if (response.status === 200) {
                    setProfileDetails(response.data);
                    console.log(response.data)
                }

                
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
       
         fetchProfileDetails();
        
       
    }, []);

    const renderPendingAppointmentsSummary = () => {
        const pendingCount = pendingAppointments?.length || 0;
        return (
            <div>
                <h2>Pending Appointments</h2>
                {pendingCount > 0 ? (
                    <div>
                        <p>{pendingCount} pending requests</p>
                        <Link to="/pending/appointments">View Pending Appointments</Link>
                    </div>
                ) : (
                    <p>No pending requests</p>
                )}
            </div>
        );
    };

    
    // Function to render today's appointments queue
    const renderAppointments = () => {
        
   
        if (isLoadingAppointments) {
            return <div>Loading Appointments...</div>;
        }

       
        const filterAppointments = (appointments, searchTerm) => {
            if (!searchTerm) return appointments;
        
            return appointments.filter(appointment => {
                const searchTermLower = searchTerm.toLowerCase();
                const clientName = `${appointment.client?.first_name} ${appointment.client?.last_name}`.toLowerCase();
                const petName = `${appointment.pet?.pet_name}`.toLowerCase();
                const matchesPetName = petName.includes(searchTermLower);

                const matchesClientName = clientName.includes(searchTermLower);
        
                const matchesServiceName = appointment.services.some(service => 
                    service.serviceId?.name.toLowerCase().includes(searchTermLower)
                );

                const matchesServiceDescription = appointment.services.some(service =>
                    service.serviceId?.description.toLowerCase().includes(searchTermLower)
                  );
              
                  const matchesServiceSize = appointment.services.some(service =>
                    service.chosenSize?.size.toLowerCase().includes(searchTermLower)
                  );
              
        
                return matchesClientName || matchesServiceName ||   matchesPetName || matchesServiceSize ||  matchesServiceDescription ;
            });
        };
        
        
        
        // Filter appointments based on the search term
        const grooming = appointments?.groomingAppointments.filter(appointment => appointment.service_type === 'grooming') || [];
        const treatment = appointments?.treatmentAppointments.filter(appointment => appointment.service_type === 'treatment') || [];
        
        
        const filteredGroomingAppointments = filterAppointments(grooming, groomingSearchTerm, 'grooming');
        const filteredTreatmentAppointments = filterAppointments(treatment, treatmentSearchTerm, 'treatment');
              // Log the appointments data to see what's actually being fetched
        console.log('Appointments Data:', appointments);

        // Your existing filter logic...
        // ...

        // Log the filtered appointments to see what's being rendered
        console.log('Filtered Grooming Appointments:', filteredGroomingAppointments);
        console.log('Filtered Treatment Appointments:', filteredTreatmentAppointments);

        const handleChange = () => {

        }
    
        return (
            <div className={styles.appointments}>
                
                
               <div>
                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Grooming Appointments..."
                            onChange={(e) => setGroomingSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>

        
    
                <h2>Grooming Appointments</h2>
                {
                filteredGroomingAppointments.length > 0 ? (
                    filteredGroomingAppointments.map((appointment, index) => (
                        <ClientAppointmentCard
                            key={appointment._id}
                            appointment={appointment} 
                        />
                    ))
                ) : (
                    <p className={styles.noAppointments}>There are currently no grooming appointments.</p>
                )
                }

               </div>

               <div>    
                    <div className={styles.searchBarContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Treatment Appointments..."
                            onChange={(e) => setTreatmentSearchTerm(e.target.value)}
                            />
                            <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>
    
                    <h2>Treatment Appointments</h2>
                    {
                    filteredTreatmentAppointments.length > 0 ? (
                        filteredTreatmentAppointments.map((appointment, index) => (
                              <ClientAppointmentCard
                            key={appointment._id}
                            appointment={appointment} 
                        />
                        ))
                    ) : (
                        <p className={styles.noAppointments}>There are currently no treatment appointments.</p>
                    )
                    }

                
               </div>

           
                    
            </div>
        );
    };

    
    



    return (
        <div>
            <h1> {profileDetails?.first_name} &apos;s DASHBOARD </h1>
            {renderPendingAppointmentsSummary()}
            {renderAppointments()}
            <ClientAppointmentForm/>

        </div>
    ); 
};


