import React, {useState, useRef} from "react";
import Typer from "../typer";
import {Button, Container, Nav, Navbar, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"
import { searchWikiThunk } from "../search/search-thunk"

const Home = () => {
    const {toType, loading} = useSelector( state => state.toType )
    const [query, setQuery] = useState("")
    const [queryRelated, setQueryRelated] = useState("")
    const dispatch = useDispatch();
    const onthisdaySelect = useRef()
    return(
        <div className="text-center position-absolute top-50 start-50 translate-middle d-flex flex-column">
            <span id="title">bLdeBtyper</span> {/*BladeRunner font is weird to get some special characters, for instance 'L' is the LA with the combined*/}
            <Button as={Link} className="m-2" to="/typer" onClick={ () => dispatch(getRandomThunk()) }>Start Random</Button>
            <InputGroup className="m-2 pe-3">
                <Button as={Link} className="col-10" to="/typer" onClick={ () => dispatch(getOnThisDayThunk(onthisdaySelect.current.value)) }>Start OnThisDay</Button>
                <Form.Select ref={onthisdaySelect} aria-label="Select OnThisDay Type">
                    <option value="selected">Selected</option>
                    <option value="all">All</option>
                    <option value="births">Births</option>
                    <option value="deaths">Deaths</option>
                    <option value="holidays">Holidays</option>
                    <option value="events">Events</option>
                </Form.Select>
            </InputGroup>
            <InputGroup className="m-2 pe-3">
                <Form.Control type="text" onChange={ (e) => {setQuery(e.target.value)}}/>
                <Button as={Link} to="/typer" onClick={ () => dispatch(getFromSearchThunk(query)) }>Start FromSearch</Button>
            </InputGroup>
            <InputGroup className="m-2 pe-3">
                <Form.Control type="text" onChange={ (e) => {setQueryRelated(e.target.value)}}/>
                <Button as={Link} to="/search" onClick={ () => dispatch(searchWikiThunk(queryRelated)) }>Start Related Search</Button>
            </InputGroup>
        </div>
    );
};

export default Home;
