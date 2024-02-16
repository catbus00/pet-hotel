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
function AddHotel({ hotel, token }) {
  const exists = hotel?._id ?? false;
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      name: exists ? hotel.name : "",
      description: exists ? hotel.description : "",
      year: exists ? dayjs(hotel.year) : null,
    },
  });
  console.log(`Token: ${token}`);

  const onSubmit = async (hotel, token) => {
    const formData = {
      name: getValues("name"),
      description: getValues("description"),
      year: getValues("year")
        ? getValues("year").toISOString().slice(0, 4)
        : null,
    };
    console.log(`Form Data: ${JSON.stringify(formData)}`);
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: exists ? "patch" : "post",
      url: exists ? `${API}/hotels/${hotel._id}` : `${API}/hotels`,
      data: formData,
    };
    console.log(`data after config: ${JSON.stringify(formData, null, 2)}`);
    console.log(`Configuration: ${JSON.stringify(configuration, null, 2)}`);

    try {
      const response = await axios(configuration);
      console.log("API Response:", response.data);
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
  token: PropTypes.string,
  hotel: PropTypes.shape(Hotel),
};

export default AddHotel;
