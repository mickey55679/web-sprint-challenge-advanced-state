import React from "react";
import { connect, useDispatch } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
  // const [localQuestion, setLocalQuestion] = useState(
  //   localStorage.getItem("newQuestion") || newQuestion
  // );
  // const [localTrueAnswer, setLocalTrueAnswer] = useState(
  //   localStorage.getItem("newTrueAnswer") || newTrueAnswer
  // );
  // const [localFalseAnswer, setLocalFalseAnswer] = useState(
  //   localStorage.getItem("newFalseAnswer") || newFalseAnswer
  // );

  const onChange = (evt) => {
    const { name, value } = evt.target;
    // console.log(id, value);
    

    dispatch(actionCreators.inputChange({...props.form, [name]:value}));

    // Update local state when input fields change
    // if (id === "newQuestion") setLocalQuestion(value);
    // if (id === "newTrueAnswer") setLocalTrueAnswer(value);
    // if (id === "newFalseAnswer") setLocalFalseAnswer(value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      actionCreators.postQuiz({
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      })
    );
  };

  const isDisabled =
    !newQuestion ||
    newQuestion.trim().length < 1 ||
    !newTrueAnswer ||
    newTrueAnswer.trim().length < 1 ||
    !newFalseAnswer ||
    newFalseAnswer.trim().length < 1;
  // console.log("newQuestion:", newQuestion);
  // console.log("newTrueAnswer:", newTrueAnswer);
  // console.log("newFalseAnswer:", newFalseAnswer);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={newQuestion}
        name='newQuestion'

      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={newTrueAnswer}
        name='newTrueAnswer'
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={newFalseAnswer}
        name='newFalseAnswer'
      />
      <button id="submitNewQuizBtn" disabled={isDisabled}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
 form: state.form

});

export default connect(mapStateToProps, actionCreators)(Form);
