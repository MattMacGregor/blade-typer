import { findAllUsers } from "./user-service.js"
import react from "react"
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container  } from "react-bootstrap"

const Users = () => {
    const { currentUser, loading, users } = useSelector((state) => state.users)

    return(
        <Container className="mt-5 text-center">
            <h2 className="mb-4 text-warning">Users:</h2>
            {
                !loading &&
                users.map(u => 
                    <div className="row"> 
                        <div className="col">
                            <Link className="undecorated h3" to={"/users/" + u.username}>{ u.username }</Link>
                        </div>
                    </div>
                )
                
            }
        </Container>
    )
}

export default Users
