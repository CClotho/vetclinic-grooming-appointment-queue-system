import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreatePet } from '../hooks/usePets';

const validationSchema = Yup.object().shape({
  pet_name: Yup.string().required('Pet name is required'),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
  owner: Yup.string().required('Owner ID is required'),
  pet_photo: Yup.mixed().required('A photo is required')
});

const AddPetForm = () => {
  const createPetMutation = useCreatePet();

  const formik = useFormik({
    initialValues: {
      pet_name: '',
      breed: '',
      gender: '',
      owner: '',
      pet_photo: undefined
    },
    validationSchema,
    onSubmit: (values) => {
      createPetMutation.mutate(values);
    }
  });

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

      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPetForm;
