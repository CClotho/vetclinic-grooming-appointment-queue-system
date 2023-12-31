
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateAppointment } from '../../hooks/appointment/useAdminAppointment';
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
    services: Yup.array().of(Yup.string().required('Service is required')).required('At least one service is required'),
    size: Yup.string().when('service_type', (service_type, schema) => {
        return service_type === 'grooming' ? schema.required('Size is required for grooming services') : schema.nullable();
      }),
    status: Yup.string().oneOf(['pending', 'approved', 'declined', 'inProgress', 'finished', 'cancelled', 'noShow', 'reschedule'], 'Invalid status').required()
});

const EditAppointmentForm = ({appointment, onSubmit}) => {

    const { data: treatments, isLoading: isLoadingTreatments } = useFetchTreatments();
    const {data: grooming,  isLoading} = useFetchGroomingServices();
    const {data: petSizes } = useFetchPetSizes(); // use this to display reference for the size  because in form selecting size will only state "medium" etc this will show medium - A big fur etc
    const {data: clientInformation} = useFetchClientsInfo();
    const createAppointmentMutation = useCreateAppointment();

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPet, setSelectedPet] = useState('');

   
    console.log(appointment)
    console.log(treatments)

    const formik = useFormik({
        initialValues: {
            client: appointment.client._id || '',
            pet: appointment.pet._id || '',
            date: appointment.date ? new Date(appointment.date) : null,
            service_type: appointment.service_type || 'grooming',
            services: appointment.services?.map(service => service._id) || [],
            status: appointment.status || 'pending',
            size: appointment.size ? petSizes.find(s => s.size === appointment.size.size)?._id || '' : '',

        },
        validationSchema: appointmentValidationSchema,
        onSubmit: (values) => {
          
           

              const formattedValues = {
                ...values,
                date: values.date ? DateTime.fromJSDate(values.date).toISO() : null,
                // Convert services back to the format expected by your API if necessary
            };
            // Log the values or send them to your API
            console.log("Formatted Submission Values", formattedValues);
            onSubmit(appointment._id, formattedValues); // Replace with your actual API call
        },
        enableReinitialize: true, // This will reset the form when the `appointment` prop changes
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
    
   

 /*    const handleServiceChange = (serviceId, e) => {
        const currentServices = formik.values.services;
    
        if (e.target.checked) {
            // Add the service only if less than 3 services are already selected
            if (currentServices.length < 3) {
                formik.setFieldValue("services", [
                    ...currentServices,
                    { serviceId, serviceType: 'grooming', chosenSize: petSizes[0]?._id || null }
                ]);
            } else {
                // Optionally, you can provide feedback to the user here
                alert("You can select up to 3 services only.");
            }
        } else {
            // Remove the service if it's unchecked
            formik.setFieldValue("services", 
                currentServices.filter(s => s.serviceId !== serviceId)
            );
        }
    };
     */

  
      const handleServiceChange = (serviceId, e) => {
        const isChecked = e.target.checked;
        let newServices = [...formik.values.services];
      
        if (isChecked && !newServices.includes(serviceId)) {
          // Add the service ID
          newServices.push(serviceId);
        } else if (!isChecked) {
          // Remove the service ID
          newServices = newServices.filter(id => id !== serviceId);
        }
      
        formik.setFieldValue('services', newServices);
      };

      
      
    
    
      // If serviceId is an object in your state
     
    
   
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
                        onChange={e => formik.setFieldValue('service_type', e.target.value)}
                    >
                        <option value="grooming">Grooming</option>
                        <option value="treatment">Treatment</option>
                    </select>
                </div>

                {/* Treatment Services Checkboxes */}
                {formik.values.service_type === 'treatment' && treatments && (
                    <div className={styles.checkboxGroup}>
                        {treatments.map(treatment => (
                        <div key={treatment._id}>
                            <input
                            type="checkbox"
                            name="services"
                            id={`service_${treatment._id}`}
                            value={treatment._id}
                            checked={formik.values.services.includes(treatment._id)}
                            onChange={e => handleServiceChange(treatment._id, e)}
                            className={styles.checkboxInput}
                            />
                            <label htmlFor={`service_${treatment._id}`}>{treatment.name}</label>
                        </div>
                        ))}
                    </div>
                )}

                {/* Grooming Services Checkboxes */}
                {formik.values.service_type === 'grooming' && grooming.map(service => (
                   
                    console.log(formik.values.services.some(s=> s._id === service._id)),
                    console.log(formik.values.services),
                    <div key={service._id}>
                        <input
                        type="checkbox"
                        name="services"
                        id={`service_${service._id}`}
                        value={service._id}
                        checked={formik.values.services.includes(service._id)}

                        onChange={e => handleServiceChange(service._id, e)}
                        className={styles.checkboxInput}
                        />
                        <label htmlFor={`service_${service._id}`}>{service.name}</label>
                       
                    </div>
                    ))}

                {formik.values.service_type === 'grooming' && petSizes && (
                <select 
                    className={styles.select}
                    name="size"
                    onChange={formik.handleChange}
                    // Set the value of the select to the selected size's _id from Formik's state
                    value={formik.values.size}
                >
                    <option value="" disabled>Select a size</option>
                    {petSizes.length > 0 ? (
                    Array.isArray(petSizes) ? (
                        petSizes.map(size => (
                        <option key={size._id} value={size._id}>{size.size}</option>
                        ))
                    ) : (
                        <option value={petSizes._id}>{petSizes.size}</option>
                    )
                    ) : (
                    <option>Loading sizes...</option> // Placeholder for when petSizes is loading or undefined
                    )}
                </select>
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

