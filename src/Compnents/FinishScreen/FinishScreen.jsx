import React from 'react';
import { useQuiz } from '../../Context/context';
import { RESTART_QUIZ } from '../../Context/action';
import Button from '../Button/Button';

const FinishScreen = () => {
    const { state, dispatch } = useQuiz();

    const handleRestart = () => {
        dispatch({ type: RESTART_QUIZ });
    };

    return (
        <div className="App">
            <h2 className="main-title">Quiz Finished!</h2>
            <p className="main-description">
                You got <strong>{state.correctAnswers}</strong> out of{' '}
                <strong>{state.questions.length}</strong> correct.
                <br/>
                Points:{state.points}<br/>
               Percentage: {state.points/280*100}%
            </p>
            <Button text="Restart Quiz" onClick={handleRestart} />
        </div>
    );
};

export default FinishScreen;
