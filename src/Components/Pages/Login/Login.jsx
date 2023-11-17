import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user2");
    if (loggedInUser) {
      // User is already authenticated, redirect to the desired page
      navigate("/home");
    } else {
      navigate("/")
    }
  }, [navigate]);



  const validation = (e) => {
    e.preventDefault();

    if (user_name.length === 0 || password.length === 0) {
      setError(true);
    }

    if (user_name && password) {
      login();
    }

    if (user_name.length === 0 || password.length === 0) {
      setError(true);
    }

    // if (user_name == "audit" && password == 1234) {
    //   navigate("/home");
    // }

    // if (user_name == "humanCapital" && password == 1234) {
    //   navigate("/humanCapital");
    // }

    // if (user_name == "legalAction" && password == 1234) {
    //   navigate("/LegalAction_Report");
    // }
    else{
      Swal.fire({
              icon: "error",
              title: "Invalid User",
              confirmButtonColor: "red",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok!",
              showCloseButton: true,
              showClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
    }
  };

  const login = () => {
    if (!user_name || !password) {
      Swal.fire({
        icon: "error",
        title: "Please Fill All Information",
        confirmButtonColor: "red",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok!",
        showCloseButton: true,
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
    } else {
      axios
        .post("http://10.57.40.130:8022/api/login", {
          user_name,
          password,
        })
        .then((response) => {
          if (response.data.error) {

            console.log(response)
            Swal.fire({
              icon: "error",
              text: response.data.error,
              showCancelButton: true,
              confirmButtonColor: "#00cc44",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok!",
              showCloseButton: true,
              showClass: {
                popup: "animate__animated animate__shakeX",
              },
            });
          } else {

            //console.log(response)
            Swal.fire({
              title: "Success WellCome To  Fraud Managment System",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            const token = response;
            //console.log(response.data)

            const data = response.data;
            sessionStorage.setItem("user2", JSON.stringify(data, "user"));

            //sessionStorage.setItem("user2", JSON.stringify(response.data, "user"));
            setData(response);

            if (response.data.role === "audit") {

              navigate("/home");
            } else if (response.data.role === "CEO") {
              navigate("/dashboard");

            } else if (response.data.role === "HR") {
              navigate("/humanCapital");

            } else if (response.data.role === "legal") {
              navigate("/LegalAction_Report");

            } else if (response.data.role === "TDM") {
              navigate("/TalentManagment");

            } else if (response.data.role === "Benefit") {
              navigate("/Benefit_tdm");
            } else {
              navigate("/")
            }
          }
        });
    }
  };

  return (
    <>
      {/*-------------- Login page Form ---------------*/}
      <div className={styles.awach}>
        <div className={styles.signin} style={{ marginTop: "50px" }}>
          {/*-------------- Left side ---------------*/}

          {/*-------------- Right side ---------------*/}
          <div className={styles.right_login}>
            <form className={styles.signup_right} onSubmit={validation}>
              <div className={styles.signForm}>
                <p className={styles.loginHeader}></p>
                <label>User Name</label>
                <input
                  type="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                ></input>
                {error && user_name.length <= 0 ? (
                  <span className={styles.validateText}>
                    please enter your username
                  </span>
                ) : (
                  ""
                )}
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                ></input>
                {error && password.length <= 0 ? (
                  <span className={styles.validateText}>
                    please enter your password
                  </span>
                ) : (
                  ""
                )}
                <p>Forget Password?</p>
                <button type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
