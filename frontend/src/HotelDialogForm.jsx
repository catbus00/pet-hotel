import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddHotel from "./AddHotel";
import PropTypes from "prop-types";
import { Hotel } from "./types/Hotel";

function HotelDialogForm({ hotel, handleEditClick, handleDeleteClick, token }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
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
            <ListItemText>Description: {hotel.description}</ListItemText>
            <ListItemText>Year: {hotel.year}</ListItemText>
          </List>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setOpen(true);
            handleEditClick(hotel);
          }}
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
              <AddHotel hotel={hotel} token={token} />
            </DialogContent>
          </Slide>
        </Dialog>
        <Button size="small" onClick={() => handleDeleteClick(hotel._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

HotelDialogForm.propTypes = {
  hotel: PropTypes.shape(Hotel),
  token: PropTypes.string.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default HotelDialogForm;
