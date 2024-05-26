import "./App.css";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import myImage from "../src/smile.png"

function App() {
  const [values, setValues] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [submitCount, setSubmitCount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!values.email) {
      errors.email = "Access Token is required";
      valid = false;
    } 
     if (values.email && values.email !== "secure123") {
      errors.email = "Access Token is invalid";
      valid = false;
    }
    if(values.email && values.email === "secure123"){
      errors.email = "Access Token is valid!!!";
      valid = true;
    }

    setErrors(errors);
    setIsValid(valid);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form is valid");
      // Handle form submission
    }
    setSubmitCount(submitCount + 1);
  };

  useEffect(() => {
    if (errors.email) {
      setShake(true);
      setTimeout(() => setShake(false), 300); // Duration of the shake animation
    }
  }, [errors]);

  return (
    <>
    {isValid ? (
      <div className="success-screen">
        
          <div>
            <img src={myImage} alt="My Example" style={{ width: "90px", height: "50px", marginLeft:"13px", marginBottom: "30px" }} />
          </div>
          <div className="success-modal">
            <h1>Congratulations Adventurer!!!</h1>
            <h4>You have successfully passed this stage.</h4>
          </div>
  
      </div>
    ) : submitCount < 3 ? (
      <div>
        <form onSubmit={handleSubmit} className="form">
          <TypeAnimation
            sequence={[
              "Enter Code:", 1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: 50, display: "block", paddingBottom:"20px", color:"white" }}
            repeat={Infinity}
          />

          <div className={`form-group ${errors.email ? "error" : ""}  ${shake ? "shake" : ""}`}>
            <input
              type="password"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <h3>
          {errors.email && <span className="bottom-text">{errors.email}</span>}
        </h3>
      </div>
    ) : (
      <div className="game-over">
        <h1>Game Over</h1> 
        <br/>
        <p>You have failed to correctly guess the access code! Pathetic!!!</p>
      </div>
    )}
  </>
  );
}

export default App;


