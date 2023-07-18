import React, { useState } from "react";
import InputTypes from "./InputTypes";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitButton, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              email,
              password,
              role,
              organizationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              id="donarRadio"
              name="role"
              className="form-check-input"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              id="adminRadio"
              name="role"
              className="form-check-input"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              id="hospitalRadio"
              name="role"
              className="form-check-input"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              id="organizationRadio"
              name="role"
              className="form-check-input"
              value={"organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organizationRadio" className="form-check-label">
              Organization
            </label>
          </div>
        </div>
        {/* Switch Case  */}
        {(() => {
          // eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputTypes
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputTypes
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputTypes
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organization" && (
                    <InputTypes
                      labelText={"Organization Name"}
                      labelFor={"fororganizationName"}
                      inputType={"text"}
                      name={"organizationName"}
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputTypes
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputTypes
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputTypes
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputTypes
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputTypes
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputTypes
                    labelText={"phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet ? Register<Link to="/register"> Here !</Link>
            </p>
          ) : (
            <p>
              Already have Account ? Login <Link to="/login"> Here !</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
