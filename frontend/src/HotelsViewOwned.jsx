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
import { Authenticated } from "./types/Authentication";
import { API } from "./env";

HotelsView.propTypes = {
  token: PropTypes.string,
  ...Authenticated,
};

function HotelsView({ token }) {
  const [hotels, setHotels] = useState([]);

  const getHotels = () => {
    const configuration = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "get",
      url: `${API}/hotels/owned`,
    };

    axios(configuration)
      .then((res) => {
        console.log("Response data:", res.data);

        if (Array.isArray(res.data.hotels) && res.data.hotels.length > 0) {
          setHotels(res.data.hotels);
        } else {
          console.error(
            "Invalid response format: res.data.hotels is not an array.",
          );
          // TODO send error to child component: Combobox
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access.", error);
        } else {
          console.error("Error fetching data:", error);
        }
      });
  };

  const deleteHotel = async (hotelId) => {
    try {
      const configuration = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "delete",
        url: `${API}/hotels/${hotelId}`,
      };

      const res = await axios(configuration);
      getHotels();
      if (Array.isArray(res.data.hotels) && res.data.hotels.length > 0) {
        setHotels(res.data.hotels);
      } else {
        console.error(
          "Invalid response format: res.data.hotels is not an array.",
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

  const handleDeleteClick = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      await deleteHotel(hotelId);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      {hotels.map((hotel) => (
        <Card key={hotel._id} sx={{ maxWidth: 600, marginBottom: 16 }}>
          {hotel.avatar && (
            <CardMedia
              sx={{ height: 140 }}
              image={`/static/images/cards/${hotel.avatar}.jpg`}
              title={hotel.name}
            />
          )}
          <CardContent sx={{ marginTop: "25px", marginBottom: "25px" }}>
            <Typography gutterBottom variant="h3" fontFamily="BeautifulBarbies">
              {hotel.name}
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <List>
                <ListItemText>Name: {hotel.name}</ListItemText>
                <ListItemText>Hotel: {hotel.description}</ListItemText>
                <ListItemText>Description: {hotel.year}</ListItemText>
              </List>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={() => handleDeleteClick(hotel._id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default HotelsView;
