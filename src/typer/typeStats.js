import React, { useEffect } from "react"
import {Container, ProgressBar} from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {reset} from "../reducers/toTypeReducer";

const TypeStats = () => {
    const {toType, currentGoalIndex, loading, totalKeyPresses, wordsCorrect, totalCorrect, totalIncorrect, time} = useSelector( state => state.toType );
     
    let totalCharacters = 0;
    if(!loading && toType) {
        for(let i = 0; i < toType.length; i++) {
            totalCharacters += toType[i].summary.length
        }
    }
    
    const dispatch = useDispatch();

    return (
        <Container className="mt-3 mb-3">
            <div className="row align-items-center">
                <ProgressBar className="mb-3">
                    <ProgressBar animated key={1} label={~~((totalCorrect / totalCharacters) * 10000) / 100} now={~~((totalCorrect / totalCharacters) * 10000) / 100} />
                    <ProgressBar animated key={2} variant="danger" label={~~((totalIncorrect / totalCharacters) * 10000) / 100} now={~~((totalIncorrect / totalCharacters) * 10000) / 100} />
                </ProgressBar>
            </div>
            <div className="row">
                <h2 className="col">Words Per Minute: {~~(100 * 60 * (wordsCorrect / (time / 1000))) / 100}</h2>
                <h2 className="col">Current Time: {time / 1000}</h2>
            </div>
            <div className="row">
                <h2 className="col"> Completed: {~~((totalCorrect / totalCharacters) * 10000) / 100}%</h2>
                <h2 className="col"> Accuracy: {~~((totalCorrect / totalKeyPresses) * 10000) / 100}%</h2>
                <h2 className="col">Errors: {totalIncorrect}</h2>
            </div>
        </Container>
    );
};

export default TypeStats;
