import Modal from "../../component/Modal";
import GroomingForm from "../../component/Grooming/AddGroomingForm";
import { GroomingList } from "../../component/Grooming/AdminGroomingList";// Assuming you have CSS module
import styles from '../../assets/styles/style.module.css';
import { useState } from "react";


export const AdminGrooming = () => {
  const [isGroomingModalOpen, setGroomingModalOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false); // State to toggle edit buttons

    return (
        <>
            <button className={`${styles.openFormButton}`} onClick={() => setGroomingModalOpen(true)}>
                Open Grooming Form
            </button>
            
            <button className={`${styles.toggleEditButton}`} onClick={() => setShowEdit(!showEdit)}>
                {showEdit ? 'Hide' : 'Show'} Edit Buttons
            </button>

            <Modal isOpen={isGroomingModalOpen} onClose={() => setGroomingModalOpen(false)} title="Grooming Service">
                <GroomingForm />
            </Modal>

            {/* Pass showEdit to TreatmentList to control the display of edit buttons */}
             <GroomingList showEdit={showEdit} />
        </>
    );
}