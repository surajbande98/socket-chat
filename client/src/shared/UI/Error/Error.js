import React, { Component } from "react";

import "./Error.css";

class Error extends Component {
//   createMarkup() {
//     return "Someting went wrong!!!";
//   }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="feedback-error">
            <div className="alert alert-danger">
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <ul className="list-unstyled m-0">
                <li className="alert-message">
                  <i className="fa message-icon"></i>
                  {/* <i className="fa check-circle" aria-hidden="true"></i> */}
                  <span
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: this.props.message }}
                  ></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
