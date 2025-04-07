// src/LoginForm.tsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";

interface AuthenticationPost {
  username: string;
  password: string;
}

interface AuthenticationFetch {
  token: string;
  // Add more fields if your API response includes them
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      setSuccess("");
      return;
    }

    const credentials: AuthenticationPost = { username, password };

    try {
      const response = await axios.post<AuthenticationFetch>(
        "https://localhost:7027/api/authentication/login",
        credentials
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setSuccess("Login successful!");
      setError("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
