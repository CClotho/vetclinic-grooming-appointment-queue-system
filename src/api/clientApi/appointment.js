import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const requestAppointment = async (data) => {
    const response = await axios.post('http://localhost:3000/client/appointment/create', data);
    return response.data;
  };


export const fetchAppointmentQueueToday = async() => {
  const response = await axios.get('http://localhost:3000/client/appointments/today/queue');
  return response.data;
}


export const fetchAppointmentsToday = async() => {
  const response = await axios.get('http://localhost:3000/client/appointments/today');
  return response.data;
}


export const fetchPendingAppointments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/client/appointments/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
};