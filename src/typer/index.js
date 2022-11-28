import React, { useEffect, useState, Text, useRef } from "react";
import { Button, Container } from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import {nextGoal, updateTyped, updateStats, incrementTime, tickStartCountdownDown} from "../reducers/toTypeReducer";
import { useNavigate } from "react-router-dom";
import TypeStats from "./typeStats";
import {type} from "../helpers/animations"; 
const Typer = () => {
    const [typed, setTyped] = useState("");
    const [progress, setProgress] = useState();
    const [title, setToTypeTitle] = useState("");
    const {toType, currentGoalIndex, loading, totalKeyPresses, wordsCorrect, totalCorrect, totalIncorrect, time, startCountdown, started} = useSelector( state => state.toType );

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const interval = useRef(undefined)
    const hasStarted = useRef(false)
    const typingArea = useRef();
    const updateProgress = () => {
        let correct = 0, incorrect = 0, total = totalKeyPresses + 1, correctWords = 0;
        let wordCorrect = true;
        if(!loading && toType) {
            setProgress([...(toType[currentGoalIndex].summary)].map((c, i) => {
                    
                    if(i >= typed.length) {
                        return c
                    } else if(c == typed[i]) {
                        correct += 1;
                        if(c == ' ') {
                            if(wordCorrect) {
                                correctWords += 1
                            } else {
                                wordCorrect = true
                            }
                        }
                    } else {
                        incorrect += 1;
                        wordCorrect = false;
                    }
                    return(<span className={ c == typed[i] ? "text-success" : "text-danger" } ><u>{ c }</u></span>)
                }
            ))
            if(correct == toType[currentGoalIndex].summary.length) {
                if(currentGoalIndex < toType.length - 1) {
                    dispatch(nextGoal())
                } else {
                    clearIntervalIfSet();
                }
            }
        }
        dispatch(updateStats({ total, correct, incorrect, correctWords }))
    }

    useEffect(() => {
        typingArea.current.value = '';
        setTyped('');
        if(!loading && toType) {
            setToTypeTitle(toType[currentGoalIndex].title); 
        }
    }, [currentGoalIndex])

    useEffect(() => {
        if(!loading && !toType) { 
            navigate("/")
        }
    }, [])

    const clearIntervalIfSet = () => {
        if(interval.current != undefined) {
            clearInterval(interval.current)
            interval.current = undefined
        }
    }

    useEffect(() => {
        (async () => {
            if(!loading && toType) {
                await type(toType[currentGoalIndex].title, setToTypeTitle);
                await type(toType[currentGoalIndex].summary, setProgress);
                if(interval.current == undefined) {
                    interval.current = setInterval(() => {
                        dispatch(tickStartCountdownDown())
                    }, 1000)
                }
            }
        })()

        return clearIntervalIfSet 
    }, [loading]);

    useEffect(() => {
        if(started) {
            typingArea.current.focus()
            clearInterval(interval.current)
            interval.current = setInterval(() => {
                dispatch(incrementTime())
            }, 10)
        }
        
        return clearIntervalIfSet 
    }, [started]);

    useEffect(updateProgress, [typed])
    
    return(
        <Container className="position-absolute top-50 start-50 translate-middle">
            {!started && <h3 className="text-center">Start in {startCountdown}</h3>}<h2 className="text-secondary text-center">{title}</h2>
            {!loading && toType && <h5 className="text-secondary text-center text-warning">{currentGoalIndex + 1}/{toType.length}</h5>}
            <Container className="text-center align-items-center">
                <h3 className="align-middle mb-5">{ loading && "Loading..."}{ progress } </h3>
                <textarea ref={typingArea} rows="5" disabled={!started} className="w-100 mt-5 mb-5" autoFocus onDrop={ (e) => { e.preventDefault() }} onPaste={ (e) => { e.preventDefault() }} onChange={ (e) => { setTyped(e.target.value) }} />
            </Container>
            <TypeStats/>
        </Container>
    );
};


export default Typer;
