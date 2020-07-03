import React from 'react';
import ThemeContext from '../../app/theme';
import './header.scss';

const RightBar = (props) => {
  const getTheme = (e) => {
    localStorage.setItem('theme', e.target.value);
    return e.target.value;
  };

  const hide = (e) => {
    if (e.currentTarget === e.target) {
      props.hide();
    }
  };

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div
          className={`rightbar-overlay ${props.showRightBar ? 'rightbar-overlay-enabled' : ''}`}
          tabIndex="0"
          onClick={hide}
        >
          <div className={`right-bar ${props.showRightBar ? 'right-bar-enabled' : ''}`}>
            <div className="rightbar-title">
              <a href="#" className="right-bar-toggle float-right" onClick={props.hide}>
                <i className="dripicons-cross noti-icon" />
              </a>
              <h5 className="m-0">Settings</h5>
            </div>
            <div className="rightbar-content" data-simplebar="init">
              <div className="simplebar-content" style={{ padding: '0px' }}>

                <div className="p-3">

                  <h5 className="mt-3">Color Scheme</h5>
                  <hr className="mt-1" />

                  <div className="custom-control custom-switch mb-1">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="color-scheme-mode"
                      value="light"
                      id="light-mode-check"
                      checked={theme === 'light' ? 'checked' : ''}
                      onChange={(e) => toggleTheme(getTheme(e))}
                    />
                    <label className="custom-control-label" htmlFor="light-mode-check">Light Mode</label>
                  </div>

                  <div className="custom-control custom-switch mb-1">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="color-scheme-mode"
                      value="dark"
                      id="dark-mode-check"
                      checked={theme === 'dark' ? 'checked' : ''}
                      onChange={(e) => toggleTheme(getTheme(e))}
                    />
                    <label className="custom-control-label" htmlFor="dark-mode-check">Dark Mode</label>
                  </div>

                  <h5 className="mt-4">Left Sidebar</h5>
                  <hr className="mt-1" />
                  <div className="custom-control custom-switch mb-1">
                    <input type="radio" className="custom-control-input" name="theme" value="default" id="default-check" defaultChecked />
                    <label className="custom-control-label" htmlFor="default-check">Default</label>
                  </div>

                  <button className="btn btn-primary btn-block mt-4" id="resetBtn">Reset to Default</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
export default RightBar;
