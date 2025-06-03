
import * as action from './action';
 export let initialState = {
    questions: [],
     startQuiz: false,
    currentQuestionIndex: 0,
    correctAnswers: 0,
    selectedOption: null,
     finished: false,
     points: 0,
};

export const QuizReducer = (state, actionObj) => {
    switch (actionObj.type) {
        case action.START_QUIZ:
            return { ...state, startQuiz: true };
        case action.RESTART_QUIZ:
            return initialState;
        case action.SET_QUESTIONS:
            return { ...state, questions: actionObj.payload };
        case action.SELECT_OPTION:
            return { ...state, selectedOption: actionObj.payload };
        case action.INCREMENT_SCORE:
            return { ...state, correctAnswers: state.correctAnswers + 1 };
        case action.INCREMENT_POINTS:
            return { ...state, points: state.points + actionObj.payload };
        case action.NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedOption: null,
            };
        case action.FINISH_QUIZ:
            return { ...state, finished: true };
        default:
            return state;
    }
};

