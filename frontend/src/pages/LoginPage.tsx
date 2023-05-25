import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {
  Container,
  Avatar,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import usersApi from "../api/usersApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px; /* replace with specific pixel value */
`;

const LoginAvatar = styled(Avatar)`
  margin: 8px; /* replace with specific pixel value */
`;

const LoginForm = styled.form`
  width: 100%;
  margin-top: 24px; /* replace with specific pixel value */
`;

const LoginSubmitButton = styled(Button)`
  margin: 24px 0 16px; /* replace with specific pixel values */
`;

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await usersApi.login(values.email, values.password);
        navigate("/workouts", { state: { shouldReload: true } });
        window.location.reload();
      } catch (error: any) {
        console.error(error);
        setError(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <LoginContainer maxWidth="xs">
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LoginAvatar></LoginAvatar>
          <Typography align="center" component="h1" variant="h5">
            Login
          </Typography>
        </Box>
        {error && (
          <Typography color="error" variant="subtitle1">
            {error}
          </Typography>
        )}
        <LoginForm onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{ background: "white" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                sx={{ background: "white" }}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <LoginSubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "2rem" }}
          >
            Login
          </LoginSubmitButton>
        </LoginForm>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
