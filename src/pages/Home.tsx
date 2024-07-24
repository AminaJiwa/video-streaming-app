import React, { ChangeEvent, useState } from 'react';
import {Button, Input, Link} from "@nextui-org/react";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import {ReplyLogo} from "./ReplyLogo";

function Home() {
    return (
        <Navbar>
      <NavbarBrand>
        <ReplyLogo />
        <p className="font-bold text-inherit">Reply</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="./User.tsx">
            User
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="./Admin.tsx" aria-current="page">
            Admin
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
}

export default Home;