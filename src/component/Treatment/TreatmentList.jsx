import { useState } from 'react';
import { useFetchTreatments } from '../../hooks/treatment/useTreatment';
import EditTreatmentForm from './EditTreatmentForm';

const TreatmentList = () => {
  const { data: treatments, isLoading, isError } = useFetchTreatments();
  const [editingTreatmentId, setEditingTreatmentId] = useState(null);

  if (isLoading) return <div>Loading treatments...</div>;
  if (isError) return <div>Error loading treatments.</div>;

  return (
    <div>
      <h2>Treatments</h2>
      <ul>
        {treatments.map(treatment => (
          <li key={treatment._id}>
            {treatment.name} - PHP{treatment.price}
            <p>{treatment.description}</p>
            <button onClick={() => setEditingTreatmentId(treatment._id)}>Edit</button>
            {editingTreatmentId === treatment._id && (
              <EditTreatmentForm 
                initialData={treatment} 
                onSubmitSuccess={() => setEditingTreatmentId(null)} 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreatmentList;
