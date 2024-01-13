import React from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)
  const dispatch = useDispatch()
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    // console.log(id, value);
    dispatch(actionCreators.inputChange(id, value))
  }

  const onSubmit = evt => {
   evt.preventDefault()
   dispatch(
     actionCreators.postQuiz({
       question_text: newQuestion,
       true_answer_text: newTrueAnswer,
       false_answer_text: newFalseAnswer,
     })
   );
  }
   const isDisabled =
     !newQuestion ||
     newQuestion.trim().length < 2 ||
     !newTrueAnswer ||
     newTrueAnswer.trim().length < 2 ||
     !newFalseAnswer ||
     newFalseAnswer.trim().length < 2;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
