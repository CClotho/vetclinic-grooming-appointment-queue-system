import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// POST create pet

export const createAppointment = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/appointment/create', data);
  return response.data;
};

// for form in creating an appointment
export const fetchClientsInfo = async () => {
  const response = await axios.get('http://localhost:3000/admin/clients/summary');
  return response.data;
}

export const fetchPendingAppointments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/admin/appointments/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending appointments:", error);
    throw error;
  }
};

export const updateAppointmentStatus = async (data) => {
  try {
    const response = await axios.patch('http://localhost:3000/admin/appointments/pending/update', data);
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};

export const fetchAppointmentsQueueToday = async (data) => {
  try {
    const response = await axios.get('http://localhost:3000/admin/appointments/today/queue', data);
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};