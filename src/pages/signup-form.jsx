import { useFormik } from "formik";
import * as Yup from 'yup';
import style from '../assets/styles/style.module.css';
import { signup } from "../hooks/users/useSignup";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import styles from  './../assets/styles/sign_up_form.module.css';

const SignupForm = () => {
    const {user, isAuthenticated} = useAuth();
    // ADD  CONTACT_NUMBER INPUT FOR MONGODB CLIENT SCHEMA atm it was set to not required but should be required
    //const navigate = useNavigate();

   
     //Initialize yup Validation object since formik accepts a yupSchema for formik values validation
    const validationSchema = Yup.object({
        first_name: Yup.string().required('Required!'),
        last_name: Yup.string().required('Required!'),
        age: Yup.number().required('Required!').min(0, 'Age must be a positive number'),
        username: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid email format').required('Required!'),
        phone_number: Yup.string()
        .matches(/^639\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),
        password: Yup.string().required('Required!').min(8, 'Password should be at least 8 characters'),
        confirm_password: Yup.string().required('Required!').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

        // this is an object property of our formik so we can access it by
        // formik.values.propertyName (initialValues is equivalent to values)
        const formik = useFormik({ 
            initialValues: {
            first_name: '',
            last_name: '',
            age: '',
            username: '',
            phone_number: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                const response = await signup(values);

                console.log('Full response:', response);
                console.log("Status Reponses:", response.status)
                if (response.status === 200) {
                    console.log(response.data);
                }
            
            } catch (error) {
                if (error.response && error.response.status === 422 && error.response.data.errors) {
                    // Access the errors here
                    const errorsFromBackend = error.response.data.errors;
                    console.log(errorsFromBackend);
                    
                    
                    // If you want to display specific errors
                    let formikErrors = {};
                    errorsFromBackend.forEach(err => {
                        
                        if (err.username) {
                            formikErrors.username = err.username;
                        }
                        if (err.email) {
                            formikErrors.email = err.email;
                        }
                        
                });
                formik.setErrors(formikErrors);
                }
                else {
                    console.error("There was an error signing you up:", error); 
                }
               
            }

            
        }
    });

 
    

    return (
       <>
        
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

            <div>
                <label className={styles.label}>Password:</label>
                <input  className={styles.input}  type="password" name="password" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password && <div className={style.error}>{formik.errors.password}</div>}
            </div>

            <div>
                <label className={styles.label}>Confirm Password:</label>
                <input className={styles.input} type="password" name="confirm_password" {...formik.getFieldProps('confirm_password')} />
                {formik.touched.confirm_password && formik.errors.confirm_password && <div className={style.error}>{formik.errors.confirm_password}</div>}
            </div>

            <button className={styles.signUpBtn}type="submit">Sign Up</button>
        </form>
       </>
    );
}
export default SignupForm;








































