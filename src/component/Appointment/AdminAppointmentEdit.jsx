
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchClientsInfo } from '../../hooks/clients/useAdminClients';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import { useFetchGroomingServices, useFetchPetSizes } from '../../hooks/grooming/useGrooming';
import { DateTime } from 'luxon';
import { useState } from 'react';
import styles from '../../assets/styles/component.module.css'; // Import CSS module
import * as Yup from 'yup';


const appointmentValidationSchema = Yup.object().shape({
    client: Yup.string().required('Client is required'),
    pet: Yup.string().required('Pet is required'),
    date: Yup.date().required('Date is required').nullable(),
    service_type: Yup.string().oneOf(['grooming', 'treatment'], 'Invalid service type').required(),
    services: Yup.array().of(
        Yup.object().shape({
            serviceId: Yup.string().required('Service ID is required'),
            serviceType: Yup.string().required('Service type is required'),
            chosenSize: Yup.string().when('serviceType', (serviceType, schema) => {
                return serviceType === 'grooming' ? schema.required('Size is required for grooming services') : schema.nullable();
            })
            
        })
    ),
    status: Yup.string().oneOf(['pending', 'approved', 'declined', 'inProgress', 'finished', 'cancelled', 'noShow', 'reschedule'], 'Invalid status').required()
});

const EditAppointmentForm = ({appointment, onSubmit}) => {

    const { data: treatments, isLoading: isLoadingTreatments } = useFetchTreatments();
    const {data: grooming,  isLoading} = useFetchGroomingServices();
    const {data: petSizes } = useFetchPetSizes(); // use this to display reference for the size  because in form selecting size will only state "medium" etc this will show medium - A big fur etc
    const {data: clientInformation} = useFetchClientsInfo();

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    // Extract the service IDs from the appointment object to initialize the selectedServices state
    const initialSelectedServices = Array.isArray(appointment.services)
  ? appointment.services.map(service => service.serviceId).filter(id => id != null)
  : [];


    // Initialize the state with the extracted service IDs
    const [selectedServices, setSelectedServices] = useState(initialSelectedServices);
    const [chosenSize, setChosenSize] = useState(appointment.chosenSize || '');

    const MAX_SERVICES = 3;

    const formik = useFormik({
        initialValues: {
            client: appointment.client?._id || '',
            pet: appointment.pet?._id || '',
            date: appointment.date ? new Date(appointment.date) : null,
            service_type: appointment.service_type || 'grooming',
            services: appointment.services.map(service => ({
                serviceId: service.serviceId,
                serviceType: service.serviceType,
            })),
            chosenSize: appointment.chosenSize || '',
            status: appointment.status || 'pending',
        },
        // ... other useFormik setup
        
    
        enableReinitialize: true, 
        validationSchema: appointmentValidationSchema,
        onSubmit: (values) => {
          
            const formattedServices = values.services.map(service => ({
                serviceId: service.serviceId,
                serviceType: service.serviceType,
                chosenSize: values.service_type === 'grooming' ? chosenSize : undefined,
            }));
    
            const formattedValues = {
                ...values,
                date: values.date ? DateTime.fromJSDate(values.date).toISO() : null,
                services: formattedServices
            };
    
            console.log("Formatted Submission Values", formattedValues);
            // Call the mutation or API function to create the appointment
            onSubmit(appointment._id, formattedValues);
        },
        
    });

    const handleClientChange = (event) => {
        const clientId = event.target.value;
        setSelectedClient(clientId);
        setSelectedPet(''); // Reset selected pet
        formik.setFieldValue('client', clientId);
        formik.setFieldValue('pet', '');
    };

    const handlePetChange = (event) => {
        const petId = event.target.value;
        setSelectedPet(petId);
        formik.setFieldValue('pet', petId);
    };

    const getClientPets = () => {
        const client = clientInformation.find(c => c._id === selectedClient);
        return client ? client.pets : [];
    };

    const getSelectedPetDetails = () => {
        const pets = getClientPets();
        return pets.find(p => p._id === selectedPet) || {};
    };
    
    const isServiceSelected = (serviceId) => {
        return selectedServices.some(service => service.serviceId === serviceId);
    };
 
    const handleServiceChange = (serviceId, e) => {
        const isChecked = e.target.checked;
    
        let updatedSelectedServices = isChecked
            ? [...selectedServices, serviceId]
            : selectedServices.filter(id => id !== serviceId);
    
        if (updatedSelectedServices.length > MAX_SERVICES) {
            alert(`You can select up to ${MAX_SERVICES} services only.`);
            e.target.checked = false; // Uncheck the checkbox
            updatedSelectedServices = selectedServices; // Revert to previous state
        }
    
        setSelectedServices(updatedSelectedServices);
        const servicesForFormik = updatedSelectedServices.map(id => ({ serviceId: id, serviceType: formik.values.service_type }));
        formik.setFieldValue('services', servicesForFormik);
    
        console.log('Updated services:', servicesForFormik);
    };
    
    
    
    const handleSizeChange = (sizeId) => {
        setChosenSize(sizeId);
    };
    const handleServiceTypeChange = (e) => {
        const serviceType = e.target.value;
        setSelectedServices([]); // Reset selected services when service type changes
        formik.setFieldValue('service_type', serviceType);
        formik.setFieldValue('services', []); // Reset the services field in formik
        if (serviceType === 'treatment') {
            setChosenSize(''); // Clear chosen size for treatments
        }
    };
    
   
   
    return (
        <div className={styles.appointmentFormCard}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="client" className={styles.label}>Client:</label>
                    <select
                        id="client"
                        name="client"
                        className={styles.select}
                        value={formik.values.client}
                        onChange={handleClientChange}
                    >
                         {clientInformation?.map(client => (
                        <option key={client._id} value={client._id}>{client.first_name} {client.last_name}</option>
                    ))}
                    </select>
                    {formik.touched.client && formik.errors.client && <div className={styles.errorMsg}>{formik.errors.client}</div>}
                </div>

                {/* Assuming you want to wrap the pet dropdown in formGroup as well */}
                <div className={styles.formGroup}>
                        
                    {selectedClient && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Pet:</label>
                        <select name="pet" value={formik.values.pet}  className={styles.select} onChange={handlePetChange}>
                            <option value="">Select a pet</option>
                            {getClientPets().map(pet => (
                                <option key={pet._id} value={pet._id}>{pet.pet_name}</option>
                            ))}
                        </select>
                        {formik.touched.pet && formik.errors.pet ? <div>{formik.errors.pet}</div> : null}
                    </div>
                    )}
                    
                    {formik.touched.pet && formik.errors.pet && <div className={styles.errorMsg}>{formik.errors.pet}</div>}
                </div>

                {/* Additional pet details */}
                <div className={styles.formGroup}>
            
        
                    {selectedPet && (
                        <div>
                            <p>Breed: {getSelectedPetDetails().breed}</p>
                            <p>Name: {getSelectedPetDetails().pet_name}</p>
                            <p>Gender: {getSelectedPetDetails().gender}</p>
                        </div>
                    )}
                </div>

                {/* Date Picker */}
                <div className={styles.formGroup}>
                    <label htmlFor="date" className={styles.label}>Date:</label>
                    <DatePicker
                        selected={formik.values.date}
                        onChange={date => formik.setFieldValue('date', date)}
                        className={styles.input}
                    />
                </div>

                {/* Service Type Dropdown */}
                <div className={styles.formGroup}>
                    <label htmlFor="service_type" className={styles.label}>Service Type:</label>
                    <select
                        id="service_type"
                        name="service_type"
                        className={styles.select}
                        value={formik.values.service_type}
                        onChange={handleServiceTypeChange}
                    >
                        <option value="grooming">Grooming</option>
                        <option value="treatment">Treatment</option>
                    </select>
                </div>

                {/* Treatment Services Checkboxes */}
                {formik.values.service_type === 'treatment' && treatments && (
                    <div>
                        {treatments.map(treatment => (
                            <div key={treatment._id}>
                                <input
                                    type="checkbox"
                                    name="services"
                                    id={`service_${treatment._id}`}
                                    value={treatment._id}
                                    checked={selectedServices.includes(treatment._id)}
                                    onChange={e => handleServiceChange(treatment._id, e)}
                                    className={styles.checkboxInput}
                                />
                                <label htmlFor={`service_${treatment._id}`}>{treatment.name}</label>
                            </div>
                        ))}
                    </div>
                )}

                {/* Grooming Services Checkboxes */}
                {formik.values.service_type === 'grooming' && grooming && (
                    <div>
                        {grooming.map(service => (
                            <div key={service._id}>
                                <input
                                    type="checkbox"
                                    name="services"
                                    id={`service_${service._id}`}
                                    value={service._id}
                                    checked={selectedServices.includes(service._id)} 
                                    onChange={e => handleServiceChange(service._id, e)}
                                    className={styles.checkboxInput}
                                />
                                <label htmlFor={`service_${service._id}`}>{service.name}</label>
                                
                               

                               
                            </div>
                        ))}

                        {formik.values.service_type === 'grooming' && (
                                    <div className={styles.formGroup}>
                                    <label htmlFor="size" className={styles.label}>Size:</label>
                                    <select
                                    id="size"
                                    name="size"
                                    className={styles.select}
                                    value={chosenSize}
                                    onChange={e => handleSizeChange(e.target.value)}
                                    >
                                        <option value="">Select Size</option>
                                        {petSizes.map(size => (
                                            <option key={size._id} value={size._id}>{size.size}</option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="status" className={styles.label}>Status:</label>
                            <select
                            id="status"
                            name="status"
                            className={styles.select}
                            value={formik.values.status}
                            onChange={e => formik.setFieldValue('status', e.target.value)}
                                >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="declined">Declined</option>
                                <option value="started">In Progress</option>
                                <option value="finished">Finished</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="noShow">No Show</option>
                                <option value="reschedule">Reschedule</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditAppointmentForm;

