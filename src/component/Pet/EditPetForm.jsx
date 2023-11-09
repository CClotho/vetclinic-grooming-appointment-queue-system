import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchPet, useEditPet } from '../../hooks/usePets';

const validationSchema = Yup.object().shape({
  pet_name: Yup.string().required('Pet name is required'),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
  owner: Yup.string().required('Owner ID is required'),
  // Note: We're not validating pet_photo here for simplicity, but you can add if needed
});

const EditPetForm = ({ petId }) => {
  const { data: pet, isLoading, isError } = useFetchPet(petId);
  const editPetMutation = useEditPet();

  const formik = useFormik({
    initialValues: {
      pet_name: pet?.pet_name || '',
      breed: pet?.breed || '',
      gender: pet?.gender || '',
      owner: pet?.owner || '',
      // pet_photo: undefined (if you want to allow photo editing, handle this separately)
    },
    validationSchema,
    onSubmit: (values) => {
      editPetMutation.mutate({ id: petId, ...values });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading pet details</div>;

  return (
    <form onSubmit={formik.handleSubmit}>
       <input
        name="pet_name"
        placeholder="Pet Name"
        onChange={formik.handleChange}
        value={formik.values.pet_name}
        onBlur={formik.handleBlur}
      />
      {formik.touched.pet_name && formik.errors.pet_name ? <div>{formik.errors.pet_name}</div> : null}

      <input
        name="breed"
        placeholder="Breed"
        onChange={formik.handleChange}
        value={formik.values.breed}
        onBlur={formik.handleBlur}
      />
      {formik.touched.breed && formik.errors.breed ? <div>{formik.errors.breed}</div> : null}

      <select
        name="gender"
        onChange={formik.handleChange}
        value={formik.values.gender}
        onBlur={formik.handleBlur}
      >
        <option value="" label="Select gender" />
        <option value="Male" label="Male" />
        <option value="Female" label="Female" />
      </select>
      {formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}

      <input
        name="owner"
        placeholder="Owner ID"
        onChange={formik.handleChange}
        value={formik.values.owner}
        onBlur={formik.handleBlur}
      />
      {formik.touched.owner && formik.errors.owner ? <div>{formik.errors.owner}</div> : null}

      <input
        type="file"
        name="pet_photo"
        onChange={(event) => {
          formik.setFieldValue('pet_photo', event.currentTarget.files[0]);
        }}
        onBlur={formik.handleBlur}
      />
      {formik.touched.pet_photo && formik.errors.pet_photo ? <div>{formik.errors.pet_photo}</div> : null}

      <button type="submit">Update Pet</button>
    </form>
  );
};

export default EditPetForm;
