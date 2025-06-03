import {createContext, useContext, useReducer} from "react";
import {QuizReducer , initialState} from "./reducer";
import { useEffect } from "react";
import {FetchQuestions} from "../Network/network";
import { SET_QUESTIONS } from "./action";

const QuizContext = createContext();

export  const QuizContextProvider = ({children}) => {


    const [state , dispatch ] = useReducer(QuizReducer ,initialState )
    const {questions} = state;

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

    return (
        <QuizContext.Provider value={{state , dispatch}}>
            {children}
        </QuizContext.Provider>
    )

}

export const useQuiz = () => useContext(QuizContext);