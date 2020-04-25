import React from "react";

const input = props => {
  let inputEl = null;

  const inputClasses = ["inputHolder"];

  switch (props.type) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
          onFocus={props.changed}
        />
      );
      break;

    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputEl = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputEl = (
        <input
          className={inputClasses}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  inputEl = (
    <div>
      {inputEl}
    </div>
  );
  return inputEl;
};

export default input;
