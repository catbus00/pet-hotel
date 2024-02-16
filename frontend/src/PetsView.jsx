import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
} from "@mui/material";
import Tags from "./components/Tags";
import { API } from "./env";
import AddPet from "./AddPet";
import CloseIcon from "@mui/icons-material/Close";
import { Authenticated } from "./types/Authentication";
import { Pets } from "./types/Pet";

PetsView.propTypes = {
  token: PropTypes.string,
  onSuccess: PropTypes.func,
  petId: PropTypes.string,
  ...Authenticated,
  ...Pets,
};

function PetsView({ token, pets, setPets, onSuccess }) {
  const exists = pets?._id ?? false;
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = React.useState(false);

  const getPetsAndHotels = async () => {
    try {
      const [petsResponse, hotelsResponse] = await Promise.all([
        axios.get(`${API}/pets`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${API}/hotels`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (
        Array.isArray(petsResponse.data.pets) &&
        petsResponse.data.pets.length > 0 &&
        Array.isArray(hotelsResponse.data.hotels)
      ) {
        const transformedPets = petsResponse.data.pets.map((pet) => {
          const hotel = hotelsResponse.data.hotels.find(
            (h) => h._id === pet.hotel,
          );
          const hotelName = hotel ? hotel.name : "No Hotel Assigned";
          return { ...pet, hotelName };
        });
        setPets(transformedPets);
      } else {
        console.error("Invalid API response format.");
        // TODO handle the error or send it to the child component
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePet = async (petId, setPets) => {
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
      getPetsAndHotels();
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

  const handleEditClick = (pet) => {
    console.log(pet);
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleAddSuccess = () => {
    getPetsAndHotels();
  };

  useEffect(() => {
    getPetsAndHotels();
  }, [token]);

  const handleClose = () => {
    setOpen(false);
  };

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
              <ListItemText>Color: {pet.color}</ListItemText>
              <ListItemText>Age: {pet.age}</ListItemText>
              <ListItemText>Species: {pet.species}</ListItemText>
              <ListItemText>Hotel: {pet.hotelName}</ListItemText>
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
            <Button
              size="small"
              pets={pets}
              onClick={() => handleEditClick(pet._id)}
              token={token}
            >
              Edit
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} keepMounted>
              <Slide direction="up" in={true}>
                <DialogContent>
                  <AppBar sx={{ position: "relative", marginBottom: "16.5px" }}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <AddPet
                    pets={pets}
                    token={token}
                    onSuccess={() => {
                      handleClose();
                      onSuccess();
                    }}
                  />
                </DialogContent>
              </Slide>
            </Dialog>
            <Button
              size="small"
              pets={pets}
              onClick={() => handleDeleteClick(pet._id)}
              token={token}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default PetsView;
