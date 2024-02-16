import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Authenticated } from "./types/Authentication";
import { API } from "./env";
import HotelDialogForm from "./HotelDialogForm";
import { Hotels } from "./types/Hotel";

HotelsViewOwned.propTypes = {
  token: PropTypes.string,
  hotelId: PropTypes.string,
  ...Authenticated,
  ...Hotels,
};

function HotelsViewOwned({ token, user, hotels, setHotels }) {
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
        if (Array.isArray(res.data.hotels) && res.data.hotels.length > 0) {
          console.log(
            `in hotels view owned on success refresh with array:\n${JSON.stringify(res.data.hotels, null, 2)}`,
          );
          setHotels(res.data.hotels);
        } else {
          console.error(
            `Invalid response format: res.data.hotels is not an array.\n${JSON.stringify(res.data, null, 2)}`,
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

  const handleAddSuccess = () => {
    getHotels();
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
          onSuccess={handleAddSuccess}
        />
      ))}
    </>
  );
}

export default HotelsViewOwned;
