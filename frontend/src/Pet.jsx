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
import InputSelect from "./components/InputSelect";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputTextField from "./components/InputTextField";

// Add Pet Function
function AddPet({ user }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [species, setSpecies] = useState("");
  const [hotel, setHotel] = useState("");
  const navigate = useNavigate();

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
    },
  });

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
                <section key={field.id}>
                  <label>
                    <span>Likes</span>
                    <input {...register(`likes[${index}].name`)} />
                  </label>
                  <Button
                    type="Button"
                    onClick={() => {
                      likesRemove(index);
                    }}
                  >
                    Delete
                  </Button>
                </section>
              );
            })}
          </VerticalBox>
          <Button
            type="Button"
            onClick={() => {
              likesAppend({ name: "" });
            }}
          >
            Add Likes
          </Button>
          <VerticalBox>
            {dislikesField.map((field, index) => {
              return (
                <section key={field.id}>
                  <label>
                    <span>Dislikes</span>
                    <input {...register(`dislikes[${index}].name`)} />
                  </label>
                  <Button
                    type="Button"
                    onClick={() => {
                      dislikesRemove(index);
                    }}
                  >
                    Delete
                  </Button>
                </section>
              );
            })}
          </VerticalBox>
          <Button
            type="Button"
            onClick={() => {
              dislikesAppend({ name: "" });
            }}
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
          <Button type="submit">Submit</Button>
        </VerticalBox>
      </form>
    </>
  );
}

export default AddPet;
