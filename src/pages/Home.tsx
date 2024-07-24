import React, { ChangeEvent, useState } from 'react';
import {Button, Card, CardHeader, Image, Link, NextUIProvider} from "@nextui-org/react";
import "./Pages.css";
import "../components/Navbar.css"
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import sportsImg from "../components/images/sports-image.jpg";
import tvshowImg from "../components/images/tvshow-image.jpg";
import moviesImg from "../components/images/movies-image.jpg";

function Home() {
    const navigate = useNavigate();

    return (   
        <div>
        <NavbarComponent toAdmin={'pages/Admin'} toUser={'pages/User'} toHome={'/'} to={''} />
        <h2>Video streaming services for you</h2>

        <div className="card-home">
        <Card className="subcard-home">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Sports</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
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
            className="z-0 w-full h-full object-cover"
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
            className="z-0 w-full h-full object-cover"
            src={tvshowImg}
            />
        </Card>
        </div>
        <Button color="primary" variant="ghost">
        Find out more
        </Button> 
        </div>
    

    );
}

export default Home;