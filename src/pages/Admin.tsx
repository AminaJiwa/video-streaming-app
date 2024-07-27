import React from 'react';
import {Input} from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import "../components/Navbar.css"
import axios from 'axios';

function Admin() {

        const [user, setUser] = React.useState({});
        const { id } = useParams();
    
    
    React.useEffect(() => {
        axios
          .get(`http://localhost:3001/users/${id}`)
          .then((response) => {
            setUser(response.data);
    
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
        <div>
        <div className="pages-body">
        <NavbarComponent toPayments={'/pages/Payments'} toAdmin={'/pages/Admin'} toUser={'/pages/User'} toHome={'/'} to={''} />
        <p>Username: </p>


        </div>
        </div>

    );
}

export default Admin;