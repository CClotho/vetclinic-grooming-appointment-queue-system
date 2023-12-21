import  { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import * as Yup from 'yup';

const ClientAppointmentCard = ({ appointment, index }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [duration, setDuration] = useState(0);
    
    console.log(index)
    useEffect(() => {
        let interval;
        console.log('Appointment Status:', appointment.status);
        console.log('Appointment Start Time:', appointment.startTime);
        console.log('appointment.duration:', appointment.duration);
         console.log('appointment.startTime:', appointment.startTime);
        console.log('calculated duration state:', duration);

     
        if (appointment.status === 'started' && appointment.startTime) {
            const startTime = new Date(appointment.startTime).getTime();
            const pausedDuration = appointment.pausedDuration || 0;
    
            interval = setInterval(() => {
                const now = Date.now();
                const newDuration = Math.floor((now - startTime) / 1000) + pausedDuration;
                setDuration(newDuration);
                console.log('Duration Updated:', newDuration);
            }, 1000);
        } else {
            console.log('Not Started or Start Time Invalid');
        }
    
        return () => clearInterval(interval);
    }, [appointment.status, appointment.startTime, appointment.isTracking,appointment.pausedDuration]);
    
    
    

    const appointmentUpdateSchema = Yup.object().shape({
        status: Yup.string().oneOf(['pending', 'approved', 'declined', 'started', 'finished', 'cancelled', 'noShow', 'reschedule']),
        queuePosition: Yup.number().positive().integer(),
        
        // Add more validations as needed
    });

    const formik = useFormik({
        initialValues: {
            
            status: appointment?.status || '',
            queuePosition: appointment?.queuePosition || 0,
            arrivalTime: appointment?.arrivalTime ? new Date(appointment.arrivalTime).toISOString() : '',
           
        },
        
        validationSchema: appointmentUpdateSchema,
        onSubmit: (values) => {
            
            
            console.log("Updated Appointment values: ",values)
            onUpdate(appointment._id, values);
            setIsEditMode(false);
            
        },
    });

    

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    

    const handleStop = () => {
        const updatedValues = {
            status: 'finished', 
            duration: duration// or another appropriate status
            // any other fields you want to update
        };
        onUpdate(appointment._id, updatedValues);
    };

    return (
        
            <div className={appointment.isClientAppointment ? styles.clientAppointmentCard : styles.appointmentCard}>
            <div className={styles.appointmentHeader}>
                <h3>Appointment Details</h3>
            </div>
        
            {/* Display common details */}

            
           
            {appointment.isClientAppointment ? (
                <>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Client:</span>
                <span className={styles.detailValue}>{appointment.client?.first_name} {appointment.client?.last_name}</span>
                
            </div>
            
                <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Pet:</span>
                <span className={styles.detailValue}>{appointment.pet?.pet_name}</span>
            </div> 
            </>) : (
                <>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Client:</span>
                    <span className={styles.detailValue}>{index}</span>
                </div>
                </>
            )
            
            }

           
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date:</span>
                <span className={styles.detailValue}>{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
        
            {/* Conditional rendering for client appointments */}
            {appointment.isClientAppointment && (
                <>
                    
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Service Type:</span>
                        <span className={styles.detailValue}>{appointment.service_type}</span>
                    </div>
                </>
            )}
        
            {/* Display other details */}
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <span className={styles.detailValue}>{appointment.status}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Queue Position:</span>
                <span className={styles.detailValue}>{appointment.queuePosition}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Arrival Time:</span>
                <span className={styles.detailValue}>{new Date(appointment.arrivalTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>
                    {appointment.status === 'started'
                        ? formatDuration(Math.floor(duration))
                        : formatDuration(Math.floor(appointment.duration))}
                </span>
            </div>
        
            {/* Conditional rendering for services list */}
            {appointment.isClientAppointment && (
                <div className={styles.servicesList}>
                    <h4 className={styles.detailLabel}>Services:</h4>
                    {appointment.services?.map((service, index) => (
                        <div className={styles.serviceItem} key={service._id || index}>
                            <div>{service.name} - {service.description}</div>
                        </div>
                    ))}
                </div>
            )}
    </div>
    
    );
};

export default ClientAppointmentCard;