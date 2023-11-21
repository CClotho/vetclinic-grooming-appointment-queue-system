import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// POST create pet

export const createAppointment = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/appointment/create', data);
  return response.data;
};


export const deleteQueueAppointment = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/appointments/delete/appointment/queue', data);
  return response.data;
};


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

export const fetchAppointmentsQueueToday = async () => {
  try {
    const response = await axios.get('http://localhost:3000/admin/appointments/today/queue');
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
   
  }
};


export const updateAppointmentQueueStatus = async (id, data) => {
  try {
    const response = await axios.post('http://localhost:3000/admin/appointment/update/queue', id, data);
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};

export const updateAppointmentForm = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/admin/appointments/update/appointment', data);
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
};  