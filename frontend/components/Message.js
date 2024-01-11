import React from 'react'
import { connect } from 'react-redux'
import { setMessage } from '../state/action-creators'
function Message({serverMessage}) {
  
  return <div id="message">{serverMessage}</div>
}


const mapStateToProps = state => {
  return {
serverMessage: state.infoMessage
  }
}
export default connect(mapStateToProps, {setMessage})(Message);

