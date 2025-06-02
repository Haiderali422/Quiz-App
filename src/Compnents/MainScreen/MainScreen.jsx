import React from 'react';
import { useQuiz } from "../../Context/context";
import Button from "../../Compnents/Button/Button";
import Question from "../../Compnents/Question/Question";
import FinishScreen from "../FinishScreen/FinishScreen";
import './MainScreen.css';

const MainScreen = () => {
    const { state, dispatch } = useQuiz();

    return (
        <div className="main-container">
            <div className="main-content">
                <h1 className="main-title">🎯 Quiz App</h1>
                <p className="main-description">
                    Total Questions: <strong>15</strong> | Total Points: <strong>280</strong>
                </p>

                {!state.startQuiz ? (
                    <Button className='letsStart' text="Let's Start" onClick={() => dispatch({ type: "START_QUIZ" })} />
                ) : state.finished ? (
                    <FinishScreen />
                ) : (
                    <Question />
                )}
            </div>
        </div>
    );
};

export default MainScreen;
