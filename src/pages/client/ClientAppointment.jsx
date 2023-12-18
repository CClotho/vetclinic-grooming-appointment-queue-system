import { useState, useEffect } from 'react';
import { profile } from '../../hooks/users/useProfile';
import { useAuth } from '../../hooks/AuthContext';
import ClientAppointmentForm from '../../component/Appointment/ClientAppointmentForm';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import { useFetchClientAppointmentsToday, useFetchAppointmentHistory } from '../../hooks/appointment/useClientAppointment';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
export const ClientAppointment= () => {
 
    const [profileDetails, setProfileDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const {data: appointments, isLoadingAppointments }= useFetchClientAppointmentsToday();
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');

    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterServiceType, setFilterServiceType] = useState('');
    const [appointmentSearchTerm, setAppointmentSearchTerm] = useState('');

    const {data: appointmentList} = useFetchAppointmentHistory();
    console.log("Appointment List", appointmentList)

    console.log("Client's Appointments", appointments)

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

    
    
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
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
                        <div key={appointment._id} className={appointment.isClientAppointment ? styles.clientAppointmentCard : styles.appointmentCard}>
                        
                        <div className={styles.appointmentHeader}>
                        <h3>Appointment Details</h3>
                        </div>
                        
                        <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Client:</span>
                        <span className={styles.detailValue}>{appointment.client?.first_name} {appointment.client?.last_name}</span>
                        </div>
                        
                        <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Pet:</span>
                        <span className={styles.detailValue}>{appointment.pet?.pet_name}</span>
                        </div>
                        
                        <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Date:</span>
                        <span className={styles.detailValue}>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        
                    
                        
                        <div className={styles.serviceType}>
                        <span className={styles.detailLabel}>Service Type:</span>
                        <span className={styles.detailValue}>{appointment.service_type}</span>
                        </div>

                        
                        <div className={styles.statusInfo}>
                            <span className={styles.detailLabel}>Status:</span>
                            <span className={styles.detailValue}>{appointment.status}</span>
                           
                            </div>
                        
                        <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Queue Position: {appointment.queuePosition}</span>
                       
                        </div>
                        
                        <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Arrival Time: {appointment.arrivalTime ? new Date(appointment.arrivalTime).toLocaleTimeString('en-US', 
                        {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        }) : ''}</span>
                      
                        </div>
                        
                        <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Duration (mins):
                                {appointment.duration ? formatDuration(Math.floor(appointment.duration))
                                : 
                                (appointment.status === 'started' ? 
                                formatDuration() : 'Not Started')}
                                </span>
                                
                                </div>
                                

                          
                        {appointment.size && (
                                 <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Pet Size: {appointment.size?.size} </span>
 
                                </div>
                               )}
                        
                        <div className={styles.servicesList}>
                        <h4 className={styles.detailLabel}>Services:</h4>
                        {appointment.services?.map((service, index) => (
                            
                            <div className={styles.serviceItem} key={service._id || index}>
                                <div>{service.name} - {service.description}</div>
                            </div>
                        ))}
                    </div>
                        
                       
                        
                    </div>
                    ))
                ) : (
                    <p className={styles.noAppointments}>You currently have no grooming appointments for today.</p>
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
                            <div key={appointment._id} className={appointment.isClientAppointment ? styles.clientAppointmentCard : styles.appointmentCard}>
                            
                            <div className={styles.appointmentHeader}>
                            <h3>Appointment Details</h3>
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Client:</span>
                            <span className={styles.detailValue}>{appointment.client?.first_name} {appointment.client?.last_name}</span>
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Pet:</span>
                            <span className={styles.detailValue}>{appointment.pet?.pet_name}</span>
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date:</span>
                            <span className={styles.detailValue}>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Doctor:</span>
                            <span className={styles.detailValue}>{appointment.doctor?.first_name}</span>
                            </div>
                            
                            <div className={styles.serviceType}>
                            <span className={styles.detailLabel}>Service Type:</span>
                            <span className={styles.detailValue}>{appointment.service_type}</span>
                            </div>
                            
                            <div className={styles.statusInfo}>
                            <span className={styles.detailLabel}>Status:</span>
                            <span className={styles.detailValue}>{appointment.status}</span>
                           
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Queue Position:</span>
                            <span className={styles.detailValue}>{appointment.queuePosition}</span>
                            </div>

                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Arrival Time:</span>
                            <input 
                                className={styles.statusInput}
                                type="time" 
                                value={new Date(appointment.arrivalTime).toLocaleTimeString().substring(0,5)} 
                                onChange={handleChange}
                                
                            />
                            </div>
                            
                            <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Duration (mins):</span>
                            <span className={styles.detailValue}>{appointment.duration}</span>
                            </div>
                            
                            <div className={styles.servicesList}>
                            <h4 className={styles.detailLabel}>Services:</h4>
                            {appointment.services.map(service => (
                                <div className={styles.serviceItem} key={service._id}>
                                {service.serviceId?.name} 
                                </div>
                            ))}
                            </div>
                            
                          
                            
                        </div>
                        ))
                    ) : (
                        <p className={styles.noAppointments}>You currently have no treatment appointments for today.</p>
                    )
                    }

                
               </div>

           
                    
            </div>
        );
    };
        
        const renderAppointmentCardList = (appointment)=> {
            
            return (
                <div key={appointment._id} className={styles.appointmentCard}>
                    <div className={styles.appointmentHeader}>
                        <h3>Appointment Details</h3>
                            </div>
                                
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Client:</span>
                                <span className={styles.detailValue}>{appointment.client?.first_name} {appointment.client?.last_name}</span>
                            </div>
                                
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Pet:</span>
                                <span className={styles.detailValue}>{appointment.pet?.pet_name}</span>
                            </div>
                                
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Date:</span>
                                <span className={styles.detailValue}>{new Date(appointment.date).toDateString()}</span>
                            </div>
                                
                            
                                
                            <div className={styles.serviceType}>
                                <span className={styles.detailLabel}>Service Type:</span>
                                <span className={styles.detailValue}>{appointment.service_type}</span>
                            </div>
                                
                            <div className={styles.statusInfo}>
                                <span className={styles.detailLabel}>Status: {appointment.status} </span>
                            
                            </div>
                                
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Queue Position: {appointment.queuePosition} </span>
        
                            </div>
                                
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>Arrival Time: {new Date(appointment.arrivalTime).toLocaleTimeString().substring(0,5)} </span>
                            
                                    </div>
                                    
                                    <div className={styles.detailRow}>
                                    <span className={styles.detailLabel}>Duration (mins):
                                    {appointment.duration ? formatDuration(Math.floor(appointment.duration))
                                    : 
                                    (appointment.status === 'started' ? 
                                    formatDuration() : 'Not Started')}
                                    </span>
                                    
                                    </div>
                                    
                                {appointment.size && (
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>Pet Size: {appointment.size?.size} </span>

                                    </div>
                                )}
                                    
                                    <div className={styles.servicesList}>
                                        <h4 className={styles.detailLabel}>Services:</h4>
                                        {appointment.services?.map(service => (
                                            <div className={styles.serviceItem} key={service._id}>
                                            <div>{service?.name} - {service?.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                
            
                                
                            </div>               
            );
        };


        const renderFilteredAppointmentHistory = (appointmentsArray, searchTerm, filterDate, filterServiceType) => {
            // Here, we'll add a check to make sure that `appointmentsArray` is actually an array.
            if (!Array.isArray(appointmentsArray)) {
            return <p className={styles.noAppointments}>No appointments available or still loading.</p>;
            }
        
            // If it's an empty array, you might want to return a message indicating that there are no appointments.
            if (appointmentsArray.length === 0) {
            return <p className={styles.noAppointments}>No appointments found.</p>;
            }
        
            // Proceed with the filtering logic only if `appointmentsArray` is indeed an array.
            const filteredAppointments = appointmentsArray.filter(appointment => {
            
                if (!appointment.pet) {
                    return false; // Skip this appointment if client or pet data is missing
                }
            
            
            const petName = appointment?.pet?.pet_name?.toLowerCase();
            const matchesPetName = searchTerm ? petName.includes(searchTerm.toLowerCase()) : true;

            console.log('Current appointment date:', new Date(appointment.date).toDateString());
                

            let matchesDate = true;
            if(filterDate) {

                const appointmentDateString = new Date(appointment?.date).toDateString();
                const filterDateString = filterDate && filterDate?.toDateString();

                console.log('Appointment date:', appointmentDateString);
                console.log('Filter date:', filterDateString);

                matchesDate = filterDateString === appointmentDateString;

            }
            
                
            
            const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
            const matchesServiceType = filterServiceType ? appointment.service_type === filterServiceType : true;
           
        


            return matchesPetName && matchesDate && matchesServiceType && matchesStatus;
            });
        
            // Render the filtered appointments or a message if none are found
            return filteredAppointments.length > 0 
            ? filteredAppointments.map(renderAppointmentCardList)
            : <p className={styles.noAppointments}>No matching appointments found.</p>;
        };


    return (
        <div>
            <h1> {profileDetails?.first_name} &apos;s Appointments </h1>
            {renderAppointments()}
            <ClientAppointmentForm/>

            
            <div className={styles.appointments}>
            <div className={styles.searchBarContainer}>
                
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search Appointments..."
                            onChange={(e) => setAppointmentSearchTerm(e.target.value)}
                        />
                        <span className={styles.searchIcon}>
                        <img src="/src/assets/icons/search.png" alt="Search"/>
                        </span>
                    </div>
                    <h2>Appointment List</h2>

                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            >
                            <option value="">All Statuses</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="finished">Finished</option>
                            <option value="noShow">No Show</option>
                            <option value="reschedule">Reschedule</option>
                            <option value="paused">Paused</option>
                            <option value="declined">Declined</option>
                            
                        </select>
                    </div>

                    {/* Date filter input */}
                    <div >
                        <label htmlFor="date" >Select Date:</label>
                        <DatePicker
                        selected={filterDate}
                        onChange={date => {
                            console.log(date); // Log the selected date
                            setFilterDate(date)}}
                        dateFormat="yyyy-MM-dd"
                    
                        />
                    </div>
                    
                    {/* Service type filter input */}
                    <select
                        value={filterServiceType}
                        onChange={(e) => setFilterServiceType(e.target.value)}
                    >
                        <option value="">All Services</option>
                        <option value="grooming">Grooming</option>
                        <option value="treatment">Treatment</option>
                    </select>

                {renderFilteredAppointmentHistory(appointmentList, appointmentSearchTerm, filterDate, filterServiceType)}
            </div>
        </div>

        
    ); 
};


