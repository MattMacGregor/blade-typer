import React, {useState} from "react";
import Typer from "../typer";
import {Button, Container, Nav, Navbar, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"

const Home = () => {
    const {toType, loading} = useSelector( state => state.toType )
    const [query, setQuery] = useState("")
    const dispatch = useDispatch();

    return(
        <Container className="h-100 w-100">
            <div className="text-center position-absolute top-50 start-50 translate-middle d-flex flex-column">
                <span id="title">bLdeBtyper</span> {/*BladeRunner font is weird to get some special characters, for instance 'L' is the LA with the combined*/}
                <Button as={Link} to="/typer" onClick={ () => dispatch(getRandomThunk()) }>Start Random</Button>
                <Button as={Link} to="/typer" onClick={ () => dispatch(getOnThisDayThunk("selected")) }>Start OnThisDay</Button>
                <Form.Control type="text" onChange={ (e) => {setQuery(e.target.value)}}/>
                <Button as={Link} to="/typer" onClick={ () => dispatch(getFromSearchThunk(query)) }>Start FromSearch</Button>
            </div>
            <Navbar fixed="bottom" variant="dark">
                <Navbar.Brand><span id="titleNav">bLdeBtyper</span></Navbar.Brand>
                <Navbar.Collapse>
                    <Nav.Link as={Link} to="/profile">Start</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Home;
