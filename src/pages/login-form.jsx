import{ useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { login } from '../hooks/users/useLogin';
import { Navigate } from 'react-router-dom';
import styled from  './../assets/styles/form.module.css';


const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

function LoginForm() {

    const {setUser, setAuthenticated} = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                if (response.status === 200) {
                    setUser(response.data)
                    setAuthenticated(true)
                
                    console.log(response)
                    console.log('Successfully logged in!');
                    navigate('/')
                    
                }
            } catch (error) {
                console.error('Error logging in:', error);
                console.log('Error in logging in:', error?.response?.data?.error)
            }
        },
    });
    
  
    return (
        <form onSubmit={formik.handleSubmit} className={styled.form}>
            <div>
                <label className={styled.label}>Username</label>
                <input
                    type="text"
                    name="username"
                    className={styled.input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
            </div>
            <div>
                <label className={styled.label}> Password</label>
                <input
                    className={styled.input}
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <button type="submit" className={styled.loginBtn}>Login</button>
            
        </form>
    );
}

export default LoginForm;
