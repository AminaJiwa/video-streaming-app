import React from 'react';
import {Button, Input} from "@nextui-org/react";
import NavbarComponent from '../components/NavbarComponent';
import "../components/Navbar.css"
import axios from 'axios';

function Payments() {

    const[cardValue, setCardValue] = React.useState("");
    const[amountValue, setAmountValue] = React.useState("");

    //Check card number with regex validation
      const validateCard = (cardValue: string): boolean => {
        const regex = /^\d{16}$/;
        return regex.test(cardValue);
    }
    const isCardInvalid = React.useMemo(() => {
        if (cardValue === "") return false;
        return !validateCard(cardValue);
    }, [cardValue])

    //Check amount value 
    const validateAmountValue = (amountValue: string): boolean => {
        const regex = /^\d{0,3}$/;
        return regex.test(amountValue);
    }
    const isAmountInvalid = React.useMemo(() => {
        if (amountValue === null) return false;
        return !validateAmountValue(amountValue);
    }, [amountValue])

    //Handle Submit
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         // Construct the request body
        const requestBody = {

            creditCard: cardValue,
            amountValue: amountValue,
        };

        try{
            const response = await axios.post("/payments", requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            if (response.status === 201) {
                console.log('Data sent successfully.');

                //Clear input form
                setCardValue("");
                setAmountValue("");
                
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

        <h2 className='h2-pages'>Make a payment</h2>

        
        <form onSubmit={handleSubmit} className="form-user">
        <Input
            value={cardValue}
            type="text"
            label="Credit card number"
            variant="bordered"
            isInvalid={isCardInvalid}
            color={isCardInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid credit card number"
            onValueChange={setCardValue}
            className="required"
        />    
        <br></br>
        <Input
            value={amountValue}
            type="number"
            label="Amount"
            placeholder='£'
            variant="bordered"
            isInvalid={isAmountInvalid}
            color={isAmountInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid payment amount"
            onValueChange={setAmountValue}
            className="required"
        />  

        
        <Button className="submit-button" type="submit">
            Submit
        </Button>
        </form>
        </div>
    </div>
   
    );
}

export default Payments;