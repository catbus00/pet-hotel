import { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";

function Register() {
  let [user, setUser] = useState({ email: undefined, password: undefined });
  let [mode, setMode] = useState("register");
  return (
    <>
      <form autoComplete="off">
        <FormControl>
          <TextField
            id="email"
            label={mode === "register" ? "Enter your email" : "Email"}
            sx={{ pb: 2 }}
          />
          <TextField
            helperText={
              mode === "register" ? "must be 8 characters long" : undefined
            }
            id="password"
            label={mode === "register" ? "Enter your password" : "Password"}
            sx={{ pb: 1 }}
          />
          {mode === "register" ? (
            <TextField
              helperText="re-type your password above"
              id="confirm"
              label="Confirm your password"
              sx={{ pb: 1 }}
            />
          ) : (
            ""
          )}
          <Button>Submit</Button>
          <Button
            onClick={() => {
              setMode(mode === "register" ? "login" : "register");
            }}
          >
            {mode === "register" ? "Login" : "Register"}
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default Register;
