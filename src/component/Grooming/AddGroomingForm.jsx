import { useFormik } from 'formik';
import * as Yup from 'yup';

const serviceValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    availability: Yup.string().oneOf(['available', 'unavailable']).required('Availability is required'),
    sizes: Yup.array().of(
        Yup.object({
            size: Yup.string().oneOf(['small', 'medium', 'large', 'extra-large', 'none']).required('Size is required'),
            price: Yup.number().positive('Price must be positive').required('Price is required'),
            details: Yup.string()
        })
    ).required('At least one size detail is required')
});

const GroomingForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            availability: 'available',
            sizes: []
        },
        validationSchema: serviceValidationSchema,
        onSubmit: values => {
            console.log(values);
           
        },
    });

    return (
        <form onSubmit={formik.handleSubmit(e)}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" {...formik.getFieldProps('description')}></textarea>
            </div>
            <div>
                <label>Availability:</label>
                <select name="availability" {...formik.getFieldProps('availability')}>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
                {formik.touched.availability && formik.errors.availability ? <div>{formik.errors.availability}</div> : null}
            </div>
            <div>
                <label>Sizes:</label>
                {formik.values.sizes.map((size, index) => (
                    <div key={index}>
                        <select name={`sizes[${index}].size`} {...formik.getFieldProps(`sizes[${index}].size`)}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra-large">Extra Large</option>
                        </select>
                        <input type="number" name={`sizes[${index}].price`} placeholder="Price" {...formik.getFieldProps(`sizes[${index}].price`)} />
                        <textarea name={`sizes[${index}].details`} placeholder="Details" {...formik.getFieldProps(`sizes[${index}].details`)}></textarea>
                    </div>
                ))}
                <button type="button" onClick={() => formik.setFieldValue('sizes', [...formik.values.sizes, { size: '', price: '', details: '' }])}>Add Size</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default GroomingForm;
