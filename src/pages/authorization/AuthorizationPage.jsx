import React, { useState, useContext } from 'react';
import {
  Container, Row, Card, Col,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import userServices from '../../services/user.services';
import StoreContext from '../../app/store';
import routes from '../../constants/routes';
import Loader from '../../components/loader/Loader';
import './authorizationPage.scss';

const SYMBOLS_REGEX = /[-+_@$!%*?&#.,;:[\]{}]/;

const AuthorizationPage = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(StoreContext);
  const history = useHistory();
  const { isAuthenticated, jwt, userId } = context;
  const showRegistration = () => {
    setIsRegistration(true);
  };

  const saveInStorage = (userid, userEmail, token) => {
    localStorage.setItem('userId', userid);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('JWT', token);
    context.jwt = token;
    context.userId = userid;
    context.userEmail = userEmail;
  };

  const redirectToMain = () => {
    history.push(routes.LANDING);
  };

  const onSingInSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.emailaddress.value;
    (async () => {
      try {
        const signInData = await userServices.signIn(email, password);
        saveInStorage(signInData?.userId, email, signInData?.token);
        context.isAuthenticated = true;
        redirectToMain();
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
    setIsLoading(true);
  };

  const onRegistrationSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.emailaddress.value;
    (async () => {
      try {
        const user = await userServices.createUser(email, password);
        const signInData = await userServices.signIn(email, password);
        saveInStorage(user?.id, email, signInData?.token);
        context.isAuthenticated = true;
        redirectToMain();
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
    setIsLoading(true);
  };

  const showSignIn = () => {
    setIsRegistration(false);
  };

  const checkRepeatPassword = () => {
    const password = document.querySelector('#password');
    const passwordRepeat = document.querySelector('#password_repeat');
    let passswordValid = false;
    if (password.value.length <= 8 && SYMBOLS_REGEX.test(password.value) && /[0-9]/.test(password.value) && /[A-Z]/.test(password.value) && /[a-z]/.test(password.value)) {
      passswordValid = true;
    }
    const emptyString = password.value
      .replace(/[a-z]/gi, '')
      .replace(/[0-9]/g, '')
      .replace(new RegExp(SYMBOLS_REGEX, 'g'), '');
    if (emptyString) {
      passswordValid = false;
    }

    if (!passswordValid) {
      password.setCustomValidity('Password must contain at least 8 characters, one number and one special character from + -_ @ $!% *? & #.,;: [] {}');
    } else {
      password.setCustomValidity('');
    }

    if (passwordRepeat.value !== password.value) {
      passwordRepeat.setCustomValidity('The passwords do not match');
    } else {
      passwordRepeat.setCustomValidity('');
    }
  };

  if (isAuthenticated || (userId && jwt)) {
    redirectToMain();
  }

  return (
    <>
      <>
        { isLoading ? <Loader /> : '' }
      </>
      <div className="authorize__container">
        <Container>
          <Row className="justify-content-center">
            <h1>RsLang</h1>
          </Row>
          { !isRegistration ? (
            <>
              <Row className="justify-content-center">
                <Col lg={5}>
                  <Card>
                    <Card.Body>
                      <div className="w-75 m-auto">
                        <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Sign In</h4>
                        <p className="text-center text-muted mb-4">Enter your email address and password to access RsLang.</p>
                        <form onSubmit={onSingInSubmit}>
                          <div className="form-group">
                            <label htmlFor="emailaddress">Email address</label>
                            <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group input-group-merge">
                              <input type="password" id="password" className="form-control" required placeholder="Enter your password" />
                            </div>
                          </div>
                          <div className="form-group mb-0 text-center button__submit">
                            <button className="btn btn-primary" type="submit"> Log In </button>
                          </div>
                        </form>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="link__container">
                <Col className="text-center">
                  <button type="button" className="text-muted sign__up" onClick={showRegistration}>
                    Don&apos;t have an account? Sign Up
                  </button>
                </Col>
              </Row>
            </>
          )
            : (
              <>
                <Row className="justify-content-center">
                  <Col lg={5}>
                    <Card>
                      <Card.Body>
                        <div className="w-75 m-auto">
                          <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Sign Up</h4>
                          <p className="text-center text-muted mb-4">Enter your email address and password.</p>
                          <form onSubmit={onRegistrationSubmit}>
                            <div className="form-group">
                              <label htmlFor="emailaddress">Email address</label>
                              <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="password"
                                  id="password"
                                  className="form-control"
                                  placeholder="Enter your password"
                                  required
                                  onInput={checkRepeatPassword}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="password_repeat">Confirm password</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="password"
                                  id="password_repeat"
                                  className="form-control"
                                  placeholder="Repeat your password"
                                  required
                                  onInput={checkRepeatPassword}
                                />
                              </div>
                            </div>
                            <div className="form-group mb-0 text-center button__submit">
                              <button className="btn btn-primary" type="submit"> Sign Up </button>
                            </div>
                          </form>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="link__container">
                  <Col className="text-center">
                    <button type="button" className="text-muted sign__up" onClick={showSignIn}>
                      Return to Sign In
                    </button>
                  </Col>
                </Row>
              </>
            )}
          <form />
        </Container>
      </div>
    </>
  );
};

export default AuthorizationPage;
