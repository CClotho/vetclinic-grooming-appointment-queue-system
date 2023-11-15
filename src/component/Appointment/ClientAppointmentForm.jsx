
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRequestAppointment } from '../../hooks/appointment/useClientAppointment';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import { useFetchGroomingServices, useFetchPetSizes } from '../../hooks/grooming/useGrooming';
import { DateTime } from 'luxon';


import * as Yup from 'yup';
import { useFetchClientPet } from '../../hooks/pet/useClientPets';


const appointmentValidationSchema = Yup.object().shape({
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

const ClientAppointmentForm = () => {

    const { data: treatments, isLoading: isLoadingTreatments } = useFetchTreatments();
    const {data: grooming,  isLoading} = useFetchGroomingServices();
    const {data: petSizes, isLoadingPetSizes } = useFetchPetSizes(); 
    const {data: pets} = useFetchClientPet();
    const requestAppointment = useRequestAppointment();
  

    const formik = useFormik({
        initialValues :{
            pet: '',
            date: null,
            service_type: 'grooming', // Default value
            services: [],
            status: 'pending',
        },
        
        validationSchema: appointmentValidationSchema,
        onSubmit: (values) => {
            // Format the services array according to your backend needs
            const formattedServices = values.services.map(service => ({
                serviceId: service.serviceId,
                serviceType: service.serviceType || values.service_type,
                chosenSize: (service.serviceType === 'grooming') ? service.chosenSize : undefined,
            }));
    
            const formattedValues = {
                ...values,
                date: values.date ? DateTime.fromJSDate(values.date).toISO() : null,
                services: formattedServices
            };
    
            console.log("Formatted Submission Values", formattedValues);
            // Call the mutation or API function to create the appointment
            requestAppointment.mutate(formattedValues);
        },
        
    });
   

    const handleServiceChange = (serviceId, e) => {
        const currentServices = formik.values.services;
    
        if (e.target.checked) {
            // Add the service only if less than 3 services are already selected
            if (currentServices.length < 3) {
                formik.setFieldValue("services", [
                    ...currentServices,
                    { serviceId, serviceType: 'grooming', chosenSize: petSizes[0]?._id || null }
                ]);
            } else {
              
                alert("You can select up to 3 services only.");
            }
        } else {
            // Remove the service if it's unchecked
            formik.setFieldValue("services", 
                currentServices.filter(s => s.serviceId !== serviceId)
            );
        }
    };
    
    
    const handleSizeChange = (serviceId, sizeId) => {
        const updatedServices = formik.values.services.map(service => {
            if (service.serviceId === serviceId) {
                return { ...service, chosenSize: sizeId };
            }
            return service;
        });
    
        formik.setFieldValue("services", updatedServices);
    };

    

    return (
        <form onSubmit={formik.handleSubmit}>
            
            <div>
                <label>Pet:</label>
                <select name="pet" {...formik.getFieldProps('pet')}>
                    <option value="">Select a pet</option>
                    {pets?.map(pet => (
                        <option key={pet._id} value={pet._id}>{pet.pet_name}</option>
                    ))}
                </select>
                {formik.touched.pet && formik.errors.pet ? <div>{formik.errors.pet}</div> : null}
            </div>
            <div>
                <label>Date:</label>
                <DatePicker selected={formik.values.date} onChange={date => formik.setFieldValue('date', date)} />
            </div>
            
            <div>
        <label>Service Type:</label>
        <select name="service_type" {...formik.getFieldProps('service_type')}>
            <option value="grooming">Grooming</option>
            <option value="treatment">Treatment</option>
        </select>
    </div>

    {formik.values.service_type === 'treatment' && !isLoadingTreatments && treatments && (
        <div>
            {/* Render checkboxes for treatments */}
            {treatments.map(treatment => (
                <div key={treatment._id}>
                    <input
                        type="checkbox"
                        name="services"
                        value={treatment._id}
                        checked={formik.values.services.some(s => s.serviceId === treatment._id)}
                        onChange={e => handleServiceChange(treatment._id, e)}
                    />
                    <label>{treatment.name}</label>
                </div>
            ))}
        </div>
    )}

    {formik.values.service_type === 'grooming' && !isLoading && grooming && (
        grooming.map(service => (
            <div key={service._id}>
                <input
                    type="checkbox"
                    name="services"
                    value={service._id}
                    onChange={e => handleServiceChange(service._id, e)}
                />
                <label>{service.name}</label>
                {formik.values.services.some(s => s.serviceId === service._id) && (
                    <select
                        name="size"
                        onChange={e => handleSizeChange(service._id, e.target.value)}
                    >
                        {petSizes ? (
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
        </div>
        ))
    )}



                
           


            
            {/* Add other fields similarly */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default ClientAppointmentForm;
