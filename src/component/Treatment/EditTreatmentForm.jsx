import { useFormik } from 'formik';
import { useEditTreatment } from '../../hooks/treatment/useTreatment';
import { treatmentValidationSchema } from './AddTreatmentForm';
import styles from '../../assets/styles/modal.module.css'; // Assuming you have CSS module
import DeleteTreatmentButton from './DeleteTreatment';
const EditTreatmentForm = ({ initialData, onSubmitSuccess }) => {
  const editTreatmentMutation = useEditTreatment();

  
  
  const formik = useFormik({
    initialValues: {
      _id: initialData?._id || '', // Default to an empty string if null/undefined
      name: initialData?.name || '',
      price: initialData?.price || '',
      description: initialData?.description || '',
      availability: initialData?.availability || false,
  },
    validationSchema: treatmentValidationSchema,
    onSubmit: (values) => {
        editTreatmentMutation.mutate(values, {
          onSuccess: () => {
            if (onSubmitSuccess) onSubmitSuccess();
          }
        });
     },
     
  });

  

  return (
    <form onSubmit={formik.handleSubmit} className={styles.editContainer} >
      <div  className={styles.formGroup}>
        <input type="hidden" name="_id" {...formik.getFieldProps('_id')} />

        <label className={styles.formLabel}>Name:</label>
        <input type="text" name="name" className={styles.textInput}{...formik.getFieldProps('name')} />
        {formik.touched.name && formik.errors.name ? <div className={styles.errorMessage}>{formik.errors.name}</div> : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Price:</label>
        <input type="number" name="price" className={styles.numberInput}{...formik.getFieldProps('price')} />
        {formik.touched.price && formik.errors.price ? <div className={styles.errorMessage} >{formik.errors.price}</div> : null}
      </div>
     
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Description:</label>
        <textarea name="description" className={styles.textArea} {...formik.getFieldProps('description')}></textarea>
        {formik.touched.description && formik.errors.description ? <div className={styles.errorMessage}>{formik.errors.description}</div> : null}
      </div>
     
      <div className={styles.formGroup}>
                <label htmlFor="availability">
                    <input
                        type="checkbox"
                        id="availability"
                        name="availability"
                        checked={formik.values.availability}
                        onChange={formik.handleChange}
                        className={styles.checkbox}
                    />
                    Availability
                </label>
            </div>
      <button type="submit" className={styles.updateTreatmentBtn}>Update Treatment</button>
      <DeleteTreatmentButton id={initialData._id} onDeleteSuccess={onSubmitSuccess} />
      
    </form>
  );
};

export default EditTreatmentForm;
