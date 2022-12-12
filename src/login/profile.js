import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import { Container } from "react-bootstrap"
const Profile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }

    return(
        <Container className="position-absolute top-50 start-50 translate-middle">
            <h1>Profile</h1>
            {
                currentUser &&
                <h2>Welcome new user: {currentUser.username}</h2>
            }
            <button
                className="btn btn-danger"
                onClick={handleLogoutBtn}>
                Logout
            </button>
        </Container>
    )
}

export default Profile
