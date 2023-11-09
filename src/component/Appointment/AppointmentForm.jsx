
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateAppointment } from '../../hooks/appointment/useAppointment';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import { useFetchGroomingServices } from '../../hooks/grooming/useGrooming';
import { DateTime } from 'luxon';

import * as Yup from 'yup';

const appointmentValidationSchema = Yup.object({
    client: Yup.string().required('Client is required'),
    pet: Yup.string().required('Pet is required'),
    date: Yup.date(),
    doctor: Yup.string(),
    service_type: Yup.string().oneOf(['grooming', 'treatment']),
    services: Yup.array().min(1, 'At least one service is selected').of(Yup.string()),
    notes: Yup.string(),
    priority: Yup.string().oneOf(['High', 'Low', 'Medium']),
    status: Yup.string().oneOf(['pending', 'approved', 'declined', 'inProgress', 'finished', 'cancelled', 'noShow', 'reschedule']),
});


const AppointmentForm = () => {

    const { data: treatments, isLoading: isLoadingTreatments } = useFetchTreatments();
    const {data: grooming, isLoading} = useFetchGroomingServices();
    const createAppointmentMutation = useCreateAppointment();
    
    const formik = useFormik({
        initialValues: {
            client: '',
            pet: '',
            date: '',
            doctor: '',
            service_type: 'grooming',
            services: [],
          /*   notes: '',
            priority: '',
            status: '', */
        },
        validationSchema: appointmentValidationSchema,
        onSubmit: values => {
            const formattedValues = {
                ...values,
                date: DateTime.fromJSDate(values.date).toISO()
            };
            console.log(values) // original
            console.log(formattedValues);
            createAppointmentMutation.mutate(formattedValues);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Client:</label>
                <input type="text" name="client" {...formik.getFieldProps('client')} />
                {formik.touched.client && formik.errors.client ? <div>{formik.errors.client}</div> : null}
            </div>
            <div>
                <label>Pet:</label>
                <input type="text" name="pet" {...formik.getFieldProps('pet')} />
                {formik.touched.pet && formik.errors.pet ? <div>{formik.errors.pet}</div> : null}
            </div>
            <div>
                <label>Date:</label>
                <DatePicker selected={formik.values.date} onChange={date => formik.setFieldValue('date', date)} />
            </div>
            <div>
                <label>Doctor:</label>
                <input type="text" name="doctor" {...formik.getFieldProps('doctor')} />
            </div>
            <div>
                <label>Service Type:</label>
                <select name="service_type" {...formik.getFieldProps('service_type')}>
                    <option value="grooming">Grooming</option>
                    <option value="treatment">Treatment</option>
                </select>
                {formik.touched.service_type && formik.errors.service_type ? <div>{formik.errors.service_type}</div> : null}
            </div>
            {formik.values.service_type === 'treatment' && !isLoadingTreatments && treatments && (
            <div>
                <label>Services:</label>
                <div>
                    {treatments.map(treatment => (
                        <div key={treatment._id}>
                            <input 
                                type="checkbox" 
                                name="services" 
                                value={treatment._id} 
                                checked={formik.values.services.includes(treatment._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        formik.setFieldValue("services", [...formik.values.services, treatment._id]);
                                    } else {
                                        formik.setFieldValue("services", formik.values.services.filter(id => id !== treatment._id));
                                    }
                                }}
                            />
                            <label>{treatment.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {formik.values.service_type === 'grooming' && !isLoading && grooming && (
        <div>
            <label>Services:</label>
            <div>
                {grooming.map(service => (
                    <div key={service._id}>
                        <input 
                            type="checkbox" 
                            name="services" 
                            value={service._id} 
                            checked={formik.values.services.includes(service._id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    formik.setFieldValue("services", [...formik.values.services, service._id]);
                                } else {
                                    formik.setFieldValue("services", formik.values.services.filter(id => id !== service._id));
                                }
                            }}
                        />
                        <label>{service.name}</label>
                    </div>
                ))}
            </div>
        </div>
        )}


                
           


            
            {/* Add other fields similarly */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default AppointmentForm;
