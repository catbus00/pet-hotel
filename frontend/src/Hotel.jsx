import { Button } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VerticalBox from "./components/VerticalBox";
import { useForm } from "react-hook-form";
import InputTextField from "./components/InputTextField";
import PropTypes from "prop-types";
import { Hotel } from "./types/Hotel";
import { API } from "./env";

// Add Hotel Function
function AddHotel({ hotel, token }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: hotel ? hotel.name : "",
      description: hotel ? hotel.description : "",
      year: hotel ? hotel.year : "",
    },
  });
  const today = dayjs();
  const onSubmit = () => {
    console.log(`on submit hotel`);
    if (!hotel) {
      // TODO: this is an Add Hotel
    } else {
      // const configuration = {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   method: "patch",
      //   url: `${API}/hotels/${selectedHotel._id}`,
      // };
    }
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
              value={today}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            type="submit"
            onClick={() => handleSubmit}
          >
            Submit
          </Button>
        </VerticalBox>
      </form>
    </>
  );
}

AddHotel.propTypes = {
  token: PropTypes.string,
  hotel: PropTypes.shape(Hotel),
};

export default AddHotel;
