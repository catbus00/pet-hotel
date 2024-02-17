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
import PetDialogForm from "./PetDialogForm";

PetsView.propTypes = {
  token: PropTypes.string,
  petId: PropTypes.string,
  ...Authenticated,
  ...Pets,
};

function PetsView({ token, pets, setPets }) {
  const exists = pets?._id ?? false;
  const [selectedPet, setSelectedPet] = useState(null);

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
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access.", error);
      } else {
        console.error("Error deleting pet:", error);
      }
    }
  };

  const handleDeleteClick = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      await deletePet(petId);
    }
  };

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleAddSuccess = () => {
    getPetsAndHotels();
  };

  useEffect(() => {
    getPetsAndHotels();
  }, [token]);

  return (
    <>
      {pets.map((pet) => (
        <PetDialogForm
          key={`pet-card-${pet._id}`}
          pet={pet}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          token={token}
          onSuccess={handleAddSuccess}
        />
      ))}
    </>
  );
}

export default PetsView;
