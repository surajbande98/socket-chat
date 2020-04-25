import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TwitterIcon } from "../../../components/twitterSvg";
import Spinner from "../../../shared/UI/Spinner/Spinner";
import Input from "../../../shared/UI/Input/Input";
import Button from "../../../shared/UI/Button/Button";
import Error from "../../../shared/UI/Error/Error";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import * as helper from "../../../shared/services/helper.service";

class SignupComponent extends Component {
  state = {
    signupForm: {
      firstName: {
        type: "input",
        config: {
          name: "firstName",
          id: "firstName",
          type: "text",
          autoComplete: "off",
          placeholder: "Firstname"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      },
      lastName: {
        type: "input",
        config: {
          name: "lastName",
          id: "lastName",
          type: "text",
          autoComplete: "off",
          placeholder: "Lastname"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      },
      userName: {
        type: "input",
        config: {
          name: "userName",
          id: "userName",
          type: "text",
          autoComplete: "off",
          placeholder: "UserName"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      },
      email: {
        type: "input",
        config: {
          name: "email",
          id: "email",
          type: "text",
          autoComplete: "off",
          placeholder: "Email Id"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      },
      mobileNumber: {
        type: "input",
        config: {
          name: "mobileNumber",
          id: "mobileNumber",
          type: "number",
          autoComplete: "off",
          placeholder: "Mobile Number"
        },
        value: "",
        validation: {
          required: true,
          minLength: 10
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      },
      password: {
        label: "Password",
        type: "input",
        config: {
          name: "Password",
          id: "Password",
          type: "password",
          autoComplete: "off",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8
        },
        validationMessage: "Field is required",
        valid: false,
        touched: false
      }
    },
    isFormValid: false
  };

  inputChangeHandler = (event, id) => {
    const upForm = { ...this.state.signupForm };

    const formElem = { ...upForm[id] };

    formElem.value = event.target.value;

    formElem.valid = helper.checkValidity(formElem.value, formElem.validation);

    formElem.touched = true;

    upForm[id] = formElem;

    let formValid = true;

    for (let ele in upForm) {
      formValid = formValid && upForm[ele].valid;
    }

    this.setState({
      isFormValid: formValid,
      signupForm: upForm
    });
  };

  goToLogin = () => {
    this.props.history.push('/');
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    if (!this.state.isFormValid) {
      return false;
    }

    const requestData = {};

    for(let identifier in this.state.signupForm) {
      if(identifier === 'mobileNumber') {
        requestData[identifier] = +this.state.signupForm[identifier].value;  
      } else {
        requestData[identifier] = this.state.signupForm[identifier].value;
      }
    }

    this.props.onSignup(this.props, requestData);
  }

  render() {
    const elemsArray = [];

    for (let key in this.state.signupForm) {
      elemsArray.push({
        id: key,
        config: this.state.signupForm[key]
      });
    }

    let form = <Spinner />;

    let error = null;
    if (this.props.error) {
      error = this.state.errorMessage + "(" + this.props.error.code + ").";
      error = <Error message={error} />;
    }

    if (!this.props.loading) {
      form = (
        <Aux>
          <div className="container loginPage">
            <div className="svgHolder">
              <TwitterIcon />
              <h2>Create your account</h2>
            </div>
            <div className="login">
              <form onSubmit={this.onSubmitHandler}>
                {elemsArray.map(ele => (
                  <Input
                    label={ele.config.label}
                    key={ele.id}
                    type={ele.config.type}
                    config={ele.config.config}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation}
                    touched={ele.config.touched}
                    errorMessage={ele.config.validationMessage}
                    changed={event => this.inputChangeHandler(event, ele.id)}
                  />
                ))}

                <div className="buttonWrap">
                  <Button
                    btnType="btn-success" 
                    type="submit"
                    clicked={this.goToLogin}>
                    Back
                  </Button>
                  <Button
                    btnType="btn-success"
                    type="submit"
                    disabled={!this.state.isFormValid}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Aux>
      );
    }

    return form;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.signup.loading,
    error: state.signup.error,
    isUserCreated: state.signup.isUserCreated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (props, userData) => dispatch(actions.signup(props, userData))
  };
};

SignupComponent.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupComponent);
