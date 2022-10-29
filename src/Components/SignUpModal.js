import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import {useNavigate} from "react-router-dom"

// Ici test avec Boostratp 5.2 mais soucis avec modal !

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);
  // console.log(modalState, toggleModals);

  // console.log(signUp);

  const [validation, setValidation] = useState("");

  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match !");
      return;
    }

    try {
      // si await, écrire async devant fonction
      await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      // const cred = await signIn(
      //   inputs.current[0].value,
      //   inputs.current[1].value
      // );

      // formRef.current.reset();
      setValidation("");
      // console.log(cred);
      toggleModals("close");
      navigate("/private/private-home");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div className="position-absolute top-50 start-50 translate-middle bg-light w-50 rounded-3">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title m-2">Sign Up</h5>
                  <button onClick={closeModal} className="btn-close m-2"></button>
                </div>
                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="m-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Email address
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="m-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>

                    <div className="m-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Repeat Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary m-3">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
