import React from "react";

import './Button.css';

const Button = props => {
    let classes = ["btn"];

    if(props.classes) {
      classes.push(props.classes);
    }
    if(props.btnType === 'btn-link') {
        classes = ['btn '+ props.btnType];
        if(props.classes) {
          classes.push(props.classes);
        }
    } else {
        classes.push(props.btnType);
    }


  return (
    <button
      type={props.type}
      className={classes.join(" ")}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
