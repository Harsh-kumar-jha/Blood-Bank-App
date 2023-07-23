import React, { useState } from "react";
import InputTypes from "../form/InputTypes";
import API from "./../../../services/API";
import { useSelector } from "react-redux";
const Modal = () => {
  const [inventoryType, setInventorType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [donarEmail, setDonarEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please enter all the field properly..");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        donarEmail,
        email: user?.email,
        organization: user?.organization,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record has been add..");
        window.location.reload();
      }
    } catch (error) {
      console.log(`Error occur at Modal component : ${error}`);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type : &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventorType(e.target.value)}
                    className="form-check-item"
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"out"}
                    onChange={(e) => setInventorType(e.target.value)}
                    className="form-check-item"
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onSelect={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              <InputTypes
                labelText={"Donar Email"}
                labelFor={"donarEmail"}
                inputType={"email"}
                value={donarEmail}
                onChange={(e) => setDonarEmail(e.target.value)}
              />
              <InputTypes
                labelText={"Quantity"}
                labelFor={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
