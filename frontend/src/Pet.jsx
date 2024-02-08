import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
      name: "",
      gender: "",
      color: "",
      age: "",
    },
  });
  const { fields, append, prepend, remove } = useFieldArray({
    name: "likes",
    control,
  });
  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <label>Pet Name</label>
        <input
          {...register("name", {
            required: "The name of your pet is required.",
            maxLength: {
              value: 50,
              message: "The maximum length is 50 characters.",
            },
          })}
          placeholder="Pet Name"
        />
        {errors.name?.message}
        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <label>Color</label>
        <input
          {...register("color", {
            required: "The color of your pet is required.",
            maxLength: {
              value: 100,
              message: "The maximum length is 100 characters.",
            },
          })}
          placeholder="Pet Color"
        />
        {errors.color?.message}
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
        {errors.age?.message}
        {fields.map((field, index) => {
          return (
            <section key={field.id}>
              <label>
                <span>Likes</span>
                <input {...register(`likes.${index}.name`)} />
              </label>
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Delete
              </button>
            </section>
          );
        })}
        <button
          type="button"
          onClick={() => {
            append({ name: "" });
          }}
        >
          Append
        </button>
        <button
          type="button"
          onClick={() => {
            prepend({ name: "" });
          }}
        >
          Prepend
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddPet;
