import { findAllUsers } from "./user-service.js"
import react from "react"
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
                            { u.username }
                        </div>
                    </div>
                )
                
            }
        </Container>
    )
}

export default Users
