import { useFormik } from 'formik';
import { useEditTreatment } from '../../hooks/treatment/useTreatment';
import { treatmentValidationSchema } from './AddTreatmentForm';
const EditTreatmentForm = ({ initialData, onSubmitSuccess }) => {
  const editTreatmentMutation = useEditTreatment();

  console.log(initialData._id)
  const formik = useFormik({
    initialValues: {
      _id: initialData._id,
      name: initialData.name,
      price: initialData.price,
      description: initialData.description,
      // ... other fields
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input type="hidden" name="_id" {...formik.getFieldProps('_id')} />

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
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
      </div>
      {/* Add other fields similarly */}
      <button type="submit">Update Treatment</button>
    </form>
  );
};

export default EditTreatmentForm;
