
import { useState, useEffect } from 'react';
import { useFetchGroomingServices } from '../../hooks/grooming/useGrooming';
import styles from '../../assets/styles/modal.module.css';

export const ClientGrooming = () => {
  const { data: grooming, isLoading, isError } = useFetchGroomingServices();
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
          <li key={grooming ._id} className={styles.treatmentItem}>
          <div className={styles.treatmentName}>
            {grooming .name}
          </div>
          <div className={styles.treatmentPrice}>
            Price: {grooming .price}
          </div>
          <div className={styles.treatmentPrice}>
            Availability:{grooming.availability ? <span className={styles.treatmentAvail}> Available </span> : <span className={styles.treatmentNotAvail}> Not Available</span>}
          </div>
          <p className={styles.treatmentDescription}>{grooming .description}</p>
           
          </li>
        ))}
      </ol>
    </div>
  );
}

