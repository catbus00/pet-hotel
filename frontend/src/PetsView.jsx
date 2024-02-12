import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tags from "./components/Tags";
import Pet from "./Pet";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

PetsView.propTypes = {
  token: PropTypes.string,
};

function PetsView({ token }) {
  const [pets, setPets] = useState([]);

  const getPets = () => {
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: `http://localhost:3000/pets`,
    };

    axios(configuration)
      .then((res) => {
        console.log("Response data:", res.data);

        if (Array.isArray(res.data.pets) && res.data.pets.length > 0) {
          setPets(res.data.pets);
        } else {
          console.error(
            "Invalid response format: res.data.pets is not an array.",
          );
          // TODO send error to child component: Combobox
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      {pets.map((pet) => (
        <Card key={pet._id} sx={{ maxWidth: 345, marginBottom: 16 }}>
          {pet.avatar && (
            <CardMedia
              sx={{ height: 140 }}
              image={`/static/images/cards/${pet.avatar}.jpg`}
              title={pet.name}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Your Pet: {pet.name}
            </Typography>
            <Tags label="Likes" tags={pet.likes} />
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default PetsView;
