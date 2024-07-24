import React, { ChangeEvent, useState } from 'react';
import {Link, NextUIProvider} from "@nextui-org/react";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem} from "@nextui-org/navbar";
import {ReplyLogo} from "./ReplyLogo";
import "./Pages.css";
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';

function Home() {
    const navigate = useNavigate();

    return (   
        <NavbarComponent toAdmin={'pages/Admin'} toUser={'pages/User'} toHome={'/'} to={''} />
    

    );
}

export default Home;