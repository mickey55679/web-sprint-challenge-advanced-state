import React from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)
  const dispatch = useDispatch()

  const onChange = evt => {

  }

  const onSubmit = evt => {
   evt.preventDefault()
   dispatch(
     actionCreators.postQuiz({
       question_text: 'kjjio',
       true_answer_text: 'jkhiuh',
       false_answer_text: 'jkhiu'
     })
   );
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
