import '../../App.css';
import Button from "../Button/Button";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useQuiz } from "../../Context/context";
import * as action from "../../Context/action";


const Question = () => {
    const { state, dispatch } = useQuiz();
    let {
        questions,
        currentQuestionIndex,
        selectedOption,
        correctAnswers,
        points,
    } = state;


    if ( questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.options[currentQuestion.correctOption];

    const handleAnswer = (option) => {
        if (selectedOption !== null) return;

        dispatch({ type: action.SELECT_OPTION, payload: option });

        if (option === correctOption) {
            dispatch({ type: action.INCREMENT_SCORE });
            dispatch({ type: action.INCREMENT_POINTS, payload: currentQuestion.points });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            dispatch({ type: action.NEXT_QUESTION });
        } else {
            dispatch({ type: action.FINISH_QUIZ });
        }
    };

    const handleTimeUp = () => {
        alert(`Time's up! You got ${correctAnswers} out of ${questions.length} correct.`);
        dispatch({ type: action.RESTART_QUIZ });
    };

    return (
        <div className="question-container">
            <div className="main-description">
                <CountDownTimer onTimeUp={handleTimeUp}/>
            </div>
            <ProgressBar current={currentQuestionIndex} total={questions.length} />
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
