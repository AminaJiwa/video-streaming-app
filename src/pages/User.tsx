import React, { ChangeEvent, useState } from 'react';
import {Input} from "@nextui-org/react";
import NavbarComponent from '../components/NavbarComponent';

function User() {
    return (
        <NavbarComponent toAdmin={'pages/Admin'} toUser={'pages/User'} toHome={'/'} to={''} />
    );
}

export default User;