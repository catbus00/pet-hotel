import { Button, TextField } from "@mui/material";
import VerticalBox from "./components/VerticalBox";
import InputSelect from "./components/InputSelect";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputTextField from "./components/InputTextField";
import HorizontalBox from "./components/HorizontalBox";
import Combobox from "./Combobox";
import axios from "axios";
import { API } from "./env";
import PropTypes from "prop-types";
import { Pets } from "./types/Pet";

// Add Pet Function
function AddPet({ pet, token, setPets, onSuccess }) {
  const exists = pet?._id ?? false;
  const [hotels, setHotels] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      likes: exists ? pet.likes : [],
      dislikes: exists ? pet.dislikes : [],
      name: exists ? pet.name : "",
      gender: exists ? pet.gender : "",
      color: exists ? pet.color : "",
      age: exists ? pet.age : "",
      species: exists ? pet.species : "",
      hotel: exists ? pet.petHotel : "",
    },
  });

  const onSubmit = async () => {
    const petHotelValue = getValues("hotel");

    const formData = {
      likes: getValues("likes").map((item) => item.name),
      dislikes: getValues("dislikes").map((item) => item.name),
      name: getValues("name"),
      gender: getValues("gender"),
      color: getValues("color"),
      age: getValues("age"),
      species: getValues("species"),
      hotel: petHotelValue ? petHotelValue.id : null,
    };
    console.log("formData:", formData);

    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: exists ? "patch" : "post",
      url: exists ? `${API}/pets/${exists}` : `${API}/pets`,
      data: formData,
    };
    try {
      const response = await axios(configuration);
      onSuccess(response.data.pet);
      reset();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    const getHotels = () => {
      axios
        .get(`${API}/hotels`)
        .then((res) => {
          if (Array.isArray(res.data.hotels)) {
            const hotels = res.data.hotels.map((hotel) => ({
              label: hotel.name,
              id: hotel._id,
            }));
            setHotels(hotels);
          } else {
            console.error(
              "Invalid response format: res.data.hotels is not an array.",
            );
            // TODO send error to child component: Combobox
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getHotels();
  }, []);

  const {
    fields: likesField,
    append: likesAppend,
    remove: likesRemove,
  } = useFieldArray({ control, name: "likes" });

  const {
    fields: dislikesField,
    append: dislikesAppend,
    remove: dislikesRemove,
  } = useFieldArray({ control, name: "dislikes" });

  return (
    <>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <VerticalBox>
          <InputTextField
            control={control}
            error={errors.name}
            rules={{
              required: "The name of your pet is required.",
              maxLength: {
                value: 50,
                message: "The maximum length is 50 characters.",
              },
            }}
            name="name"
            label="Pet Name"
            placeholder="Pet Name"
          />
          <InputSelect
            label="Choose Gender"
            name="gender"
            control={control}
            items={[
              { key: "male", value: "male" },
              { key: "female", value: "female" },
              { key: "other", value: "other" },
            ]}
          />
          <InputTextField
            control={control}
            name="color"
            rules={{
              required: "The color of your pet is required.",
              maxLength: {
                value: 100,
                message: "The maximum length is 100 characters.",
              },
            }}
            label="Color"
            placeholder="Pet Color"
            error={errors.color}
          />
          <InputTextField
            control={control}
            name="age"
            label="Pet's Age"
            type="number"
            inputProps={{ min: 1, max: 100 }}
            rules={{
              required: "The age of your pet is required.",
            }}
            id="outlined-number"
            placeholder="Pet Age"
            error={errors.age}
          />
          <VerticalBox>
            {likesField.map((field, index) => {
              return (
                <HorizontalBox key={field.id}>
                  <label>
                    <TextField
                      {...register(`likes[${index}].name`)}
                      placeholder="Likes"
                      label="Likes"
                      sx={{ marginBottom: "16.5px" }}
                    />
                  </label>
                  <Button
                    href="#"
                    type="Button"
                    onClick={() => {
                      likesRemove(index);
                    }}
                  >
                    Delete
                  </Button>
                </HorizontalBox>
              );
            })}
          </VerticalBox>
          <Button
            href="#"
            type="Button"
            onClick={() => {
              likesAppend({ name: "" });
            }}
            sx={{ marginBottom: "16.5px" }}
          >
            Add Likes
          </Button>
          <VerticalBox>
            {dislikesField.map((field, index) => {
              return (
                <HorizontalBox key={field.id}>
                  <label>
                    <TextField
                      {...register(`dislikes[${index}].name`)}
                      placeholder="Dislikes"
                      label="Dislikes"
                      sx={{ marginBottom: "16.5px" }}
                    />
                  </label>
                  <Button
                    href="#"
                    type="Button"
                    onClick={() => {
                      dislikesRemove(index);
                    }}
                  >
                    Delete
                  </Button>
                </HorizontalBox>
              );
            })}
          </VerticalBox>
          <Button
            href="#"
            type="Button"
            onClick={() => {
              dislikesAppend({ name: "" });
            }}
            sx={{ marginBottom: "16.5px" }}
          >
            Add Dislikes
          </Button>

          <InputSelect
            label="Choose Species"
            name="species"
            control={control}
            items={[
              { key: "cat", value: "cat" },
              { key: "dog", value: "dog" },
              { key: "other", value: "other" },
            ]}
          />
          <Combobox
            control={control}
            name="petHotel"
            hotels={hotels}
            rules={{
              required: "The hotel where your pet is staying is required.",
            }}
            error={errors.hotel}
          />
          <Button
            sx={{ marginTop: "16.5px" }}
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

AddPet.propTypes = {
  token: PropTypes.string.isRequired,
  pet: PropTypes.shape(Pets),
  petId: PropTypes.string,
  ...Pets,
  onSuccess: PropTypes.func.isRequired,
};

export default AddPet;
