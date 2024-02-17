import { Button } from "@mui/material";
import dayjs from "dayjs";
import VerticalBox from "./components/VerticalBox";
import { useForm } from "react-hook-form";
import InputTextField from "./components/InputTextField";
import PropTypes from "prop-types";
import { Hotel } from "./types/Hotel";
import { API } from "./env";
import axios from "axios";
import InputDatePicker from "./components/InputDatePicker";

// Add Hotel Function
function AddHotel({ hotel, token, onSuccessfulChange }) {
  const exists = hotel?._id ?? false;
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: exists ? hotel.name : "",
      description: exists ? hotel.description : "",
      year: exists ? dayjs(hotel.year) : dayjs(),
    },
  });

  const onSubmit = async () => {
    const formData = {
      name: getValues("name"),
      description: getValues("description"),
      year: getValues("year")
        ? getValues("year").toISOString().slice(0, 4)
        : null,
    };
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: exists ? "patch" : "post",
      url: exists ? `${API}/hotels/${exists}` : `${API}/hotels`,
      data: formData,
    };
    try {
      const response = await axios(configuration);
      onSuccessfulChange(response.data.hotel);
      reset();
    } catch (error) {
      console.error("API Error:", error);
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
          <InputDatePicker control={control} />
          <Button
            variant="contained"
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </VerticalBox>
      </form>
    </>
  );
}

AddHotel.propTypes = {
  token: PropTypes.string.isRequired,
  hotel: PropTypes.shape(Hotel),
  hotelId: PropTypes.string,
  onSuccessfulChange: PropTypes.func.isRequired,
};

export default AddHotel;
