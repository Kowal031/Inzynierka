import { Box, styled, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

const BasicForm = styled(`form`)({
  display: "flex",
  flexDirection: "column",
});

const Container = styled(Box)({
  backgroundColor: "#ffffff",
  padding: 30,
  textAlign: "center",
});

interface StepTrainingDetails {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const StepTrainingDetais: FC<StepTrainingDetails> = ({
  handleChange,
  title,
}) => {
  return (
    <Container>
      <BasicForm>
        <TextField
          onChange={handleChange}
          required
          label={"Add Training name (1 - 50 chars)"}
          name={"title"}
          value={title}
          inputProps={{ maxLength: 50 }}
        />
      </BasicForm>
    </Container>
  );
};
export default StepTrainingDetais;
