import { Modal, Box, styled } from "@mui/material";
import { ReactNode, FC } from "react";
import { palette } from "../../assets/palette";

const CommonStyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CommonBox = styled(Box)({

  background: palette.white,
  display: "flex",
  flexWrap: "wrap",
  boxShadow: "0px 0px 24px rgba(0,0,0,0.1)",
  padding: "4rem",
});

interface CommonModalProps {
  openModal: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const CommonModal: FC<CommonModalProps> = ({
  openModal,
  handleClose,
  children,
}) => {
  return (
    <CommonStyledModal open={openModal} onClose={handleClose}>
      <CommonBox>{children}</CommonBox>
    </CommonStyledModal>
  );
};
export default CommonModal;
