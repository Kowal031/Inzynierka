import { Box, Button, styled, Tooltip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { palette } from "../../assets/palette";
import CommonModal from "../common/CommonModal";
import AddWorkoutsStepper from "./addTrainingStepper/AddWorkoutsStepper";

const Container = styled(Button)({
  height: "4rem",
  width: "2rem",
  borderRadius: "50%",
  fontSize: "3rem",
  marginTop: "1rem",
  marginBottom: "0.25rem",
  color: palette.background,
  background: palette.lightBackground,
  opacity: 0.6,
  transition: "color 1s, background 1s, transform 0.5s",
  "&:hover": {
    background: palette.blue,
    color: palette.white,
    opacity: 1,
    transform: "scale(1.05)",
  },
});

const AddWorkouts: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!openModal) setParentOpen(false);
  }, [openModal]);

  return (
    <Tooltip
      title="Add new workout"
      placement="left"
      arrow
      open={!openModal && parentOpen}
    >
      <Box
        onMouseEnter={() => setParentOpen(true)}
        onMouseLeave={() => setParentOpen(false)}
      >
        <Container onClick={handleOpenModal}>+</Container>
        <Box>
          <CommonModal
            openModal={openModal}
            handleClose={handleCloseModal}
            children={
              <AddWorkoutsStepper
                handleCloseModal={handleCloseModal}
              ></AddWorkoutsStepper>
            }
          />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default AddWorkouts;
