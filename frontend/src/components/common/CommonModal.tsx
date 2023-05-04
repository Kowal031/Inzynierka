import { Modal, Box, styled, IconButton } from "@mui/material";
import { ReactNode, FC } from "react";
import { palette } from "../../assets/palette";

import CloseIcon from "@mui/icons-material/Close";

// Style the Modal component using MUI's styled() function
const CommonStyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Style the Box component using MUI's styled() function
const CommonBox = styled(Box)({
  background: palette.white,
  display: "flex",
  flexDirection: "column",
  boxShadow: "2px 2px 7px 0px rgba(66, 68, 90, 1)",
  borderRadius: "4rem",
});

// Define the props for the CommonModal component
interface CommonModalProps {
  openModal: boolean;
  children: ReactNode;
  handleCloseModal: () => void;
}

// Define the CommonModal component
const CommonModal: FC<CommonModalProps> = ({
  openModal,
  children,
  handleCloseModal,
}) => {
  // Render the Modal component with the open and onClose props
  // Render the Box component with the background, display, boxShadow, and padding props
  // Render the children prop within the Box component
  return (
    <>
      <CommonStyledModal open={openModal} onClose={handleCloseModal}>
        <CommonBox>
          <IconButton
            sx={{
              background: "white",
              border: "0.1px solid black ",
              alignSelf: "flex-end",
              color: "black",
              ":hover":{
                background: "white",
                transform: "scale(1.1)",
               
              }
            }}
            aria-label="close"
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{  display: "flex",  justifyContent: "center",}}>
          {children}
          </Box>
        </CommonBox>
      </CommonStyledModal>
    </>
  );
};

export default CommonModal;
