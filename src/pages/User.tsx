import React, { ChangeEvent, useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import "../components/Navbar.css"
import {Button, DateInput, DateValue, Input} from "@nextui-org/react";

function User() {

    const[usernameValue, setUsernameValue] = React.useState("");
    const[passwordValue, setPasswordValue] = React.useState("");
    const[emailValue, setEmailValue] = React.useState("");
    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
    const[cardValue, setCardValue] = React.useState("");


    const handleDateChange = (date: DateValue | null) => {
        setSelectedDate(date);
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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("test ");
    }

    return (
    <div>
        <div className="user-body">
        <NavbarComponent toAdmin={'/pages/Admin'} toUser={'/pages/User'} toHome={'/'} to={''} />

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
            description="Your username should contain one or more letters or numbers, and no spaces."
            onValueChange={setUsernameValue}
            className="max-w-xs"
        />

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
            className="max-w-xs"
        />

        <Input
            value={emailValue}
            type="email"
            label="Email"
            variant="bordered"
            isRequired
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid email"
            description="Your password should have at least 8 characters, with at 1 uppercase letter and number."
            onValueChange={setEmailValue}
            className="max-w-xs"
        />

        
        <DateInput
        isRequired
        label="Birth date"
        className="date-input"
        value={selectedDate}
        onChange={handleDateChange}
        isInvalid={!selectedDate}
        errorMessage={() => {
          if (!selectedDate) {
            return 'Please enter a valid date.';
          }
        }}
        />

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