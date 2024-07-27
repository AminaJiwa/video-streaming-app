import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import "../components/Navbar.css"
import {Button, Input} from "@nextui-org/react";
import axios from "axios";

function User() {

    const[usernameValue, setUsernameValue] = React.useState("");
    const[passwordValue, setPasswordValue] = React.useState("");
    const[emailValue, setEmailValue] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState("");
    const[cardValue, setCardValue] = React.useState("");


    //Convert date string to ISO8601 format
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = (event.target.value);
        setSelectedDate(dateValue);
        
      };

    //Check username with regex to be alphanumeric and no spaces
    const validateUsername = (usernameValue: string): boolean => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(usernameValue);

    }
    const isUsernameInvalid = React.useMemo(() => {
        if (usernameValue === "") return false;
        return !validateUsername(usernameValue);
    }, [usernameValue]);

    //Check password with regex for min 8 characters, min 1 uppercase character, min 1 number
    const validatePassword = (passwordValue: string): boolean => {
        //upper case (?=.*[A-Z]) one digit (?=.*\d) min 8 characters .{8,}
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(passwordValue);

    }
    const isPasswordInvalid = React.useMemo(() => {
        if (passwordValue === "") return false;
        return !validatePassword(passwordValue);
    }, [passwordValue]);

    //Check email with regex email validation
    const validateEmail = (emailValue: string) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;
    
        return validateEmail(emailValue) ? false : true;
      }, [emailValue]);

    //Check card number with regex validation
    const validateCard = (cardValue: string): boolean => {
        const regex = /^\d{16}$/;
        return regex.test(cardValue);
    }
    const isCardInvalid = React.useMemo(() => {
        if (cardValue === "") return false;
        return !validateCard(cardValue);
    }, [cardValue])

    //Handle Submit
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //Change date into ISO 8601 format
        const [day, month, year] = selectedDate.split("/").map(Number);
        //Months in JavaScript's Date object are 0-indexed (January is 0, February is 1, etc.)
        let isoDate = new Date(year, month - 1, day);

        setSelectedDate(isoDate.toLocaleDateString());

         // Construct the request body
        const requestBody = {
            username: usernameValue,
            password: passwordValue,
            email: emailValue,
            birthDate: selectedDate, 
            creditCard: cardValue,
        };

        try{
            const response = await axios.post("/users", requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            if (response.status === 201) {
                console.log('Data sent successfully.');

                //Clear input form
                setUsernameValue("");
                setEmailValue("");
                setPasswordValue("");
                setSelectedDate("");
                setCardValue("");
                
            } else {
                console.error("Error sending data:", response.statusText);
            }
        } 
        catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
    <div>
        <div className="pages-body">
        <NavbarComponent toPayments={'/pages/Payments'} toAdmin={'/pages/Admin'} toUser={'/pages/User'} toHome={'/'} to={''} />

        <h2 className='h2-pages'>Sign up now for your free 15-day trial</h2>

        
        <form onSubmit={handleSubmit} className="form-user">
        <Input
            value={usernameValue}
            type="text"
            label="Username"
            variant="bordered"
            isInvalid={isUsernameInvalid}
            isRequired
            color={isUsernameInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid username"
            onValueChange={setUsernameValue}
            className="required"
        />
        <p className="description-form">Your username should contain one or more letters or numbers, and no spaces.</p>

        <Input
            value={passwordValue}
            type="password"
            label="Password"
            variant="bordered"
            isRequired
            isInvalid={isPasswordInvalid}
            color={isPasswordInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid password"
            onValueChange={setPasswordValue}
            className="required"
        />
        <p className="description-form">Your password should have at least 8 characters, with at 1 uppercase letter and number.</p>

        <Input
            value={emailValue}
            type="email"
            label="Email"
            variant="bordered"
            isRequired
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid email"
            onValueChange={setEmailValue}
            className="required"
        />
        <br></br>
        <Input
            isRequired
            label="Birth Date"
            className="date-input required"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
        
        />

        <br></br>
        <Input
            value={cardValue}
            type="text"
            label="Credit card number"
            variant="bordered"
            isInvalid={isCardInvalid}
            color={isCardInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid credit card number"
            onValueChange={setCardValue}
            className="max-w-xs"
        />      
        
        <Button className="submit-button" type="submit">
            Submit
        </Button>
        </form>
        </div>
    </div>
    );
}

export default User;