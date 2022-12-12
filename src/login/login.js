import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "./users-thunk";
import {Navigate, useNavigate} from "react-router";
import { Container } from "react-bootstrap"
import { setAlert, dismissAlert } from "../reducers/ui-reducer.js" 

const Login = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}))
            dispatch(setAlert({ variant: "success", message: "Login Successful", dismissible: true }))
        } catch (e) {
            dispatch(setAlert({ variant: "danger", message: "Login Failed", dismissible: true }))
        }
    }

    if (currentUser) {
        return (<Navigate to={'/'}/>)
    }

    return(
        <Container className="position-absolute top-50 start-50 translate-middle">
            <h1>Login</h1>
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="username"
                value={username}/>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" placeholder="password" type="password" value={password}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleLoginBtn}>Login</button>
        </Container>
    )
}
export default Login
