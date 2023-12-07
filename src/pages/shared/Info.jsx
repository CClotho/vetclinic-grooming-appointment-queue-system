
import styles from '../../assets/styles/style.module.css';

export const Info = () => {

   
   
    return (

        <>
       

        <div className={styles.infoContainer}>

            <div className={styles.information}>
                <h1>
                    Manaoag Veterinary Clinic & Grooming 
                </h1>

                <p>
                 Clinic Hours: 8am to 10pm (Monday to Sunday)
                    <br />
                 Emergency Cases (24hrs)
                    <br />
                 Home Service (Pangasinan)
                </p>

                <div>
            <span className={styles.detail}>
                <img src="/src/assets/icons/address.png" alt="address" />
                Soriano St.. Poblacion Manaoag, Pangasinan
            </span>

            <span className={styles.detail}>
                <img src="/src/assets/icons/phone.png" alt="phone" />
                    0981 013 3481   
            </span>

            <span className={styles.detail}>
                <img src="/src/assets/icons/email.png" alt="email" />
                    manaoagveterinaryclinic@gmail.com
            </span>

            <span className={styles.detail}>
               
                <a href="https://instagram.com/manaoagvetclinic" target="_blank" rel="noreferrer"> 
                    <img src="/src/assets/icons/instagram.png" alt="instagram" />
                </a>
         
                
               
            </span>

            <span className={styles.detail}>
                <a href="https://www.facebook.com/manaoagvets/" target="_blank" rel="noopener noreferrer">
                    <img src="/src/assets/icons/fb.png" alt="facebook" />
                </a>
            </span>


           </div>
                
           </div>

           

            
        

           
        </div>

          <div className={styles.imageContainer}>

            <div>
                <img src="/src/assets/images/Pet1.png" alt="pet1"/>
            </div>

            <div>
                <img src="/src/assets/images/Pet2.png" alt="pet2"/>
            </div>

            <div>
                <img src="/src/assets/images/Pet3.png" alt="pet3"/>
            </div>

            <div>
                <img src="/src/assets/images/Pet4.png" alt="pet4"/>
            </div>

            <div>
                <img src="/src/assets/images/Pet5.jpg" alt="pet5"/>
            </div>

            <div>
                <img src="/src/assets/images/Pet6.jpg" alt="pet6"/>
            </div>




        </div>
        </>
       
    )
   
}