import { Button, TextField } from "@mui/material";
import VerticalBox from "./components/VerticalBox";
import InputSelect from "./components/InputSelect";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputTextField from "./components/InputTextField";
import HorizontalBox from "./components/HorizontalBox";
import Combobox from "./Combobox";
import Navigation from "./Navigation";
import axios from "axios";

// Add Pet Function
function AddPet({ user }) {
  const [hotels, setHotels] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      likes: [{ name: "" }],
      dislikes: [{ name: "" }],
      name: "",
      gender: "",
      color: "",
      age: "",
      species: "",
      petHotel: {},
    },
  });

  const getHotels = () => {
    axios
      .get("http://localhost:3000/hotels")
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

  useEffect(() => {
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

  const onSubmit = (data) => {
    console.log("on submit pet data", data);
  };

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
            rules={{
              required: "The age of your pet is required.",
              maxLength: {
                value: 3,
                message: "The maximum length is 3 characters",
              },
            }}
            label="Age"
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
            error={errors.petHotel}
          />
          <Button
            sx={{ marginTop: "16.5px" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </VerticalBox>
      </form>
      <Navigation />
    </>
  );
}

export default AddPet;
