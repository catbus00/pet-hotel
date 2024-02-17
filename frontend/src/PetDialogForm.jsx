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
import AddPet from "./AddPet";
import PropTypes from "prop-types";
import { Pet } from "./types/Pet";
import Tags from "./components/Tags";

function PetDialogForm({
  pet,
  handleEditClick,
  handleDeleteClick,
  token,
  onSuccess,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ justifyContent: "center" }}>
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
            onClick={() => {
              setOpen(true);
              handleEditClick(pet);
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
                <AddPet
                  pet={pet}
                  token={token}
                  onSuccessfulChange={() => {
                    handleClose();
                    onSuccess();
                  }}
                />
              </DialogContent>
            </Slide>
          </Dialog>
          <Button size="small" onClick={() => handleDeleteClick(pet._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

PetDialogForm.propTypes = {
  pet: PropTypes.shape(Pet),
  token: PropTypes.string.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PetDialogForm;
