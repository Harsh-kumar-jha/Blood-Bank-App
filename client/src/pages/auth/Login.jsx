import React from "react";
import InputTyes from "../../components/shared/form/InputTyes";

const Login = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8 form-banner">
          <img src="./assets/images/banner1.jpg" alt="Login page" />
        </div>
        <div className="col-md-4 form-container">
          <form>
            <InputTyes
              labelText={"email"}
              labelFor={"for Email"}
              inputType={"email"}
              name={"email"}
            />
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
