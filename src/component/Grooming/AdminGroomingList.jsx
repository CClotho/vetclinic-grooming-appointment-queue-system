import { useState, useEffect } from 'react';
import { useFetchGroomingServices } from '../../hooks/grooming/useGrooming';

import styles from '../../assets/styles/modal.module.css';
import EditGroomingForm from './EditGroomingForm';

export const GroomingList = ({ showEdit }) => {
  const { data: grooming, isLoading, isError } = useFetchGroomingServices();
  const [editingGroomingId, setEditingGroomingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGrooming, setFilteredGrooming] = useState([]);

    useEffect(() => {
      if (searchTerm === '') {
        setFilteredGrooming(grooming);
      } else {
        setFilteredGrooming(grooming.filter(grooming =>
            grooming.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        ));
      }
    }, [searchTerm, grooming]);

  if (isLoading) return <div>Loading treatments...</div>;
  if (isError) return <div>Error loading treatments.</div>;

  const handleEditClick = groomingId => {
    // If the same service is clicked again, close the editor
    if (editingGroomingId === groomingId) {
      setEditingGroomingId(null);
    } else {
      setEditingGroomingId(groomingId);
    }
  };
  return (
    <div className={styles.treatmentsGrid}>

      <input
        type="text"
        placeholder="Search grooming..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />  
      <h2>Grooming Services</h2>
      <ol className={styles.treatmentContainer}>
        {filteredGrooming?.map(grooming => (
          <li key={grooming._id} className={styles.treatmentItem}>
            {editingGroomingId === grooming._id ? (
              // Show Edit Form
              <EditGroomingForm 
                initialData={grooming} 
                onSubmitSuccess={() => setEditingGroomingId(null)}
              />
            ) : (
              // Show Grooming Details
              <>
                <div className={styles.treatmentName}>{grooming.name}</div>
                <div className={styles.treatmentPrice}>Price: {grooming.price}</div>
                <div className={styles.treatmentPrice}>
                  Availability: {grooming.availability ? <span className={styles.treatmentAvail}> Available </span> : <span className={styles.treatmentNotAvail}> Not Available</span>}
                </div>
                <p className={styles.treatmentDescription}>{grooming.description}</p>
                {showEdit && (
                  <button className={styles.editStyleBtn} onClick={() => handleEditClick(grooming._id)}>Edit</button>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};


