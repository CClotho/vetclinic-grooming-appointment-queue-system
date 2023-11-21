
import { useState, useEffect } from 'react';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import styles from '../../assets/styles/modal.module.css';


export const ClientTreatment = () => {
  const { data: treatments, isLoading, isError } = useFetchTreatments();
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
        {filteredTreatments.map(treatment => (
          <li key={treatment._id} className={styles.treatmentItem}>
          <div className={styles.treatmentName}>
            {treatment.name}
          </div>
          <div className={styles.treatmentPrice}>
            Price: {treatment.price}
          </div>
          <div className={styles.treatmentPrice}>
            Availability:{treatment.availability ? <span className={styles.treatmentAvail}> Available </span> : <span className={styles.treatmentNotAvail}> Not Available</span>}
          </div>
          <p className={styles.treatmentDescription}>{treatment.description}</p>

          </li>
        ))}
      </ol>
    </div>
  );
};

