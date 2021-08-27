import React from "react";
import { Menu, MenuItem, withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function ItemOptions(props) {
  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "left",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ));

  const ITEM_HEIGHT = 48;
  const { anchorEl, handleClose, id, setDelete } = props;
  const history = useHistory();

  function handleOpenEdit(id) {
    history.push(`/edit-project/${id}`);
  }

  function handleDelete() {
    setDelete(true)
  }

  function handleView(id) {
    history.push(`/project/${id}`);
  }

  return (
    <StyledMenu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      <MenuItem onClick={() => handleView(id)}>View</MenuItem>
      <MenuItem onClick={() => handleOpenEdit(id)}>Edit</MenuItem>
      <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
    </StyledMenu>
  );
}

export default ItemOptions;
