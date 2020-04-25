import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Login.css";

import {TwitterIcon} from '../../../components/twitterSvg';
import Spinner from "../../../shared/UI/Spinner/Spinner";
import Input from "../../../shared/UI/Input/Input";

import Button from "../../../shared/UI/Button/Button";

import Error from "../../../shared/UI/Error/Error";

import Aux from "../../../hoc/Aux/Aux";

import * as actions from "../../../store/actions/index";

import * as helper from '../../../shared/services/helper.service';

import { connect } from "react-redux";

class LoginComponent extends Component {
  state = {
    loginForm: {
      userName: {
        label: "User ID",
        type: "input",
        config: {
          name: "userName",
          id: "UserId",
          type: "text",
          autoComplete: "off",
          placeholder: "User Name"
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

    errorMessage:
      "Email does not exists",
    isFormValid: false
  };

  onSubmitHandler = event => {
    event.preventDefault();

    if (!this.state.isFormValid) {
      return false;
    }

    const requestData = {
      email:  this.state.loginForm["userName"].value,
      password: this.state.loginForm["password"].value
    };

    this.props.onLogin(
      requestData,
      this.props
    );
  };

  inputChangeHandler = (event, id) => {
    const upForm = { ...this.state.loginForm };

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
      loginForm: upForm
    });
  };

  goToSignupHandler = () => {
    this.props.history.push('/signup');
  };

  render() {
    const elemsArray = [];

    for (let key in this.state.loginForm) {
      elemsArray.push({
        id: key,
        config: this.state.loginForm[key]
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
              <h2>Log in to Twitter</h2>
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
                    disabled={!this.state.isFormValid}
                  >
                    Login
                  </Button>
                  <Button
                    btnType="btn-success"
                    type="submit"
                    clicked={this.goToSignupHandler}
                  >
                    Signup
                  </Button>
                </div>
              </form>
              {this.props.error && <p className="danger-text">{this.props.error}</p>}
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
    loading: state.login.loading,
    error: state.login.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (data, props) => dispatch(actions.login(data, props))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
