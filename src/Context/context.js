import {createContext, useContext, useReducer} from "react";
import {QuizReducer , initialState} from "./Reducer";


const QuizContext = createContext();

export  const QuizContextProvider = ({children}) => {

    const [state , dispatch ] = useReducer(QuizReducer ,initialState )

    return (
        <QuizContext.Provider value={{state , dispatch}}>
            {children}
        </QuizContext.Provider>
    )

}

export const useQuiz = () => useContext(QuizContext);