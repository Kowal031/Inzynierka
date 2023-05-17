import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Container, Avatar, Button, Typography, Grid, TextField, Box } from "@mui/material";
import usersApi from "../api/usersApi";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const RegisterAvatar = styled(Avatar)`
  margin: 8px;

`;

const RegisterForm = styled.form`
  width: 100%;
  margin-top: 16px;
`;

const RegisterSubmitButton = styled(Button)`
  margin: 24px 0 16px;
`;

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>("");
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await usersApi.register(values.email,values.password);
        navigate("/login")
      } catch (error: any) {
        console.error(error);
        setError(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <RegisterContainer maxWidth="xs">
      <div>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <RegisterAvatar>
      
        </RegisterAvatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        </Box>
        {error && (
          <Typography color="error" variant="subtitle1">
            {error}
          </Typography>
        )}
        <RegisterForm onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                sx={{background: "white"}}
                required
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
                sx={{background: "white"}}
                required
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                sx={{background: "white"}}
                required
                id="confirmPassword"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>
          <RegisterSubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{marginTop: "2rem"}}
          >
            Sign up
          </RegisterSubmitButton>
        </RegisterForm>
      </div>
    </RegisterContainer>
  );
};

export default RegisterPage;
