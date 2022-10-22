import { userServiceFactory } from "clientServices/userService";
import useUser from "lib/useUser";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.scss";

const Signup = () => {
  const userService = userServiceFactory();

  const { user, mutateUser } = useUser({
    redirectTo: "/payLink",
    redirectIfFound: true,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repPass, setRepPass] = useState("");
  const [errorPass, setErrorPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === repPass) {
      try {
        mutateUser(await userService.login(username, password, "/api/singup"));
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      setErrorPass(true);
    }
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const repPasswordHandler = (e) => {
    setRepPass(e.target.value);
  };

  return (
    <>
      {!user ? (
        <div class="d-flex">
          <div class="spinner-border m-auto text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          {!user.isLoggedIn && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${styles.minimalist_theme} ${styles.login} d-flex flex-column justify-content-center align-items-center my-4 `}
            >
              <h1>Sing Up</h1>
              <div className={styles.hero_edit + " pt-3 mt-5"}>
                <h6>Email: </h6>
                <input
                  type="text"
                  className={`${styles.payment_btn} ${styles.hero_edit_input} d-flex justify-content-between align-items-center mb-1 text-center btn`}
                  placeholder="Email"
                  name="uname"
                  onChange={usernameHandler}
                />
                <h6>Password: </h6>
                <input
                  type="Password"
                  className={`${styles.payment_btn} ${styles.hero_edit_input} d-flex justify-content-between align-items-center mb-1 text-center btn`}

                  placeholder="Password"
                  name="psw"
                  onChange={passwordHandler}
                />
                <h6>Repite: </h6>
                <input
                  type="Password"
                  className={`${styles.payment_btn} ${styles.hero_edit_input} d-flex justify-content-between align-items-center mb-1 text-center btn`}

                  placeholder="Password"
                  onChange={repPasswordHandler}
                />

                <div className="d-flex  justify-content-center align-items-center mt-5 ">
                  <button
                    className={`${styles.payment_btn} ${styles.login_btn} ${styles.btn_primary} ${styles.btn_edit} btn`
                    }
                  >
                    Sigup
                  </button>
                </div>
                <div className="d-flex  justify-content-center align-items-center">
                  <Link href="./signup">
                    <a className={styles.link_log}>Log In</a>
                  </Link>
                </div>
                {errorPass && (
                  <p className={styles.error_log}>The password not is same</p>
                )}
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Signup;
