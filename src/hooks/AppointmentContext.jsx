import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

// This should be the URL of your server where Socket.IO is running
const socket = io('http://localhost:3000');

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children}) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Handle real-time appointment updates
    socket.on('appointmentUpdated', (updatedAppointment) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) => {
            if (appointment._id === updatedAppointment._id) {
              // If the appointment has just started, set isTracking to true
              if (updatedAppointment.status === 'started' && !appointment.isTracking) {
                return { ...updatedAppointment, isTracking: true, startTime: Date.now() };
              } else if (updatedAppointment.status === 'finished' && appointment.isTracking) {
                // When the appointment is finished, stop tracking
                return { ...updatedAppointment, isTracking: false };
              }
              return updatedAppointment;
            }
            return appointment;
          })
        );
      });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('appointmentUpdated');
    };
  }, []);

  // Function to start tracking elapsed time for a started appointment
  const startTimer = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment._id === appointmentId) {
          // Reset startTime to now and continue tracking
          const now = Date.now();
          return { ...appointment, startTime: now, isTracking: true };
        }
        return appointment;
      })
    );
  };

  // Function to stop tracking elapsed time
  const stopTimer = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment._id === appointmentId && appointment.isTracking) {
          const now = Date.now();
          // Calculate new elapsed time
          const newElapsedTime = (now - appointment.startTime) / 1000; // in seconds
          // Update the duration to be the sum of previous duration and new elapsed time
          const totalDuration = (appointment.duration || 0) + newElapsedTime;
          return { ...appointment, isTracking: false, duration: totalDuration };
        }
        return appointment;
      })
    );
  };

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments, startTimer, stopTimer }}>
      {children}
    </AppointmentContext.Provider>
  ); 
};

export default AppointmentContext;