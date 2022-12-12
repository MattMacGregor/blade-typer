import React, {useState} from "react";
import Typer from "../typer";
import {Button, Container, Nav, Navbar, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"

const Home = () => {
    const {toType, loading} = useSelector( state => state.toType )
    const [query, setQuery] = useState("")
    const dispatch = useDispatch();

    return(
        <div className="text-center position-absolute top-50 start-50 translate-middle d-flex flex-column">
            <span id="title">bLdeBtyper</span> {/*BladeRunner font is weird to get some special characters, for instance 'L' is the LA with the combined*/}
            <Button as={Link} className="m-2" to="/typer" onClick={ () => dispatch(getRandomThunk()) }>Start Random</Button>
            <Button as={Link} className="m-2" to="/typer" onClick={ () => dispatch(getOnThisDayThunk("selected")) }>Start OnThisDay</Button>
            <InputGroup className="m-2">
                <Form.Control type="text" onChange={ (e) => {setQuery(e.target.value)}}/>
                <Button as={Link} to="/typer" onClick={ () => dispatch(getFromSearchThunk(query)) }>Start FromSearch</Button>
            </InputGroup>
        </div>
    );
};

export default Home;
