import { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Switch,
  Grid,
  Typography,
} from "@mui/material";
import axios, { HttpStatusCode } from "axios";
import { Secure } from "./types/Secure";
import { API } from "./env";

// Register and Login Function

Auth.propTypes = {
  ...Secure,
};

function Auth({ setUser, setToken, navigate }) {
  // schema
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(true);
  const [responseError, setResponseError] = useState(undefined);

  // validation and mode
  const [mode, setMode] = useState("login");
  const [requesting, setRequesting] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const configuration = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    url: `${API}/auth/${mode}`,
    data: { email, password },
  };

  if (mode === "register") {
    configuration.data.name = name;
    configuration.data.role = role;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setRequesting(true);
    const invalidName = nameValidator(name);
    const invalidEmail = emailValidator(email);
    const invalidPassword = passwordValidator(password);
    const invalidConfirmPassword = confirmPasswordValidator(
      password,
      confirmPassword,
    );

    setErrors({
      name: invalidName,
      email: invalidEmail,
      password: invalidPassword,
      confirmPassword: invalidConfirmPassword,
    });
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }

    if (mode === "register") {
      configuration.data.name = name;
      configuration.data.role = role;
    }

    axios(configuration)
      .then((result) => {
        if (result.status === HttpStatusCode.Ok) {
          const { user, token, role } = result.data;

          sessionStorage.setItem(
            "authUser",
            JSON.stringify({ name: user, email, role }),
          );
          sessionStorage.setItem("authToken", token);
          setUser({ name: user, email, role });
          setToken(token);
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.response && e.response.data && e.response.data.message) {
          console.log(e.response.data.message);
          setResponseError(e.response.data.message);
        } else {
          console.log("Unexpected error occurred");
          setResponseError("Unexpected error occurred");
        }
        navigate("/");
      })
      .finally(() => setRequesting(false));
  };
  return (
    <>
      <form autoComplete="off">
        <FormControl onSubmit={handleSubmit}>
          <Button
            size="small"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              setMode(mode === "register" ? "login" : "register");
            }}
          >
            {mode === "Register" ? "Login" : "Don't have an account? Sign up."}
          </Button>
          {mode === "register" ? (
            <>
              <TextField
                required
                error={!!errors.name}
                id="name"
                type="name"
                autoComplete="given-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Enter your name"
                sx={{ pb: 2 }}
                onBlur={(e) => {
                  const invalid = nameValidator(e.target.value);
                  setErrors({ ...errors, name: invalid });
                }}
                helperText={errors.name}
              />
            </>
          ) : (
            ""
          )}
          <TextField
            required
            error={!!errors.email}
            id="email"
            type="email"
            autoComplete="username"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={mode === "register" ? "Enter your email" : "Email"}
            sx={{ pb: 2 }}
            onBlur={(e) => {
              const invalid = emailValidator(e.target.value);
              setErrors({ ...errors, email: invalid });
            }}
            helperText={errors.email}
          />
          <TextField
            required
            error={!!errors.password}
            helperText={
              mode === "register" ? "Password must be 8 characters long" : ""
            }
            type="password"
            autoComplete="new-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={mode === "register" ? "Enter your password" : "Password"}
            sx={{ pb: 1 }}
            onBlur={(e) => {
              const invalid = passwordValidator(e.target.value);
              setErrors({
                ...errors,
                password: invalid,
              });
            }}
          />

          {mode === "register" ? (
            <TextField
              required
              error={!!errors.confirmPassword}
              helperText="Passwords do not match"
              type="password"
              autoComplete="new-password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm your password"
              sx={{ pb: 1 }}
              onBlur={(e) => {
                const invalid = confirmPasswordValidator(
                  password,
                  e.target.value,
                );
                setErrors({ ...errors, confirmPassword: invalid });
              }}
            />
          ) : (
            ""
          )}
          {mode === "register" ? (
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Customer</Grid>
              <Grid item>
                <Switch
                  id="role"
                  name="role"
                  color="secondary"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.checked);
                  }}
                  sx={{
                    pb: 2,
                    "& .MuiSwitch-track": {
                      backgroundColor: "green",
                    },
                  }}
                />
              </Grid>
              <Grid item>Hotel Owner</Grid>
            </Grid>
          ) : (
            ""
          )}

          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={requesting}
          >
            Submit
          </Button>

          <Typography sx={{ ml: 2 }} variant="body1">
            {responseError}
          </Typography>
        </FormControl>
      </form>
    </>
  );
}

// frontend validation checks

// Allows spaces between words but not symbols or numbers, also not all spaces
const nameValidator = (name) => {
  if (!name) {
    return "Name is required";
  } else if (!new RegExp(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/).test(name)) {
    return "Incorrect name format";
  }
  return "";
};

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

const confirmPasswordValidator = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return undefined;
};

export default Auth;
