import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreatePet } from '../../hooks/pet/useAdminPets';
import { useState } from 'react';
import styles from '../../assets/styles/component.module.css'; // Import CSS module
import { useFetchClientsInfo } from '../../hooks/clients/useAdminClients';

const validationSchema = Yup.object().shape({
  pet_name: Yup.string().required('Pet name is required'),
  type: Yup.string().oneOf(['dog', 'cat', 'rabbit', 'bird', 'parrot', 'hamster'], 'Invalid type').required('Pet type is required').required(),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
  owner: Yup.string().required('Owner ID is required'),
  //pet_photo: Yup.mixed().required('A photo is required')
});

const AddPetForm = () => {
  const createPetMutation = useCreatePet();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const {data: clientInformation} = useFetchClientsInfo();
  
  const formik = useFormik({
    initialValues: {
      pet_name: '',
      type: '',
      breed: '',
      gender: '',
      owner: '',
     // pet_photo: undefined
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
    },
    

    

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
    <div className={styles.PetformContainer}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.PetformGroup}>
          <label htmlFor="pet_name" className={styles.Petlabel}>Pet Name</label>
            <input
                name="pet_name"
                placeholder="Pet Name"
                onChange={formik.handleChange}
                value={formik.values.pet_name}
                onBlur={formik.handleBlur}
                className={styles.Petinput}
                
              />
              {formik.touched.pet_name && formik.errors.pet_name ? <div className={styles.Peterror}>{formik.errors.pet_name}</div> : null}

          </div>
          <div className={styles.PetformGroup}>
            
            <select
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              onBlur={formik.handleBlur}
              className={styles.Petselect}
              >
              <option value="" label="Select pet type" disabled/>
              <option value="Dog" label="Dog" />
              <option value="Cat" label="Cat" />
              <option value="Rabbit" label="Rabbit" />
              <option value="Bird" label="Bird" />
              <option value="Parrot" label="Parrot" />
              <option value="Hamster" label="Hamster" />
          </select>
          {formik.touched.type && formik.errors.type ? <div className={styles.Peterror}>{formik.errors.type}</div> : null}

          </div>
                {/* Breed Input */}
        <div className={styles.PetformGroup}>
          <input
            name="breed"
            placeholder="Breed"
            onChange={formik.handleChange}
            value={formik.values.Petbreed}
            onBlur={formik.handleBlur}
            className={styles.Petinput}
          />
          {formik.touched.breed && formik.errors.breed && (
            <div className={styles.Peterror}>{formik.errors.breed}</div>
          )}
        </div>

        {/* Gender Select */}
        <div className={styles.PetformGroup}>
          <select
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
            onBlur={formik.handleBlur}
            className={styles.Petselect}
          >
            <option value="" label="Select gender" />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className={styles.Peterror}>{formik.errors.gender}</div>
          )}
        </div>
        
       {/* Owner ID Input */}
        <div className={styles.PetformGroup}>
          <label htmlFor="owner" className={styles.Petlabel}>Client:</label>
          <select
                name="owner"
                placeholder="Owner ID"
                onChange={formik.handleChange}
                value={formik.values.owner}
                onBlur={formik.handleBlur}
                className={styles.Petselect}
                >
                {clientInformation?.map(client => (
                  <option key={client._id} value={client._id}>{client.first_name} {client.last_name}</option>
                  ))}
            </select>
              {formik.touched.owner && formik.errors.owner && <div className={styles.Peterror}>{formik.errors.client}</div>}
          </div>     
                

      
        <div className={styles.PetformGroup}>
        <label htmlFor="pet_photo" className={styles.Petlabel}>Pet Photo</label>
          <input
            type="file"
            name="pet_photo"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            className={styles.PetfileInput}
          />
          {formik.touched.pet_photo && formik.errors.pet_photo ? <div className={styles.Peterror}>{formik.errors.pet_photo}</div> : null}

            {/* Image preview */}
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Pet Preview" className={styles.PetimagePreview} />}
        </div>

        <button type="submit" className={styles.Petbutton}>Add Pet</button>
      </form>

      <div className='ValidationErrors'>

        </div>
    
      </div>
  );
};

export default AddPetForm;
