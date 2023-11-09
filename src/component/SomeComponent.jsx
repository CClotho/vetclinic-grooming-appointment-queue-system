import { useAuth } from '../hooks/AuthContext';
export const SomeComponent = () => {
    const { user } = useAuth();
    let result;
    console.log(user);

    if (user) {
       result = <div> GG Authenticated</div>
    } 
    if(!user) {
        result = <div> YOu can't pass from me</div>
    }

    return  result;
     
    
}
