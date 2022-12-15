import React, {useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {searchWikiThunk, getPageThunk} from "./search-thunk"

import parse from "html-react-parser"
const WIKIMEDIA_API = "https://api.wikimedia.org"
const SEARCH_API = `${WIKIMEDIA_API}/core/v1/wikipedia/en/search/page?q=`

const Search = () => {
    const [query, setQuery] = useState("")
    const [Results, setResults] = useState([])
    const { results, loading } = useSelector((state) => state.search)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    return(
        <Container className="position-absolute mt-5">
            <Container className="row mb-5">
                <Form.Control type="text col" onChange={ (e) => {setQuery(e.target.value)}}/>
                <Button className="col" onClick={ () => dispatch(searchWikiThunk(query)) }>Search</Button>
            </Container>
            {
                !loading &&
                results.map((page) => 
                    <Card className="cyber-card mb-2 rounded-4" onClick={() => {
                        dispatch(getPageThunk(page.key))
                        navigate("/search/" + page.key)
                    }}>
                        <Card.Header className="rounded-4 rounded-bottom">
                            {page.title}
                        </Card.Header>
                        <Card.Body className="rounded-4 rounded-top">
                            {parse(page.excerpt)}
                            {page.description}
                        </Card.Body>
                    </Card>
                )
            }
        </Container>

    )
}

export default Search
