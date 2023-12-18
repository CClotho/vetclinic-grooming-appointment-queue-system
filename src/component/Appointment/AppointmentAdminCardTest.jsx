import  { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import { useAuth } from '../../hooks/AuthContext';
import * as Yup from 'yup';

const AppointmentCard = ({ appointment, onUpdate, onDelete }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [duration, setDuration] = useState(0);
    const {user} = useAuth();

    useEffect(() => {
        let interval;
        console.log('Appointment Status:', appointment.status);
        console.log('Appointment Start Time:', appointment.startTime);
        console.log('appointment.duration:', appointment.duration);
         console.log('appointment.startTime:', appointment.startTime);
        console.log('calculated duration state:', duration);
        console.log('appointments', appointment.services)

    
        if (appointment.status === 'started' && appointment.startTime) {
            const startTime = new Date(appointment.startTime).getTime();
    
            interval = setInterval(() => {
                const now = Date.now();
                const newDuration = Math.floor((now - startTime) / 1000);
                setDuration(newDuration);
                console.log('Duration Updated:', newDuration);
            }, 1000);
        } else {
            console.log('Not Started or Start Time Invalid');
        }
    
        return () => clearInterval(interval);
    }, [appointment.status, appointment.startTime]);
    

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
        <div className={styles.appointmentCard}>
            <div className={styles.appointmentHeader}>
                <h3>Appointment Details</h3>
            </div>

            {isEditMode && user.role === 'doctor' ? (
                <form onSubmit={formik.handleSubmit}>
                    {/* Editable fields */}
                    <div className={styles.detailRow}>
                        <label>Status:</label>
                        <input type="text" name="status" onChange={formik.handleChange} value={formik.values.status} />
                    </div>
                    <div className={styles.detailRow}>
                        <label>Queue Position:</label>
                        <input type="number" name="queuePosition" onChange={formik.handleChange} value={formik.values.queuePosition} />
                    </div>
                    <div className={styles.detailRow}>
                        <label>Arrival Time:</label>
                        <input type="time" name="arrivalTime" onChange={formik.handleChange} value={formik.values.arrivalTime} />
                    </div>
                    <button type="submit" className={styles.updateButton}>Save Changes</button>
                </form>
            ) : (
                <>
                    {/* Display details */}
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
                        <span className={styles.detailLabel}>Service Type:</span>
                        <span className={styles.detailValue}>{appointment.service_type}</span>
                    </div>
               
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
                        <span className={styles.detailValue}>  {new Date(appointment.arrivalTime).toLocaleTimeString('en-US', 
                        {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Duration:</span>
                        <span className={styles.detailValue}>
                        {appointment.duration ? formatDuration(appointment.duration) 
                          : 
                        (appointment.status === 'started' ? 
                        formatDuration(duration) : 'Not Started')}
                            </span>
                    </div>

                    <div className={styles.servicesList}>
                        <h4 className={styles.detailLabel}>Services:</h4>
                        {appointment.services?.map((service, index) => (
                            
                            <div className={styles.serviceItem} key={service._id || index}>
                                <div>{service.name} - {service.description}</div>
                            </div>
                        ))}
                    </div>

                </>
            )}

            <div className={styles.appointmentActions}>
                {isEditMode && user.role === "doctor" ? (
                    <button onClick={() => setIsEditMode(false)} className={styles.newButton}>Cancel</button>
                ) : (
                   <>
                    <button onClick={() => setIsEditMode(true)} className={styles.newButton}>Edit</button>
                    {appointment.status === 'started' && (
                        <button onClick={handleStop} className={styles.stopButton}>Stop</button>
                    )}
                   </>
                )}
                <button onClick={() => onDelete(appointment._id)} className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;