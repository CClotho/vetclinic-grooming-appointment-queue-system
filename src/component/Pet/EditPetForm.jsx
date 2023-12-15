

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEditPet } from '../../hooks/pet/useAdminPets';
import styles from '../../assets/styles/component.module.css'; // Import CSS module
import DeletePetButton from './PetDeleteButton';

const EditPetForm = ({ pet, clientId, onClose }) => {
 
  //const { data: fetchedPet, isLoading } = useFetchPet(petId); // Assuming useFetchPet fetches pet data based on petId
  const editPetMutation = useEditPet();



  const formik = useFormik({
    initialValues: {
      _id: pet._id,
      pet_name: pet?.pet_name || '',
      type: pet?.type || '',
      breed: pet?.breed || '',
      gender: pet?.gender || '',
      owner: clientId || '',
      // pet_photo: undefined
    },
    validationSchema: Yup.object().shape({
      pet_name: Yup.string().required('Pet name is required'),
      breed: Yup.string().required('Breed is required'),
      gender: Yup.string().oneOf(['Male', 'Female']).required('Gender is required'),
      owner: Yup.string().required('Owner ID is required'),
      type: Yup.string().required(),
    }),
    onSubmit: (values) => {
     console.log(values)
      editPetMutation.mutate(values);
      onClose(pet)
      
    },
  });



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
      {formik.touched.pet_name && formik.errors.pet_name ? <div>{formik.errors.pet_name}</div> : null}

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
      
      <div className={styles.PetformGroup}>

      <input
        name="breed"
        placeholder="Breed"
        onChange={formik.handleChange}
        value={formik.values.breed}
        onBlur={formik.handleBlur}
        className={styles.Petinput}
      />
      {formik.touched.breed && formik.errors.breed ? <div>{formik.errors.breed}</div> : null}
        
      </div>
      
      <div className={styles.PetformGroup}>

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
     

     

      <button type="submit">Update Pet</button>
      <DeletePetButton petId={pet._id}/>
    </form>
   </div>
  );
};

export default EditPetForm;






/* 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchPet, useEditPet } from '../../hooks/pet/useAdminPets';

const validationSchema = Yup.object().shape({
  pet_name: Yup.string().required('Pet name is required'),
  breed: Yup.string().required('Breed is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Select a valid gender').required('Gender is required'),
  owner: Yup.string().required('Owner ID is required'),
  // Note: We're not validating pet_photo here for simplicity, but you can add if needed
});


const EditPetForm = ({ petId }) => {
  
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

export default EditPetForm; */