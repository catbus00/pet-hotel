import { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  }
  return "";
};

const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};

function Register() {
  // schema
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState(true);
  const [avatar, setAvatar] = useState("");

  // validation and mode
  const [mode, setMode] = useState("register");
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  // const [errors, setErrors] = useState({
  //   email: "",
  //   password: "",
  //   confirm: "",
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    // const invalidEmail = emailValidator(email);
    // const invalidPassword = passwordValidator(password);
    // const invalidConfirmPassword = confirmPasswordValidator(password, confirm);

    // setErrors({
    //   email: invalidEmail,
    //   password: invalidPassword,
    //   confirm: invalidConfirmPassword,
    // });
    // if (errors.email || errors.password || errors.confirm) {
    //   return;
    // }

    const registerConfiguration = {
      method: "post",
      url: "http://localhost:3000/auth/register",
      data: {
        name,
        email,
        password,
        role,
      },
    };
    const loginConfiguration = {
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        email,
        password,
      },
    };
    console.log(registerConfiguration);
    console.log(loginConfiguration);
    axios(registerConfiguration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
    axios(loginConfiguration)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <form autoComplete="off">
        <FormControl onSubmit={(e) => handleSubmit(e)}>
          <Button
            size="small"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              setMode(mode === "register" ? "login" : "register");
            }}
          >
            {mode === "register" ? "Login" : "Register"}
          </Button>
          {mode === "register" ? (
            <TextField
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Enter your name"
              sx={{ pb: 2 }}
            />
          ) : (
            ""
          )}
          <TextField
            // error={errors.email}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={mode === "register" ? "Enter your email" : "Email"}
            sx={{ pb: 2 }}
            // onBlur={(e) => {
            //   const invalid = emailValidator(e.target.value);
            //   setErrors({ ...errors, email: invalid });
            // }}
            // helperText={errors.email}
          />
          <TextField
            // error={errors.password}
            helperText={
              mode === "register" ? "must be 8 characters long" : undefined
            }
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={mode === "register" ? "Enter your password" : "Password"}
            sx={{ pb: 1 }}
          />
          {mode === "register" ? (
            <TextField
              // error={errors.confirm}
              helperText="re-type your password above"
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              label="Confirm your password"
              sx={{ pb: 1 }}
            />
          ) : (
            ""
          )}
          {mode === "register" ? (
            <FormControlLabel
              control={
                <Switch
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ pb: 2 }}
                />
              }
              label="Customer"
            />
          ) : null}

          <Button
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default Register;
