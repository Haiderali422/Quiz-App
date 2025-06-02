import {SET_QUESTIONS , INCREMENT_SCORE, NEXT_QUESTION,
    SELECT_OPTION,
    START_QUIZ,
    RESTART_QUIZ,
    FINISH_QUIZ,
    INCREMENT_POINTS,
} from './action';
 export let initialState = {
    questions: [],
     startQuiz: false,
    currentQuestionIndex: 0,
    correctAnswers: 0,
    selectedOption: null,
     finished: false,
     points: 0,
};

export  const QuizReducer = (state, action) => {
    switch (action.type) {
        case START_QUIZ:
            return {...state, startQuiz: true};
        case RESTART_QUIZ:
            return initialState;
        case SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case SELECT_OPTION:
            return { ...state, selectedOption: action.payload };
        case INCREMENT_SCORE :
            return { ...state, correctAnswers: state.correctAnswers + 1 };
        case INCREMENT_POINTS :
            return { ...state, points: state.points + action.payload };
        case NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedOption: null,
            };
        case FINISH_QUIZ:
            return { ...state, finished: true };
        default:
            return state;
    }
};


