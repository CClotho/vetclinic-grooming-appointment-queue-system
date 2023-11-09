
import { useFormik } from 'formik';
import { useCreateTreatment } from '../../hooks/treatment/useTreatment'
import * as Yup from 'yup';

export const treatmentValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    description: Yup.string()
});

const TreatmentForm = () => {

    const createTreatmentMutation = useCreateTreatment();
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: ''
        },
        validationSchema: treatmentValidationSchema,
        onSubmit: values => {
            createTreatmentMutation.mutate(values); // Use the mutation to create the treatment
        },


    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" {...formik.getFieldProps('price')} />
                {formik.touched.price && formik.errors.price ? <div>{formik.errors.price}</div> : null}
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" {...formik.getFieldProps('description')}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TreatmentForm;
