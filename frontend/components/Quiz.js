import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchQuiz, selectAnswer, setQuiz } from '../state/action-creators'


function Quiz(props) {
  const {selectedAnswer, quizState} = props;
  console.log(props)
  console.log(quizState.answers[0].answers_id)

  const dispatch = useDispatch();
  const handleAnswerClick = (answer) => {
    props.selectAnswer(answer)
  };
  useEffect(() => {
   dispatch(fetchQuiz())
  }, [])
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quizState ? (
          <>
            <h2>{quizState.question}</h2>
            <div id="quizAnswers">
              <div className="answer selected" onClick={() => handleAnswerClick(quizState.answers[0])}>
                {quizState.answers[0].text}
                <button>
                  {quizState.answers[0].answer_id === selectedAnswer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className="answer" onClick={() => handleAnswerClick(quizState.answers[1])}>
                {quizState.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = state => ({
  selectedAnswer: state.selectedAnswer,
  quizState: state.quiz,


})

export default connect(mapStateToProps, {selectAnswer, setQuiz})(Quiz)