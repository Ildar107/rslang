import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../constants/routes';
import StoreContext from '../../app/store';
import RightBar from './RightBar';
import './header.scss';

const Header = () => {
  const [showAccountDrop, setShowAccountDrop] = useState(false);
  const [showRightBar, setshowRightBar] = useState(false);
  const context = useContext(StoreContext);
  const history = useHistory();

  const handleOnAccountClick = (e) => {
    e.preventDefault();
    setShowAccountDrop(!showAccountDrop);
  };

  const handleOnSettingClick = (e) => {
    e.preventDefault();
    setshowRightBar(!showRightBar);
  };

  const closeRightBar = () => {
    if (showRightBar) {
      setshowRightBar(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    context.clearAuthParams();
    context.isAuthenticated = false;
    history.push(routes.AUTHORIZE);
  };

  const closeAccountDrop = () => {
    if (showAccountDrop) {
      setShowAccountDrop(false);
    }
  };

  const handleBurgeMenuClick = (e) => {
    e.currentTarget.classList.toggle('change');
    document.querySelector('.left-side-menu')?.classList.toggle('show');
  };

  return (
    <>
      <div className="navbar-custom topnav-navbar topnav-navbar-dark">
        <div className="container-fluid nav__menu">
          <Link to={routes.LANDING} className=" topnav-logo">
            <h4>RsLang</h4>
          </Link>
          <div className="burger-menu" onClick={handleBurgeMenuClick}>
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
          <ul className="nav-bar list-unstyled topbar-right-menu float-right mb-0">

            <li className="notification-list">
              <a className="nav-link right-bar-toggle settings-nav-link" href="" onClick={handleOnSettingClick}>
                <i className="dripicons-gear noti-icon" />
              </a>
            </li>

            <li
              className={`dropdown notification-list ${showAccountDrop ? 'show' : ''}`}
              onBlur={closeAccountDrop}
            >
              <a
                className="nav-link dropdown-toggle nav-user arrow-none mr-0"
                data-toggle="dropdown"
                id="topbar-userdrop"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={handleOnAccountClick}

              >
                <span className="account-user-avatar">
                  <img src="./images/england.png" alt="" className="rounded-circle" />
                </span>
                <span>
                  <span className="account-user-name">{context.userEmail}</span>
                </span>
              </a>
              <div
                className={`dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown ${showAccountDrop ? 'show' : ''} `}
                aria-labelledby="topbar-userdrop"
              >
                <a href="" className="dropdown-item notify-item" id="my-account">
                  <i className="mdi mdi-account-circle mr-1" />
                  <span>My Account</span>
                </a>

                <a href="" className="dropdown-item notify-item" id="logout" onMouseDown={logout}>
                  <i className="mdi mdi-logout mr-1" />
                  <span>Logout</span>
                </a>

              </div>
            </li>

          </ul>

        </div>
      </div>
      <RightBar showRightBar={showRightBar} hide={closeRightBar} />
    </>
  );
};
export default Header;

// const NavLink = (link, text) => (
//   <LinkContainer to={link} exact>
//     <Nav.Link eventKey={link}>{text}</Nav.Link>
//   </LinkContainer>
// );
