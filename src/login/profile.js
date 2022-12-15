import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, findUserByNameThunk} from "./users-thunk";
import {useNavigate, useParams} from "react-router";
import { Container, Button } from "react-bootstrap"

import ReplayList from "../replays/replay-list"
const Profile = () => {
    const navigate = useNavigate()
    const {currentUser, publicProfile, loading} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const params = useParams()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    
    useEffect(() => {
        if(params.username && !(currentUser && params.username == currentUser.username) && !loading) {
            dispatch(findUserByNameThunk(params.username))
        } else if(params.username == currentUser.username) {
            params.username = undefined
        }
    }, [])
            
    return(
        <Container className="position-absolute top-50 start-50 translate-middle">
            {
                !params.username &&
                <h1>{currentUser.username}</h1>
            }
            {
                params.username &&
                <h1>{params.username}</h1>
            }
            <div className="mt-5">
                { params.username && 
                    <ReplayList populate username={params.username} />
                }
                { !params.username &&
                  <ReplayList populate username={currentUser.username}/>
                }
            </div>
        </Container>
    )
}

export default Profile
