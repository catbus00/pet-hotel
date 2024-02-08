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
          <Controller
            control={control}
            name="name"
            rules={{
              required: "The name of your pet is required.",
              maxLength: {
                value: 50,
                message: "The maximum length is 50 characters.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Pet Name"
                id="name"
                placeholder="Pet Name"
                error={Boolean(errors.name)}
              />
            )}
          ></Controller>
          <Typography>{errors.name?.message}</Typography>
          <FormControl>
            <InputLabel>Choose Gender</InputLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select {...field} id="gender" sx={{ width: "200px" }}>
                  <MenuItem key="male" value="male">
                    male
                  </MenuItem>
                  <MenuItem key="female" value="female">
                    female
                  </MenuItem>
                  <MenuItem key="other" value="other">
                    other
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            control={control}
            name="color"
            rules={{
              required: "The color of your pet is required.",
              maxLength: {
                value: 100,
                message: "The maximum length is 100 characters.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Color"
                id="color"
                placeholder="Pet Color"
                error={Boolean(errors.color)}
              />
            )}
          ></Controller>
          <Typography>{errors.color?.message}</Typography>
          <label>Age</label>
          <input
            type="number"
            {...register("age", {
              required: "The age of your pet is required.",
              maxLength: {
                value: 3,
                message: "The maximum length is 3 characters",
              },
            })}
          />
          <Typography>{errors.age?.message}</Typography>
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
          <label>Choose Species</label>
          <Select {...register("species")} value="cat">
            <MenuItem value="cat">cat</MenuItem>
            <MenuItem value="dog">dog</MenuItem>
            <MenuItem value="other">other</MenuItem>
          </Select>
          <Button type="submit">Submit</Button>
        </VerticalBox>
      </form>
    </>
  );
}

export default AddPet;
