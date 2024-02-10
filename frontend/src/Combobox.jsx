import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios, { HttpStatusCode } from "axios";

function Combobox({ onChange ,control }) {
  const [options, setOptions] = useState([]);

  const getHotels = () => {
    axios
      .get("http://localhost:3000/hotels")
      .then((res) => {
        if (Array.isArray(res.data.hotels)) {
          const hotelNames = res.data.hotels.map((hotel) => ({
            label: hotel.name,
            id: hotel._id,
          }));
          setOptions(hotelNames);
        } else {
          console.error(
            "Invalid response format: res.data.hotels is not an array.",
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={options}
      id="petHotel"
      defaultValues=""
      onChange={onChange}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Choose your Pet's Hotel" />
      )}
    />
  );
}

export default Combobox;
