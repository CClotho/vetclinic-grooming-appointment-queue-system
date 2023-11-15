import TreatmentList from "../../component/Treatment/TreatmentList"
import TreatmentForm from "../../component/Treatment/AddTreatmentForm";
import Modal from "../../component/Modal";
import { useState } from "react";
import styles from '../../assets/styles/style.module.css';
export const AdminTreatment = () => {

    const [isTreatmentModalOpen, setTreatmentModalOpen] = useState(false);

    return (
        <>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => setTreatmentModalOpen(true)}>
                Open Treatment Form
            </button>
            <Modal isOpen={isTreatmentModalOpen} onClose={() => setTreatmentModalOpen(false)} title="Treatment Service">
                <TreatmentForm />
            </Modal>


            {/*Search filter  */}
            <TreatmentList/>
            
        </>
    )
}