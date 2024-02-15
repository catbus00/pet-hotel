import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Authenticated } from "./types/Authentication";
import { API } from "./env";
import HotelDialogForm from "./HotelDialogForm";

HotelsViewOwned.propTypes = {
  token: PropTypes.string,
  hotelId: PropTypes.string,
  ...Authenticated,
};

function HotelsViewOwned({ token, user }) {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

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

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      {hotels.map((hotel) => (
        <HotelDialogForm
          key={`hotel-card-${hotel._id}`}
          hotel={hotel}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          token={token}
        />
      ))}
    </>
  );
}

export default HotelsViewOwned;
