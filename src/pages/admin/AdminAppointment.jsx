import AppointmentForm from "../../component/Appointment/AdminAppointmentForm"
import AddPetForm from "../../component/Pet/AddPetForm"
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useFetchPendingAppointments, useFetchAppointmentsQueueToday } from '../../hooks/appointment/useAdminAppointment';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import EditAppointmentForm from "../../component/Appointment/AdminAppointmentEdit";
import {  useUpdateAppointmentForm } from '../../hooks/appointment/useAdminAppointment';
import { useFetchAppointmentList } from "../../hooks/appointment/useAdminAppointment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
//const socket = io("http://localhost:3000");

export const AdminAppointment= () => {
   
    const { data: pendingAppointments } = useFetchPendingAppointments();
    const { data: appointments, isLoadingAppointments } = useFetchAppointmentsQueueToday();
   
    const [groomingSearchTerm, setGroomingSearchTerm] = useState('');
    const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const updateAppointment= useUpdateAppointmentForm();
    
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterServiceType, setFilterServiceType] = useState('');
    const [appointmentSearchTerm, setAppointmentSearchTerm] = useState('');
    const {data: appointmentList} = useFetchAppointmentList();
  
    console.log("Appointment List", appointmentList)


   
 
  /*   useEffect(() => {
        socket.on('newPendingAppointment', (appointment) => {
            queryClient.setQueryData(['pendingAppointments'], old => [...old, appointment]);
        });

        return () => {
            socket.off('newPendingAppointment');
        };
    }, [queryClient]);  */



    // Function to render today's appointments queue

    
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

   
    const handleUpdate = (appointmentId) => {
        // Toggle editing for the selected appointment
        if (selectedAppointment && selectedAppointment._id === appointmentId) {
            // If the same appointment is clicked again, close the editor
            setSelectedAppointment(null);
        } else {
            // Otherwise, find and set the new appointment to be edited
            let appointmentToEdit = appointments.groomingAppointments?.find(appointment => appointment._id === appointmentId) ||
                                    appointments.treatmentAppointments?.find(appointment => appointment._id === appointmentId);
            setSelectedAppointment(appointmentToEdit);
        }
    };
    
    const handleEditSubmit = (appointmentId, updatedValues) => {
         updateAppointment.mutate({ id: appointmentId, data: updatedValues });
        console.log(appointmentId, updatedValues)
        setSelectedAppointment(null);
      };

    // Newly added function
    const renderAppointmentCard = (appointment) => {
        if (selectedAppointment && selectedAppointment._id === appointment._id) {
            return <EditAppointmentForm key={appointment._id} appointment={appointment} onSubmit={handleEditSubmit} />;
        }
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
                            
                            <div className={styles.appointmentActions}>
                                <button onClick={() => handleUpdate(appointment._id)} className={styles.updateButton}>Update</button>
                                <button onClick={() => handleDelete(appointment._id)} className={styles.deleteButton}>Delete</button>
                            </div>
                            
                        </div>               
        );
    };

    const renderAppointmentCardList = (appointment) => {
        if (selectedAppointment && selectedAppointment._id === appointment._id) {
            return <EditAppointmentForm key={appointment._id} appointment={appointment} onSubmit={handleEditSubmit} />;
        }
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
                            
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Doctor:</span>
                            <span className={styles.detailValue}>{appointment.doctor?.first_name}</span>
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


    // newly added function
    const renderFilteredAppointments = (appointmentsArray, searchTerm) => {
        // Check if the appointments array is still loading or undefined
        if (!appointmentsArray) {
            return <p className={styles.noAppointments}>Loading appointments...</p>;
        }
    
        // Filtering logic combined within the same function
        const filteredAppointments = searchTerm
            ? appointmentsArray.filter(appointment => {
                const clientName = `${appointment?.client?.first_name} ${appointment?.client?.last_name}`.toLowerCase();
                const petName = appointment?.pet?.pet_name.toLowerCase();
                return clientName.includes(searchTerm.toLowerCase()) || petName.includes(searchTerm.toLowerCase());
            })
            : appointmentsArray;
    
        // Render appointments or show a message if no appointments are found
        return filteredAppointments.length > 0 
            ? filteredAppointments.map(renderAppointmentCard)
            : <p className={styles.noAppointments}>No appointments found.</p>;
    };

    const renderFilteredAppointmentList = (appointmentsArray, searchTerm, filterDate, filterServiceType) => {
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
            if (!appointment.client || !appointment.pet) {
                return false; // Skip this appointment if client or pet data is missing
            }
          
          const clientName = `${appointment?.client?.first_name} ${appointment?.client?.last_name}`.toLowerCase();
          const petName = appointment?.pet?.pet_name?.toLowerCase();
          const matchesSearchTerm = clientName?.includes(searchTerm.toLowerCase()) || petName.includes(searchTerm.toLowerCase());
          
          console.log('Current appointment date:', new Date(appointment.date).toDateString());
            
          let matchesDate = true;
          if(filterDate) {

            const appointmentDateString = new Date(appointment?.date).toDateString();
            const filterDateString = filterDate && filterDate?.toDateString();

            console.log('Appointment date:', appointmentDateString);
            console.log('Filter date:', filterDateString);

            matchesDate = filterDateString === appointmentDateString;

          }
          
            
           

          const matchesServiceType = filterServiceType ? appointment.service_type === filterServiceType : true;
          const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
         
          return matchesSearchTerm && matchesDate && matchesServiceType&&  matchesStatus;
        });
      
        // Render the filtered appointments or a message if none are found
        return filteredAppointments.length > 0 
          ? filteredAppointments.map(renderAppointmentCardList)
          : <p className={styles.noAppointments}>No matching appointments found.</p>;
      };
    


    
    // Function to render pending appointments summary
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

  

    return (
        <div>
            <h1>Appointments</h1>
            {renderPendingAppointmentsSummary()}


            <div className={styles.appointments}>
                <div className={styles.searchBarContainer}>
                <h2> Create an Appointment</h2>
                <AppointmentForm/>

                <h2> Register Pet</h2>
                <AddPetForm/>

                </div>
            </div>
           
            <div className={styles.appointments}>
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
                {renderFilteredAppointments(appointments?.groomingAppointments, groomingSearchTerm)}
            </div>
                 <div className={styles.appointments}>
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
                {renderFilteredAppointments(appointments?.treatmentAppointments, treatmentSearchTerm)}
          

            
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
                    
                    {/* Service type filter input */}
                    <select
                        value={filterServiceType}
                        onChange={(e) => setFilterServiceType(e.target.value)}
                    >
                        <option value="">All Services</option>
                        <option value="grooming">Grooming</option>
                        <option value="treatment">Treatment</option>
                    </select>

                {renderFilteredAppointmentList(appointmentList, appointmentSearchTerm, filterDate, filterServiceType)}
            </div>
        </div>

            
           
            <Outlet/>
        </div>
    );
};