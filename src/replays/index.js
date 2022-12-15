import { findAllUsers } from "../login/user-service.js"
import react from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container  } from "react-bootstrap"
import {getReplaysThunk} from "../login/users-thunk"
import ReplayList from "./replay-list"

const Replays = () => {
    const { currentUser, loading, users } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const {replays} = useSelector(state => state.users)

    return(
        <Container className="position-absolute pt-5">
            <ReplayList populate/>
        </Container>
    )
}

export default Replays 
