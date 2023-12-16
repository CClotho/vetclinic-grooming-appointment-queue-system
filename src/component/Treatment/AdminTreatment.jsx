import { useState, useEffect } from 'react';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import EditTreatmentForm from './EditTreatmentForm';
import styles from '../../assets/styles/modal.module.css';

const TreatmentList = ({ showEdit }) => {
  const { data: treatments, isLoading, isError } = useFetchTreatments();
  const [editingTreatmentId, setEditingTreatmentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTreatments, setFilteredTreatments] = useState([]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTreatments(treatments);
    } else {
      setFilteredTreatments(treatments.filter(treatment =>
        treatment.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ));
    }
  }, [searchTerm, treatments]);

  const handleEditClick = treatmentId => {
    // Toggle editing state
    if (editingTreatmentId === treatmentId) {
      setEditingTreatmentId(null);
    } else {
      setEditingTreatmentId(treatmentId);
    }
  };

  if (isLoading) return <div>Loading treatments...</div>;
  if (isError) return <div>Error loading treatments.</div>;
  return (
    <div className={styles.treatmentsGrid}>
      <input
        type="text"
        placeholder="Search treatments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />  
      <h2>Treatments</h2>
      <ol className={styles.treatmentContainer}>
        {filteredTreatments?.map(treatment => (
          <li key={treatment._id} className={styles.treatmentItem}>
            {editingTreatmentId === treatment._id ? (
              // Show Edit Form
              <EditTreatmentForm 
                initialData={treatment} 
                onSubmitSuccess={() => setEditingTreatmentId(null)}
              />
            ) : (
            
              <>
                <div className={styles.treatmentName}>{treatment.name}</div>
                <div className={styles.treatmentPrice}>Price: {treatment.price}</div>
                <div className={styles.treatmentPrice}>
                  Availability: {treatment.availability ? <span className={styles.treatmentAvail}>Available</span> : <span className={styles.treatmentNotAvail}>Not Available</span>}
                </div>
                <p className={styles.treatmentDescription}>{treatment.description}</p>
                {showEdit && (
                  <button className={styles.editStyleBtn} onClick={() => handleEditClick(treatment._id)}>Edit</button>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TreatmentList;
