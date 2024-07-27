import { Card } from '@nextui-org/react';
import axios from 'axios';
import React, { SVGProps } from 'react'; 
import { useParams } from 'react-router-dom';

const UserComponent = () => {


const [user, setUser] = React.useState({
    id: "0001",
    username: "JohnDoe",
    email: "johndoe@example.com",
    password: "Password123",
    dateOfBirth: "01/01/2000",
    cardNumber: "1234567890123456",
});
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
  }, [id]);

  return(<div>
    <Card>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div>{user.cardNumber}</div>
    </Card>
  </div>);

}

  export default UserComponent;