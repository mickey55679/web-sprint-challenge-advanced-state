// ❗ You don't need to add extra action creators to achieve MVP
import { response } from "msw";
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from "./action-types"
import axios from "axios";
export const moveClockwise = () => ({ 
 type: MOVE_CLOCKWISE,
});

export const moveCounterClockwise = () => ({ 
  type: MOVE_COUNTERCLOCKWISE,
})

export const selectAnswer = (answer) => {
  // console.log(answer);
  return {
  type: SET_SELECTED_ANSWER,
  payload: answer, 
  
 }}

export const setMessage = (message) => ({
  type: SET_INFO_MESSAGE,
  payload: message,
 
 })

export const setQuiz = (quiz) => ({
  type: SET_QUIZ_INTO_STATE,
  payload: quiz, 
 })

export const inputChange = () => ({

 })

export const resetForm = () => ({ 

})

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get("http://localhost:9000/api/quiz/next")
    .then(res => 
      dispatch(setQuiz(res.data)))
    .catch(err => console.error(err))
    
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
  const { quiz_id, answer_id} = answer;
   console.log("quiz_id", quiz_id);
   console.log('answer_id', answer_id)
  //  console.log("Payload:", { quiz_id, answer_id });

  


    axios.post("http://localhost:9000/api/quiz/answer", {
      quiz_id: quiz_id,
      answer_id: answer_id,
      
    })
    .then((response) => {
      console.log('Server feedback:', response.data);
      dispatch(setMessage(response.data.message))
      
      dispatch(selectAnswer(null));
      dispatch(fetchQuiz());
    })
    .catch((error) => {
      console.error('Server error:',error);
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
