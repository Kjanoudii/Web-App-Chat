// import { useState } from "react";

export default function Popup(prop) {
  const { changeBackGround, styles, setActiveStyle } = prop;

  const handleThemeChange = (event) => {
    const { value } = event.target;

    changeBackGround(value);

    setActiveStyle(value);
    console.log(value);
  };

  const openSettings = () => prop.setTrigger(!prop.trigger);

  return (
    prop.trigger && (
      <div className="popup">
        <div className="popup-content-blue" style={styles}>
          <h2>Settings</h2>

          <br />
          <div className="contacts-theme">
            <h4>Change Theme</h4>
            <input
              type="radio"
              id="red-theme"
              name="theme"
              value="red"
              onChange={handleThemeChange}
            />
            <label htmlFor="red-theme">Red</label>
            <input
              type="radio"
              id="yellow-theme"
              name="theme"
              value="yellow"
              onChange={handleThemeChange}
            />
            <label htmlFor="yellow-theme">Yellow</label>
            <input
              type="radio"
              id="blue-theme"
              name="theme"
              value="blue"
              onChange={handleThemeChange}
            />
            <label htmlFor="blue-theme">Default</label>
          </div>
          <br />
          <button onClick={openSettings} className="popbtn">
            Close
          </button>
        </div>
      </div>
    )
  );
}
