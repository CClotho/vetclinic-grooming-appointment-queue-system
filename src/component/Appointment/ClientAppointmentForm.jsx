
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRequestAppointment } from '../../hooks/appointment/useClientAppointment';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import { useFetchGroomingServices, useFetchPetSizes } from '../../hooks/grooming/useGrooming';
import { DateTime } from 'luxon';
import * as Yup from 'yup';
import { useFetchClientPet } from '../../hooks/pet/useClientPets';
import styles from '../../assets/styles/component.module.css';
import { useState } from 'react';

const appointmentValidationSchema = Yup.object().shape({
    pet: Yup.string().required('Pet is required'),
    date: Yup.date().required('Date is required').nullable(),
    service_type: Yup.string().oneOf(['grooming', 'treatment'], 'Invalid service type').required(),
    services: Yup.array().of(Yup.string().required('Service is required')).required('At least one service is required'),
    size: Yup.string().when('service_type', (service_type, schema) => {
        return service_type === 'grooming' ? schema.required('Size is required for grooming services') : schema.nullable();
      }),
      
    status: Yup.string().oneOf(['pending', 'approved', 'declined', 'inProgress', 'finished', 'cancelled', 'noShow', 'reschedule'], 'Invalid status').required()
});

const ClientAppointmentForm = () => {

    const { data: treatments, isLoading: isLoadingTreatments } = useFetchTreatments();
    const {data: grooming,  isLoading} = useFetchGroomingServices();
    const {data: petSizes, isLoadingPetSizes } = useFetchPetSizes(); 
    const {data: pets, isLoading: isPetLoading} = useFetchClientPet();
    const [selectedPet, setSelectedPet] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    console.log(pets)

    const requestAppointment = useRequestAppointment();
  

    const formik = useFormik({
        initialValues :{
            pet: '',
            date: null,
            service_type: 'grooming', // Default value
            services: [],
            status: 'pending',
            size: '',
        },
        
        validationSchema: appointmentValidationSchema,
        onSubmit: (values) => {
            // Format the services array according to your backend needs
           
            const formattedValues = {
                ...values,
                date: values.date ? DateTime.fromJSDate(values.date).toISO() : null,
    
            };
    
            console.log("Formatted Submission Values", formattedValues);
            // Call the mutation or API function to create the appointment
            requestAppointment.mutate(formattedValues);
            
            formik.resetForm();
            setShowPopup(true);

            setTimeout(() => setShowPopup(false), 3000);
        },
        
    });
   
    const getSelectedPetDetails = () => {
    
        return pets.find(p => p._id === selectedPet) || {};
    }
    const handlePetChange = (event) => {
        const petId = event.target.value;
        setSelectedPet(petId);
        formik.setFieldValue('pet', petId);
    };

    
   

    const handleServiceChange = (serviceId, e) => {
        const currentServices = formik.values.services;
        const MAX_SERVICES = 5;
    
        if (e.target.checked) {
            
            if (currentServices.length < MAX_SERVICES) {
                formik.setFieldValue("services", [...currentServices, serviceId]);
            } else {
                
                e.preventDefault();
               
                alert(`You can select up to ${MAX_SERVICES} services only.`);
            }
        } else {
            // Remove the service if it's unchecked
            formik.setFieldValue("services", currentServices.filter(s => s !== serviceId));
        }
    };
    
    
    

    

    return (
        <div className={styles.appointmentFormCard}>
             <form onSubmit={formik.handleSubmit}>
            
            <div className={styles.formGroup}>
                        
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Pet:</label>
                        <select name="pet" value={formik.values.pet}  className={styles.select} onChange={handlePetChange}>
                            <option value="">Select a pet</option>
                            {!isPetLoading && pets?.map(pet => (
                                <option key={pet._id} value={pet._id}>{pet.pet_name}</option>
                            ))}
                        </select>
                        {formik.touched.pet && formik.errors.pet ? <div>{formik.errors.pet}</div> : null}
                    </div>
                    
                    
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
                    <div>
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
                {formik.values.service_type === 'grooming' && grooming && (
                    <div>
                        {grooming.map(service => (
                            <div key={service._id}>
                                <input
                                    type="checkbox"
                                    name="services"
                                    id={`service_${service._id}`}
                                    value={service._id}
                                    onChange={e => handleServiceChange(service._id, e)}
                                    className={styles.checkboxInput}
                                />
                                <label htmlFor={`service_${service._id}`}>{service.name}</label>
                                
                               
                            </div>
                        ))}
                    </div>
                )}

                {formik.values.service_type === 'grooming' && petSizes && (
                    <select 
                        className={styles.select}
                        name="size"
                        onChange={formik.handleChange}
                        value={formik.values.size} 
                    >
                        <option value="" disabled selected>Select a size</option>
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
            {showPopup && <div className="popup">Successfully created an appointment!</div>}
            
        </div>
       
    );
};

export default ClientAppointmentForm;
