import { PaletteOptions } from "@mui/material";

// Common
const white = "#FFFFFF";
const black = "#131313";

// pallete
const blue = "#3C8AFF"
const background = "#4F4E4E"
const error = "#FF3535"

export const palette = {
  white,
  black,
  blue,
  background
};

export const themePalette: PaletteOptions = {
  error: {
    main: error,
  },
  common: {
    black,
    white,
  },
};
