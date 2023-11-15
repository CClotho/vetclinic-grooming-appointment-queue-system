import Modal from "../../component/Modal";
import GroomingForm from "../../component/Grooming/AddGroomingForm";
import { useState } from "react";

export const AdminGrooming = () => {
    
    const [isGroomingModalOpen, setGroomingModalOpen] = useState(false);
    return(
      <>
          <h1> Grooming Services</h1>

        <div className="container mx-auto mt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setGroomingModalOpen(true)}>
            Open Grooming Form
        </button>
        </div>



        <Modal isOpen={isGroomingModalOpen} onClose={() => setGroomingModalOpen(false)} title="Grooming Service">
            <GroomingForm />
        </Modal>
      
      </>
    )
}