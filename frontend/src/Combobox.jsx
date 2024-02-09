import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios, { HttpStatusCode } from "axios";

// const [petHotels, setPetHotels] = useState([]);

// getHotelNames = () => {
//   // axios
//   //   .get("/api")
//   //   .then((response) => {
//   //       const data = response.data
//   //       this.setPetHotels({})
//   //     console.log("Data has been received");
//   //   })
//   //   .catch(() => {
//   //     alert("Error Retrieving data");
//   //   });
// };

function Combobox() {
  const petHotelsDB = [
    { label: "The Grand Hotel", year: 1994 },
    { label: "Pawtel", year: 1972 },
    { label: "Koko's Guest House", year: 1974 },
    { label: "Koa's Shack", year: 2008 },
    { label: "Koa's Tent", year: 1957 },
    { label: "Maison de Koko", year: 1993 },
    { label: "Baan Koa Ka Pom ", year: 1994 },
  ];

  const configuration = {
    headers: {
      authorization: "JWT_TOKEN",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "get",
    url: `http://localhost:3000/hotels`,
    // data: { email, password },
  };

  const getHotels = () => {
    axios
      .get("/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="currentHotels"
      options={petHotelsDB}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Choose your Pet's Hotel" />
      )}
    />
  );
}

export default Combobox;
