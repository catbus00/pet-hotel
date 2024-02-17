import Tags from "./components/Tags";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  List,
  ListItemText,
} from "@mui/material";
import { API } from "./env";
import { Pets } from "./types/Pet";
import VerticalBox from "./components/VerticalBox";

PetsViewOwned.propTypes = {
  token: PropTypes.string,
  ...Pets,
};

function PetsViewOwned({ token, setPets, pets }) {
  const getPets = () => {
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: `${API}/pets/owned`,
    };

    axios(configuration)
      .then((res) => {
        if (Array.isArray(res.data.pets) && res.data.pets.length > 0) {
          setPets(res.data.pets);
        } else {
          console.error("No pets found.");
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
      <VerticalBox>
        {pets.map((pet) => (
          <Card
            key={pet._id}
            sx={{ maxWidth: 600, marginBottom: 16, marginTop: 16 }}
          >
            {pet.avatar && (
              <CardMedia
                sx={{ height: 140 }}
                image={`/static/images/cards/${pet.avatar}.jpg`}
                title={pet.name}
              />
            )}
            <CardContent
              sx={{ marginTop: "25px", width: "500px", marginBottom: "25px" }}
            >
              <Typography
                gutterBottom
                variant="h3"
                fontFamily="BeautifulBarbies"
              >
                {pet.name}
              </Typography>
              <List>
                <ListItemText>Gender: {pet.gender}</ListItemText>
                <ListItemText>Species: {pet.species}</ListItemText>
                <ListItemText>Color: {pet.color}</ListItemText>
                <ListItemText>Age: {pet.age}</ListItemText>
              </List>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <Tags label="Likes" tags={pet.likes} />
                <Tags label="Dislikes" tags={pet.dislikes} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </VerticalBox>
    </>
  );
}

export default PetsViewOwned;
