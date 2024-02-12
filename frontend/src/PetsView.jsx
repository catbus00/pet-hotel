import Tags from "./components/Tags";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { Config } from "./types/Config";

PetsView.propTypes = {
  token: PropTypes.string,
  ...Config,
};

function PetsView({ token, uri }) {
  const [pets, setPets] = useState([]);

  const getPets = () => {
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: `${uri}/pets`,
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
        <Card key={pet._id} sx={{ maxWidth: 600, marginBottom: 16 }}>
          {pet.avatar && (
            <CardMedia
              sx={{ height: 140 }}
              image={`/static/images/cards/${pet.avatar}.jpg`}
              title={pet.name}
            />
          )}
          <CardContent>
            <Typography variant="h3" fontFamily="BeautifulBarbies">
              {pet.name}
            </Typography>
            <Typography variant="subtitle2" align="left">
              <ul>Gender: {pet.gender}</ul>
              <ul>Species: {pet.species}</ul>
              <ul>Color: {pet.color}</ul>
            </Typography>
            <Tags label="Likes" tags={pet.likes} />
            <Tags label="Dislikes" tags={pet.dislikes} />
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
