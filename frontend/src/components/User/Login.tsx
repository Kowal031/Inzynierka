import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components";
import {
  Container,
  Avatar,
  Button,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import endpoints from "../../api/endpoints";
import User from "../../types/User";
import usersApi from "../../api/usersApi";
import { Navigate, useNavigate } from "react-router-dom";

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

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await usersApi.login(values.email, values.password);
        navigate("/workouts", {  state: { shouldReload: true } })
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
        <LoginAvatar></LoginAvatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && (
          <Typography color="error" variant="subtitle1">
            {error}
          </Typography>
        )}
        <LoginForm onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
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
          >
            Login
          </LoginSubmitButton>
        </LoginForm>
      </div>
    </LoginContainer>
  );
};

export default Login;
