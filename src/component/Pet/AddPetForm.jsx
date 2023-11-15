import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreatePet } from '../../hooks/pet/useAdminPets';
import { useState } from 'react';
const validationSchema = Yup.object().shape({
  pet_name: Yup.string().required('Pet name is required'),
  type: Yup.string().oneOf(['dog', 'cat', 'rabbit', 'bird', 'parrot', 'hamster'], 'Invalid type').required('Pet type is required'),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
  owner: Yup.string().required('Owner ID is required'),
  pet_photo: Yup.mixed().required('A photo is required')
});

const AddPetForm = () => {
  const createPetMutation = useCreatePet();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  
  const formik = useFormik({
    initialValues: {
      pet_name: '',
      type: '',
      breed: '',
      gender: '',
      owner: '',
      pet_photo: undefined
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'pet_photo') {
          // Append the file object
          formData.append(key, values[key]);
        } else {
          // Append other values as strings
          formData.append(key, values[key]);
        }
      });
    
      createPetMutation.mutate(formData);
    }
  });

  const handleImageChange = (event) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      console.log('Selected file:', file); 
      formik.setFieldValue('pet_photo', file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the file
    }
  };

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
                name="pet_name"
                placeholder="Pet Name"
                onChange={formik.handleChange}
                value={formik.values.pet_name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pet_name && formik.errors.pet_name ? <div>{formik.errors.pet_name}</div> : null}

          </div>
          <div>
            <select
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              onBlur={formik.handleBlur}
              >
              <option value="" label="Select pet type" disabled/>
              <option value="dog" label="Dog" />
              <option value="cat" label="Cat" />
              <option value="rabbit" label="Rabbit" />
              <option value="bird" label="Bird" />
              <option value="parrot" label="Parrot" />
              <option value="hamster" label="Hamster" />
          </select>
          {formik.touched.type && formik.errors.type ? <div>{formik.errors.type}</div> : null}

          </div>
          <div>
            <input
              name="breed"
              placeholder="Breed"
              onChange={formik.handleChange}
              value={formik.values.breed}
              onBlur={formik.handleBlur}
            />
            {formik.touched.breed && formik.errors.breed ? <div>{formik.errors.breed}</div> : null}
          </div>

        <div>
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

        </div>
        <div>
          <input
            name="owner"
            placeholder="Owner ID"
            onChange={formik.handleChange}
            value={formik.values.owner}
            onBlur={formik.handleBlur}
          />
          {formik.touched.owner && formik.errors.owner ? <div>{formik.errors.owner}</div> : null}
        </div>

        <div>
          <input
            type="file"
            name="pet_photo"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pet_photo && formik.errors.pet_photo ? <div>{formik.errors.pet_photo}</div> : null}

            {/* Image preview */}
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Pet Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        </div>

        <button type="submit">Add Pet</button>
      </form>
    
      </div>
  );
};

export default AddPetForm;
