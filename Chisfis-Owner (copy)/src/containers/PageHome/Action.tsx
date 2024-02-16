import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface ActionProps {
  property: any;
  rowIndex: any;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  currentProp: React.Dispatch<React.SetStateAction<any>>;
}

const Action: React.FC<ActionProps> = ({
  property,
  rowIndex,
  setOpenDialog,
  currentProp,
}) => {
  // const [isLoading, setisLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpenDialog = (value: any) => {
    setOpenDialog(true);
    currentProp(value);
    handleClose();
  };
  const editProperty = () => {
    handleClose();
    navigate(`/edit-property/${property._id}`);
  };
  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          // disabled={isLoading}
          // style={{ textAlign: "center" }}
        >
          Action <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={editProperty}>Edit</MenuItem>
          <MenuItem onClick={() => handleClickOpenDialog(property)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Action;
