import React, { useEffect, useState, Text, useRef } from "react";
import { Button, Container } from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import {nextGoal, updateTyped, updateStats, incrementTime, tickStartCountdownDown, reset, finish} from "../reducers/toTypeReducer";
import { saveReplayThunk } from "../login/users-thunk"
import { useNavigate } from "react-router-dom";
import TypeStats from "./typeStats";
import {type} from "../helpers/animations"; 
const Typer = () => {
    const [typed, setTyped] = useState("");
    const [progress, setProgress] = useState();
    const [title, setToTypeTitle] = useState("");
    const {toType, currentGoalIndex, loading, totalKeyPresses, wordsCorrect, totalCorrect, totalIncorrect, time, startCountdown, started, finished, gamemode, typingId} = useSelector( state => state.toType )
    const {currentUser} = useSelector( state => state.users)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const interval = useRef(undefined)
    const previousCorrect = useRef(0);
    const previousWords = useRef(0);
    const hasStarted = useRef(false)
    const typingArea = useRef();
    const updateProgress = () => {
        if(!loading && toType) {
            let correct = 0, incorrect = 0, total = totalKeyPresses + 1, correctWords = 0;
            let wordCorrect = true;
            let currentStreak = "";
            let correctStreak = true;
            setProgress([...(toType[currentGoalIndex].summary)].map((c, i) => { 
                    if(i >= toType[currentGoalIndex].summary.length - 1 && i >= typed.length) {
                        currentStreak += c
                        return currentStreak
                    } else if(i >= typed.length) {
                        currentStreak += c
                    } else if(c == typed[i]) {
                        correct += 1;
                        if(c == ' ') {
                            if(wordCorrect) {
                                correctWords += 1
                            } else {
                                wordCorrect = true
                            }
                        }
                        if(!correctStreak) {
                            let colors = (<u className="text-danger">{ currentStreak }</u>)
                            if(currentStreak == "")
                                colors = undefined
                            correctStreak = true
                            currentStreak = c
                            if(i == typed.length - 1 || i == toType[currentGoalIndex].summary.length - 1) {
                                colors = [colors, (<u className="text-success">{ currentStreak }</u>)]
                                currentStreak = ""
                                return colors
                            }
                            return colors
                        } else {
                            currentStreak += c
                            if(i == typed.length - 1 || i == toType[currentGoalIndex].summary.length - 1) {
                                let colors = (<u className="text-success">{ currentStreak }</u>)
                                currentStreak = ""
                                return colors
                            }
                        }
                    } else {
                        incorrect += 1;
                        wordCorrect = false;
                        if(correctStreak) {
                            let colors = (<u className="text-success">{ currentStreak }</u>)
                            if(currentStreak == "")
                                colors = undefined
                            currentStreak = c
                            if(i == typed.length - 1 || i == toType[currentGoalIndex].summary.length - 1) {
                                colors = [colors, (<u className="text-danger">{ currentStreak }</u>)]
                                currentStreak = ""
                                return colors
                            }
                            correctStreak = false
                            return colors
                        } else {
                            currentStreak += c
                            if(i == typed.length - 1 || i == toType[currentGoalIndex].summary.length - 1) {
                                let colors = (<u className="text-danger">{ currentStreak }</u>)
                                currentStreak = ""
                                return colors
                            }
                        }
                    }
                    return
                }
            ))
            if(correct == toType[currentGoalIndex].summary.length) {
                if(currentGoalIndex < toType.length - 1) {
                    dispatch(nextGoal())
                    previousCorrect.current += correct
                    previousWords.current += correctWords + 1
                } else {
                    dispatch(finish())
                    clearIntervalIfSet()
                }
            }
            correct += previousCorrect.current
            correctWords += previousWords.current
            dispatch(updateStats({ total, correct, incorrect, correctWords }))
        }
    }

    useEffect(() => {
        if(typingArea.current) {
            typingArea.current.value = '';
        }
        setTyped('');
        if(!loading && toType) {
            setToTypeTitle(toType[currentGoalIndex].title); 
        }
    }, [currentGoalIndex])

    useEffect(() => {
        if(!loading && !toType) { 
            navigate("/")
        }
        dispatch(reset());
        clearIntervalIfSet()
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
            
            return clearIntervalIfSet 
        })()

        return clearIntervalIfSet 
    }, [loading]);

    useEffect(() => {
        if(started && typingArea.current) {
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
                {
                    !finished &&
                    <textarea id="typerBox" ref={typingArea} rows="5" disabled={!started} className="w-100 mt-5 mb-5" autoFocus onDrop={ (e) => e.target.value} onPaste={ (e) => { e.preventDefault() }} onChange={ (e) => { setTyped(e.target.value) }} />
                }
                {
                    currentUser && finished &&
                    <Button className="w-100" onClick={() => {dispatch(saveReplayThunk(
                        {
                            gamemode: gamemode,
                            username: currentUser.username,
                            typingId: typingId,
                            wpm: wordsCorrect * 60000 / time,
                            accuracy: totalCorrect / totalKeyPresses,
                            time: time,
                            
                        }
                    ))}}>Save Replay</Button>
                }
            </Container>
            <TypeStats/>
        </Container>
    );
};


export default Typer;
