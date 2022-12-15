import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {current} from "@reduxjs/toolkit";
import {Navigate} from "react-router";
import { setAlert, dismissAlert } from "../reducers/ui-reducer.js"
import { Container } from "react-bootstrap"

const Register = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        dispatch(registerThunk({username, password, email}))
        dispatch(setAlert({ variant: "success", message: "Register Successful", dismissible: true }))
    }

    if(currentUser) {
        return (<Navigate to={'/profile'}/>)
    }

    return(
        <Container className="position-absolute top-50 start-50 translate-middle">
            <h1>Register</h1>
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control mb-2"
                placeholder="username"
                value={username}/>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-2"
                placeholder="password"
                type="password"
                value={password}/>
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-4"
                placeholder="email"
                type="email"
                value={email}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleRegisterBtn}>
                Register
            </button>
            {
                currentUser &&
                <h1>Welcome new user: {currentUser.username}</h1>
            }
        </Container>
    )
}
export default Register
