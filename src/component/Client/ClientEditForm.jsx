
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../assets/styles/component.module.css';
import styled from '../../assets/styles/style.module.css'; 
import style from '../../assets/styles/component.module.css';
import { useEditClientInfo } from '../../hooks/clients/useAdminClients';

const ClientEditSchema = Yup.object({
    first_name: Yup.string().required('Required!'),
    last_name: Yup.string().required('Required!'),
    age: Yup.number().required('Required!').min(0, 'Age must be a positive number'),
    phone_number: Yup.string().matches(/^639\d{9}$/, "Phone number is not valid"),
    email: Yup.string().email('Invalid email format').required('Required!')
});



const ClientEditForm = ({ initialData, onClose}) => {
    const editClientMutation = useEditClientInfo();
 
    const formik = useFormik({
        initialValues:{
            _id: initialData._id,
            first_name: initialData?.first_name || '',
            last_name: initialData?.last_name || '',
            username: initialData?.user.username || '',
            age: initialData?.age || '',
            phone_number: initialData?.phone_number || '',
            email: initialData?.email || '',
        },
        validationSchema: ClientEditSchema,
        onSubmit: (values) => {
        
            editClientMutation.mutate(values)
            onClose(false)
         },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label className={styles.label}>First Name:</label>
                <input className={styles.input} name="first_name" {...formik.getFieldProps('first_name')} />
                {formik.touched.first_name && formik.errors.first_name && <div className={style.error}>{formik.errors.first_name}</div>}
            </div>

            <div>
                <label className={styles.label}>Last Name:</label>
                <input className={styles.input} name="last_name" {...formik.getFieldProps('last_name')} />
                {formik.touched.last_name && formik.errors.last_name && <div className={style.error}>{formik.errors.last_name}</div>}
            </div>

            <div>
                <label className={styles.label}>Age:</label>
                <input  className={styles.input}  type="number" name="age" {...formik.getFieldProps('age')} 
                  min="0"
                  max="130"
                  step="1" 
                />
                {formik.touched.age && formik.errors.age && <div className={style.error}>{formik.errors.age}</div>}
            </div>

            <div>
                <label className={styles.label}>Username:</label>
                <input  className={styles.input}  name="username" {...formik.getFieldProps('username')} />
                {formik.touched.username && formik.errors.username && <div className={style.error}>{formik.errors.username}</div>}
            </div>

            <div>
                <label className={styles.label}>Email:</label>
                <input className={styles.input}  type="email" name="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && <div className={style.error}>{formik.errors.email}</div>}
            </div>
            <div>
                <label className={styles.label}>Phone Number:</label>
                <input 
                    className={styles.input} 
                    type="text" 
                    name="phone_number" 
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="+63 9XX XXX XXXX"
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                    <div className={style.red}>{formik.errors.phone_number}</div>
                )}
            </div>
            <button type="submit" className={styled.updateBtn}>Update Client</button>
        </form>
    );
};

export default ClientEditForm;
