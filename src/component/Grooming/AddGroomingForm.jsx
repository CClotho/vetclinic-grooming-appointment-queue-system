import { useFormik } from 'formik';
import { useCreateGrooming } from '../../hooks/grooming/useAdminGrooming';
import * as Yup from 'yup';
import styles from '../../assets/styles/modal.module.css'; // Assuming you have CSS module

 const groomingValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    description: Yup.string(),
    availability: Yup.boolean()
});

const GroomingForm = ({onClose}) => {
    const createGroomingMutation = useCreateGrooming();
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            availability: true,
        },
        validationSchema: groomingValidationSchema,
        onSubmit: values => {
            createGroomingMutation.mutate(values); // Use the mutation to create the treatment
            onClose(false)
        },
    });



    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" {...formik.getFieldProps('name')} className={styles.textInput} />
                {formik.touched.name && formik.errors.name ? <div className={styles.error}>{formik.errors.name}</div> : null}
            </div>
            <div >
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" {...formik.getFieldProps('price')} className={styles.numberInput} />
                {formik.touched.price && formik.errors.price ? <div className={styles.error}>{formik.errors.price}</div> : null}
            </div>
            <div >
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" {...formik.getFieldProps('description')} className={styles.textArea}></textarea>
            </div>
            <div>
                <label htmlFor="availability">
                    <input
                        type="checkbox"
                        id="availability"
                        name="availability"
                        checked={formik.values.availability}
                        onChange={formik.handleChange}
                        className={styles.checkboxInput}
                    />
                    Availability
                </label>
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
};

export default GroomingForm;
