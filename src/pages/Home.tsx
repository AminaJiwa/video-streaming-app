import React, { ChangeEvent, useState } from 'react';
import {Button, Card, CardHeader, Image, Link, NextUIProvider} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import "./Pages.css";
import "../components/Navbar.css"
import NavbarComponent from '../components/NavbarComponent';
import sportsImg from "../components/images/sports-image.jpg";
import tvshowImg from "../components/images/tvshow-image.jpg";
import moviesImg from "../components/images/movies-image.jpg";

function Home() {

    const navigate = useNavigate();
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('pages/User');
    }

    return (   
        <div>
        <div className="home-body">
        <NavbarComponent toAdmin={'/pages/Admin'} toUser={'/pages/User'} toHome={'/'} to={''} />
        <h2 className='h2-pages'>Video streaming services for you</h2>

        <div className="card-home">
        <Card className="subcard-home">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Sports</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="image-home"
            src={sportsImg}
            />
        </Card>

        <Card className="subcard-home">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Movies</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="image-home"
            src={moviesImg}
            />
        </Card>

        <Card className="subcard-home">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">TV shows</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="image-home"
            src={tvshowImg}
            />
        </Card>
        </div>
        <br></br>
        <Button className="button-home" onClick={buttonHandler}>
        Find out more
        </Button> 
        </div>
        </div>
    

    );
}

export default Home;