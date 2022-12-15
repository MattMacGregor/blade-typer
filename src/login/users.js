import { findAllUsers } from "./user-service.js"
import react from "react"
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container  } from "react-bootstrap"

const Users = () => {
    const { currentUser, loading, users } = useSelector((state) => state.users)

    return(
        <Container className="position-absolute top-50 start-50">
            {
                !loading &&
                users.map(u => 
                    <div className="row"> 
                        <div className="col">
                            <Link className="undecorated" to={"/users/" + u.username}>{ u.username }</Link>
                        </div>
                    </div>
                )
                
            }
        </Container>
    )
}

export default Users
