import TreatmentList from "../../component/Treatment/AdminTreatment";
import TreatmentForm from "../../component/Treatment/AddTreatmentForm";
import Modal from "../../component/Modal";
import { useState } from "react";
import styles from '../../assets/styles/style.module.css';

export const AdminTreatment = () => {
    const [isTreatmentModalOpen, setTreatmentModalOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false); // State to toggle edit buttons

    return (
        <>
            <button className={`${styles.openFormButton}`} onClick={() => setTreatmentModalOpen(true)}>
                Open Treatment Form
            </button>
            
            <button className={`${styles.toggleEditButton}`} onClick={() => setShowEdit(!showEdit)}>
                {showEdit ? 'Hide' : 'Show'} Edit Buttons
            </button>

            <Modal isOpen={isTreatmentModalOpen} onClose={() => setTreatmentModalOpen(false)} title="Treatment Service">
                <TreatmentForm onClose={setTreatmentModalOpen}/>
            </Modal>

            {/* Pass showEdit to TreatmentList to control the display of edit buttons */}
            <TreatmentList showEdit={showEdit} />
        </>
    );
};

export default AdminTreatment;
