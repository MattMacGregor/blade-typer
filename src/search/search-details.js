import React, {useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link, useParams} from "react-router-dom"
import {getPageThunk, searchWikiThunk} from "./search-thunk"
import ReplayList from "../replays/replay-list"
import parse from "html-react-parser"
import {setGoal} from "../reducers/toTypeReducer.js"

const WIKIMEDIA_API = "https://api.wikimedia.org"
const SEARCH_API = `${WIKIMEDIA_API}/core/v1/wikipedia/en/search/page?q=`

const SearchDetails = () => {
    const [query, setQuery] = useState("")
    const [Results, setResults] = useState([])
    const { details, detailsLoading } = useSelector((state) => state.search)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
       if(!detailsLoading) {
            dispatch(getPageThunk(params.title)) 
       }
    }, [])

    return(
        <Container className="position-absolute mt-5">
            <Container className="row mb-5">
                <Form.Control type="text col" onChange={ (e) => {setQuery(e.target.value)}}/>
                <Button as={Link} to="/search" className="col" onClick={ () => dispatch(searchWikiThunk(query)) }>Search</Button>
            </Container>
            {
                !detailsLoading &&
                <Container> 
                    <div className="m-auto mt-3 mb-4 w-100 text-center"><Link className="h2 undecorated" onClick={() => dispatch(setGoal({toType: {title: details.title, summary: details.summary}, typingId: details.title})) } to="/typer">{details.title}</Link></div>
                    <ReplayList replays={details.replays} />
                </Container>
            }
            
        </Container>
    )
}

export default SearchDetails
