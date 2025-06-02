import React, { useEffect } from 'react';
import '../../App.css';
import Button from "../Button/Button";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useQuiz } from "../../Context/context";
import {
    SET_QUESTIONS,
    SELECT_OPTION,
    INCREMENT_SCORE,
    NEXT_QUESTION,
    RESTART_QUIZ,
    FINISH_QUIZ, INCREMENT_POINTS
} from "../../Context/action";
import {FetchQuestions} from "../../Network/Network";

const Question = () => {
    const { state, dispatch } = useQuiz();
    let {
        questions,
        currentQuestionIndex,
        selectedOption,
        correctAnswers,
        points,
    } = state;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await FetchQuestions();
                dispatch({ type: SET_QUESTIONS, payload: res });
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        if (questions.length === 0) fetchQuestions();
    }, [dispatch, questions.length]);

    if (!Array.isArray(questions) || questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.options[currentQuestion.correctOption];

    const handleAnswer = (option) => {
        if (selectedOption !== null) return;

        dispatch({ type: SELECT_OPTION, payload: option });

        if (option === correctOption) {
            dispatch({ type: INCREMENT_SCORE });
            dispatch({ type: INCREMENT_POINTS, payload: currentQuestion.points });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            dispatch({ type: NEXT_QUESTION });
        } else {
            dispatch({ type: FINISH_QUIZ });
        }
    };

    const handleTimeUp = () => {
        alert(`Time's up! You got ${correctAnswers} out of ${questions.length} correct.`);
        dispatch({ type: RESTART_QUIZ });
    };

    return (
        <div className="question-container">
            <p className="main-description"><CountDownTimer onTimeUp={handleTimeUp} /> </p>
            <ProgressBar current={correctAnswers} total={questions.length} />
            <p className="pointsDisplay" >{state.points}/280</p>

            <div className="App">
                <p className="main-description">Q{currentQuestionIndex+1}:{currentQuestion.question} {currentQuestion.points}</p>

                <div className="options-container">
                    {currentQuestion.options.map((option, i) => {
                        let optionClass = "option";
                        if (selectedOption !== null) {
                            if (option === correctOption) {
                                optionClass += " correct";
                            } else if (option === selectedOption) {
                                optionClass += " wrong";
                            } else {
                                optionClass += " disabled";
                            }
                        }

                        return (
                           <Button
                                key={i}
                                text={option}
                                className={optionClass}
                                onClick={() => handleAnswer(option)}
                                disabled={selectedOption !== null}
                            />


                        );
                    })}
                </div>

                <div className="button-container">
                    <Button
                        text={currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
                        onClick={handleNext}
                    />

                </div>




            </div>
        </div>
    );
};

export default Question;
