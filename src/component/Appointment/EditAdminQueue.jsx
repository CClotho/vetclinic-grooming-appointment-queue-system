import  { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import styles from '../../assets/styles/dashboard.module.css'; // Import CSS module
import { useAuth } from '../../hooks/AuthContext';
import * as Yup from 'yup';
import AppointmentContext from '../../hooks/AppointmentContext';

const AppointmentCard = ({ appointment, onUpdate, onDelete }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [duration, setDuration] = useState(0);
    const { appointments, startTimer, stopTimer, resumeTimer } = useContext(AppointmentContext);
    const {user} = useAuth();

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
        status: Yup.string().oneOf(['pending', 'approved', 'declined', 'paused','started', 'finished', 'cancelled', 'noShow', 'reschedule']),
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
        
        stopTimer(appointment._id);
        
        const updatedValues = {
            status: 'paused', 
            duration: duration// or another appropriate status
            // any other fields you want to update
        };
        onUpdate(appointment._id, updatedValues);
    };

    const handleResume = () => {
        // Resume the timer
        resumeTimer(appointment._id);
      
        // Update the status or other fields if necessary
        const updatedValues = {
         status: 'started'
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
                        <select 
                            name="status" 
                            onChange={formik.handleChange} 
                            value={formik.values.status}
                            className={styles.select}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="declined">Declined</option>
                            <option value="started">Started</option>
                            <option value="paused">Paused</option>
                            <option value="finished">Finished</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="noShow">No Show</option>
                            <option value="reschedule">Reschedule</option>
                        </select>
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
                            {appointment.status === 'started'
                                ? formatDuration(Math.floor(duration))
                                : formatDuration(Math.floor(appointment.duration))}
                        </span>
                    </div>

                    <div className={styles.servicesList}>
                            <h4 className={styles.detailLabel}>Services:</h4>
                            {appointment.services?.map(service => (
                                <div className={styles.serviceItem} key={service._id}>
                                <div>{service?.name} - {service?.description}</div>
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
                    {appointment.status === 'paused' && (
                    <button onClick={handleResume} className={styles.resumeButton}>Resume</button>
                    )}
                   </>
                )}
                <button onClick={() => onDelete(appointment._id)} className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;