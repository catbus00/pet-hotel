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
  Box,
  List,
  ListItemText,
} from "@mui/material";
import { API } from "./env";

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
      url: `${API}/pets`,
    };

    axios(configuration)
      .then((res) => {
        console.log("Response data:", res.data);

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

  const deletePet = async (petId) => {
    try {
      const configuration = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "delete",
        url: `${API}/pets/${petId}`,
      };

      const res = await axios(configuration);
      getPets();
      if (Array.isArray(res.data.pets) && res.data.pets.length > 0) {
        setPets(res.data.pets);
      } else {
        console.error(
          "Invalid response format: res.data.pets is not an array.",
        );
        // TODO send error to child component: Combobox
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access.", error);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleDeleteClick = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      await deletePet(petId);
    }
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
          <CardContent sx={{ marginTop: "25px", marginBottom: "25px" }}>
            <Typography gutterBottom variant="h3" fontFamily="BeautifulBarbies">
              {pet.name}
            </Typography>
            <List>
              <ListItemText>Gender: {pet.gender}</ListItemText>
              <ListItemText>Species: {pet.species}</ListItemText>
              <ListItemText>Color: {pet.color}</ListItemText>
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
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={() => handleDeleteClick(pet._id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default PetsView;
