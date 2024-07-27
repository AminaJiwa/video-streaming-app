import React from 'react';
import {Button, Card, CardBody, Input} from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import "../components/Navbar.css"
import axios from 'axios';
import UserComponent from '../components/UserComponent';


function Admin() {

        const [user, setUser] = React.useState([1]);
        const [cardNumber, setCardNumber] = React.useState(false);
        const { id } = useParams();

        React.useEffect(() => {
            axios
              .get(`http://localhost:3001/users`)
              .then((response) => {
                setUser(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }, []);

        // Filter users with card numbers
        // const usersWithCardNumbers = user.filter((u) => u.cardNumber);
    

    return (
        <div>
        <div className="pages-body">
        <NavbarComponent toPayments={'/pages/Payments'} toAdmin={'/pages/Admin'} toUser={'/pages/User'} toHome={'/'} to={''} />
        <br></br>
        <Button className="admin-button" onClick={() => setCardNumber(true)}>View users with credit card number</Button>
        <br></br>
        <Button className="admin-button" onClick={() => setCardNumber(false)}>View users without credit card number</Button>
        <br></br>
        <Card className="card-admin">
            <CardBody>
            {/* All Users   */}
            {user.map(( key: number) => {
                        //map through list and return for each element a list on screen
                        return <UserComponent key={key} />;
                    })}

            {/* Users that may or may not have a credit card registered */}
            {/* {cardNumber
              ? usersWithCardNumbers.map((user) => (
                  <UserComponent key={user.id} user={user} />
                ))
              : user.map((user) => (
                  <UserComponent key={user.id} user={user} />
                ))} */}
            </CardBody>
        </Card>

        </div>
        </div>

    );
}

export default Admin;