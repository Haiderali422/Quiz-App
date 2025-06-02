import axios from 'axios';


export  const FetchQuestions = async () => {

        const res = await axios.get('http://localhost:4000/questions');
        return res.data;
}