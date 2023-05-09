import { Modal, Box, styled, IconButton } from "@mui/material";
import { ReactNode, FC } from "react";
import { palette } from "../../assets/palette";
import CloseIcon from "@mui/icons-material/Close";

const CommonStyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CommonBox = styled(Box)({
  background: palette.white,
  display: "flex",
  flexDirection: "column",
  boxShadow: "2px 2px 7px 0px rgba(66, 68, 90, 1)",
  borderRadius: "4rem",
});

interface CommonModalProps {
  openModal: boolean;
  children: ReactNode;
  handleCloseModal: () => void;
}

const CommonModal: FC<CommonModalProps> = ({
  openModal,
  children,
  handleCloseModal,
}) => {
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
              ":hover": {
                background: "white",
                transform: "scale(1.1)",
              },
            }}
            aria-label="close"
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {children}
          </Box>
        </CommonBox>
      </CommonStyledModal>
    </>
  );
};

export default CommonModal;
