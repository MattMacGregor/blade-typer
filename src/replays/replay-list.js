import { findAllUsers } from "../login/user-service.js"
import react from "react"
import { useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, Card, Button, Text } from "react-bootstrap"
import { Link } from "react-router-dom"
import {getReplaysThunk, deleteReplayThunk} from "../login/users-thunk"

const ReplayList = (props) => {
    const { loading, currentUser, replays } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const getReplays = () => {
       dispatch(getReplaysThunk(props.username ? props.username : "")) 
    }

    useEffect(() => {
        if(!loading && props.populate) {
            getReplays()
        }
    }, []);

    const deleteReplay = (replayId) => {
        console.log(replayId)
        dispatch(deleteReplayThunk(replayId))
    }
    return(
        <div>
            {   loading && "Loading" }
            {
                !loading && (props.replays && props.replays.length != 0 || (props.populate && Object.entries(replays).length != 0)) && 
                <div>
                    <div id="replayHeader" className="row w-100 align-self-center text-center text-secondary mb-2">
                        <h4 className="col">
                            Gamemode
                        </h4>
                        <h4 className="col">
                            Words Per Minute
                        </h4>
                        <h4 className="col">
                            Accuracy
                        </h4>
                        <h4 className="col">
                            Time
                        </h4> 
                    </div>
                    { 
                        props.populate && Object.entries(replays).map(([username, replayLists]) => 
                            replayLists.map((replay) =>
                                <Card className="cyber-card rounded-4 mb-2">
                                    <Card.Header className="rounded-4 rounded-bottom">
                                        <h4 className="mt-1"><Link className="undecorated" to={"/users/" + username}>{ username }</Link><span className="ms-2">{replay.typingId}</span>{currentUser && currentUser.username == username && <Button className="float-end rounded-pill" variant="danger" onClick={() => { deleteReplay(replay._id)}}>Delete</Button>}</h4>
                                    </Card.Header>
                                    <Card.Body className="rounded-4 rounded-top">
                                        <div className="row">
                                            <div className="col">
                                                { replay.gamemode}
                                            </div>
                                            <div className="col">
                                                { ~~(replay.wpm * 1000) / 1000 }
                                            </div>
                                            <div className="col">
                                                { ~~(replay.accuracy * 100) / 100 }
                                            </div>
                                            <div className="col">
                                                { replay.time / 1000}
                                            </div> 
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        )
                    }
                    {
                        !props.populate && props.replays.map((replay) =>
                            <Card className="cyber-card rounded-4 mb-2">
                                <Card.Header className="rounded-4 rounded-bottom">
                                    <h4 className="mt-1"><Link className="undecorated" to={"/users/" + replay.username}>{ replay.username }</Link><span className="ms-2">{replay.typingId}</span>{currentUser && currentUser.username == replay.username && <Button className="float-end rounded-pill" variant="danger" onClick={() => { deleteReplay(replay._id)}}>Delete</Button>}</h4>
                                </Card.Header>
                                <Card.Body className="rounded-4 rounded-top">
                                    <div className="row">
                                        <div className="col">
                                            { replay.gamemode}
                                        </div>
                                        <div className="col">
                                            { ~~(replay.wpm * 1000) / 1000 }
                                        </div>
                                        <div className="col">
                                            { ~~(replay.accuracy * 100) / 100 }
                                        </div>
                                        <div className="col">
                                            { replay.time / 1000}
                                        </div> 
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }
                    </div>
            }
        </div>
    )
}

ReplayList.defaultProps = {
    replays: []
}

export default ReplayList
