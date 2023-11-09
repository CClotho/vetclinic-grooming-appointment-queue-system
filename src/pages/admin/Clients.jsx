import { Outlet, Link } from "react-router-dom"

export const ClientPage = () => {

    return(
       <>
        <h1> Client List</h1>
        <h2><Link to="/register"> Add New Client</Link></h2>

        <div>
            <Outlet/>
        </div>
       </>
    )
}