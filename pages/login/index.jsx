import styles from "../../styles/Home.module.scss";
import { useState } from "react";
import { userServiceFactory } from "clientServices/userService";
import useUser from "lib/useUser";
import { useEffect } from "react";
import Link from "next/link";

const Login = () => {
  const userService = userServiceFactory();

  const { user, mutateUser } = useUser({
    redirectTo: "/payLink",
    redirectIfFound: true,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorLog, setErrorLog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutateUser(await userService.login(username, password, "/api/auth"));
    } catch (error) {
      alert(error.response.data.error);
    }

    setErrorLog(true);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {!user ? (
        
        <div className="d-flex">
          <div className="spinner-border m-auto text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          {!user.isLoggedIn && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.minimalist_theme} ${styles.login} d-flex flex-column justify-content-center align-items-center my-4 `}
            
            >
              <h1>Log In</h1>
              <div className={styles.hero_edit + " pt-3 mt-5"}>
                <h6>Email: </h6>
                <input
                  type="text"
                  className={` ${styles.payment_btn}  ${styles.hero_edit_input}  d-flex justify-content-between align-items-center mb-1 text-center btn`}

                  name="uname"
                  onChange={usernameHandler}
                  placeholder="Email"
                />
                <h6>Password: </h6>
                <input
                  type="Password"
                  className={`${styles.payment_btn}  ${styles.hero_edit_input} d-flex justify-content-between align-items-center mb-1 text-center btn`}

                  name="psw"
                  onChange={passwordHandler}
                  placeholder="Password"
                />

                <div className="d-flex  justify-content-center align-items-center mt-5">
                  <button
                    
                    className={`${styles.payment_btn} ${styles.login_btn} ${styles.btn_primary} ${styles.btn_edit} btn`}
                  >
                    Login
                  </button>
                </div>
                <div className="d-flex  justify-content-center align-items-center">
                  <Link href="./signup">
                    <a className={styles.link_log}>Create Account</a>
                  </Link>
                </div>

                {errorLog && (
                  <p className={styles.error_log}>
                    The email and/or password is incorrect
                  </p>
                )}
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Login;
