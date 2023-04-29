import { Modal, Box, styled } from "@mui/material";
import { ReactNode, FC } from "react";
import { palette } from "../../assets/palette";

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
  flexWrap: "wrap",
  boxShadow: "0px 0px 24px rgba(0,0,0,0.1)",
  padding: "4rem",
});

// Define the props for the CommonModal component
interface CommonModalProps {
  openModal: boolean;
  children: ReactNode;
  handleCloseModal: ()=>void;
}

// Define the CommonModal component
const CommonModal: FC<CommonModalProps> = ({
  openModal,
  children,
  handleCloseModal
}) => {
  // Render the Modal component with the open and onClose props
  // Render the Box component with the background, display, boxShadow, and padding props
  // Render the children prop within the Box component
  return (
    <CommonStyledModal open={openModal} onClose={handleCloseModal}>
      <CommonBox>{children}</CommonBox>
    </CommonStyledModal>
  );
};

export default CommonModal;