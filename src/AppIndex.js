import {BrowserRouter, Link} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";
import Typer from "./typer";
import Login from "./login/login.js"
import Users from "./login/users.js"
import Replays from "./replays"
import Search from "./search"
import SearchDetails from "./search/search-details"
import { LogoutButton } from "./login/logout.js"
import handleLogoutButton from "./login/logout.js"
import LoggedInRoute from "./helpers/loggedin-route.js"
import CurrentUser from "./helpers/current-user.js"
import Profile from "./login/profile.js"
import Register from "./login/register.js"
import Alert from "./ui/alert.js"
import { configureStore } from '@reduxjs/toolkit';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { findAllUsersThunk } from "./login/users-thunk.js"

const AppIndex = () => {
    const {currentUser} = useSelector((state) => state.users)  
    const {alertMessage, alertVariant, alertShown, dismissible } = useSelector((state) => state.ui)
    const dispatch = useDispatch()

    return(
        <CurrentUser>
            <BrowserRouter>
                {
                    alertShown &&
                    <Alert variant={alertVariant} message={alertMessage} dismissible={dismissible} /> 
                }
                <Routes>
                    <Route index path="/*" element={<Home/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/users/:username" element={<Profile/>} />
                    <Route path="/typer" element={<Typer/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/search" element={<Search/>} />
                    <Route path="/search/:title" element={<SearchDetails/>} />
                    <Route path="/profile" element={
                        <LoggedInRoute>
                            <Profile/>
                        </LoggedInRoute>
                    } />
                    <Route path="/replays" element={<Replays populate/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
                <Navbar id="homeBar" className="crt flex-row-reverse ps-3 pe-3" fixed="bottom" variant="dark" expand="sm">
                    <Navbar.Collapse id="button-menu">
                        {   
                            currentUser &&
                            <Button as={Link} to="/profile" className="homeBarLink ms-4 me-4 col">Profile: <span className="text-warning">{currentUser.username}</span></Button>
                        }
                        {
                            !currentUser && 
                            <Button as={Link} to="/login" className="homeBarLink ms-4 me-4 col">Login</Button>
                        }
                        {
                            !currentUser && 
                            <Button as={Link} to="/register" className="homeBarLink ms-4 me-4 col">Register</Button>
                        }
                        <Button as={Link} to="/users" className="homeBarLink ms-4 me-4 col" onClick={ () => { dispatch(findAllUsersThunk()) } }>Users</Button>
                        {
                            currentUser &&
                            <LogoutButton variant="danger" classes="homeBarLink ms-4 me-4 col" />
                        }
                    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls="button-menu" />
                    <Navbar.Brand as={Link} to="/" className="ms-3 me-3" id="titleNav">bLdeBtyper</Navbar.Brand>
                </Navbar>
            </BrowserRouter>
        </CurrentUser>
    )
}

export default AppIndex
