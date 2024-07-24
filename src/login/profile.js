import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, findUserByNameThunk} from "./users-thunk";
import {useNavigate, useParams} from "react-router";
import { Container, Button, Form } from "react-bootstrap"

import {updateThunk} from "./users-thunk.js"
import ReplayList from "../replays/replay-list"
const Profile = () => {
    const navigate = useNavigate()
    const {currentUser, publicProfile, loading} = useSelector((state) => state.users)
    const [email, setEmail] = useState()
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }

    const handleUpdateBtn = () => {
        dispatch(updateThunk({username: currentUser.username,  updates: {email: email}}))
    }
    
    useEffect(() => {
        if(params.username && !(currentUser && params.username == currentUser.username) && !loading) {
            dispatch(findUserByNameThunk(params.username))
        } else if(params.username == currentUser.username) {
            params.username = undefined
        }
    }, [])
            
    return(
        <Container className="position-absolute top-50 start-50 translate-middle mb-5">
            {
                !params.username &&
                currentUser && 
                <Container className="row">
                    <h1 className="col-10">{ edit ? "Editing " : "User: "} {currentUser.username}</h1>
                    <Button className="col-2" onClick={() => setEdit(!edit)}>
                        { edit ? "Done" : "Edit" }
                    </Button>
                </Container>
            }
            {
                params.username &&
                <h1><span className="text-warning">User:</span> {params.username}</h1>
            }
            {
                edit &&
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label className="h3">
                                Change Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder="Change email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Button
                            className="btn btn-primary w-100 mt-2"
                            onClick={handleUpdateBtn}>
                            Update
                        </Button>
                    </Form>
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
