import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../assets/styles/component.module.css';
import styled from '../../assets/styles/style.module.css'; //

import { useResetClientPassword } from '../../hooks/clients/useAdminClients';

const ResetPasswordSchema = Yup.object({
    newPassword: Yup.string().required('Required!').min(8, 'Password should be at least 8 characters'),
    confirmNewPassword: Yup.string().required('Required!').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});


const ResetPasswordForm = ({onClose, id}) => {
    
    const resetPasswordMutation = useResetClientPassword();
    
    const formik = useFormik({
        initialValues: {
            _id: id,
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: (values) => {
          console.log(values)

          if (window.confirm("Confirm password")) {
            resetPasswordMutation.mutate(values)
            onClose(false)
        
        }
           
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label className={styles.label}>New Password:</label>
                <input className={styles.input}type="password" name="newPassword" {...formik.getFieldProps('newPassword')} />
                {formik.touched.newPassword && formik.errors.newPassword && <div>{formik.errors.newPassword}</div>}
            </div>

            <div>
                <label className={styles.label}>Confirm New Password:</label>
                <input className={styles.input}type="password" name="confirmNewPassword" {...formik.getFieldProps('confirmNewPassword')} />
                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && <div>{formik.errors.confirmNewPassword}</div>}
            </div>

            <button type="submit" className={styled.clientCloseBtn}>Confirm</button>
            <button type="button" className={styled.clientCloseBtn} onClick={() => onClose(false)}>Cancel</button>
        </form>
    );
};

export default ResetPasswordForm;
