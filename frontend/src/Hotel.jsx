import {
  Button,
  Select,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import VerticalBox from "./components/VerticalBox";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputTextField from "./components/InputTextField";

// Add Hotel Function
function AddHotel({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      year: "",
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <VerticalBox>
          <InputTextField
            control={control}
            error={errors.name}
            rules={{
              required: "The name of your hotel is required.",
              maxLength: {
                value: 50,
                message: "The maximum length is 50 characters.",
              },
            }}
            name="name"
            label="Hotel Name"
            placeholder="Hotel Name"
          />
          <InputTextField
            control={control}
            error={errors.name}
            rules={{
              required: "The description of your hotel is required.",
              maxLength: {
                value: 300,
                message: "The maximum length is 300 characters.",
              },
            }}
            name="description"
            label="Company Description"
            placeholder="Company Description"
          />
          <InputTextField
            control={control}
            error={errors.name}
            rules={{
              required: "The year of your hotel is required.",
              maxLength: {
                value: 4,
                message: "The maximum length is 4 characters.",
              },
            }}
            name="year"
            label="Year Founded"
            placeholder="Year Founded"
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </VerticalBox>
      </form>
    </>
  );
}

export default AddHotel;
