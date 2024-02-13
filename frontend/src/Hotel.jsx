import { Button } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VerticalBox from "./components/VerticalBox";
import { useForm } from "react-hook-form";
import InputTextField from "./components/InputTextField";
import { Authenticated } from "./types/Authentication";

// Add Hotel Function
function AddHotel({ user }) {
  const {
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
  const today = dayjs();
  const onSubmit = (data) => {
    console.log("on submit hotel data", data);
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Year Founded"}
              views={["year"]}
              name="year"
              sx={{ marginBottom: "16.5px" }}
              maxDate={today}
            />
          </LocalizationProvider>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </VerticalBox>
      </form>
    </>
  );
}

AddHotel.propTypes = {
  ...Authenticated,
};

export default AddHotel;
