import React, { useState } from "react";
import { Box, Button, Stack, TextField, Alert } from "@mui/material";
import Title from "./Title";
import Paragraph from "./Paragraph";
import { supabase } from "../utils/supabase";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = new FormData(event.currentTarget);

      const email = data.get("email");
      const phone = data.get("phone");

      // Insert directly into Supabase
      const { error } = await supabase.from("contacts").insert([
        {
          email,
          phone,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        setMessageType("error");
        setMessage(error.message || "Error submitting form");
      } else {
        setMessageType("success");
        setMessage("Submitted successfully 🎉");
        event.currentTarget.reset();
      }
    } catch (err) {
      console.error("Catch error:", err);
      setMessageType("error");
      setMessage(err.message || "Connection error - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ py: 10, px: 2 }}
    >
      <Title text={"Interesting to buy property"} textAlign={"center"} />

      <Paragraph
        text={
          "If you are interested to buy the property contact us we will call you. Shortly to fulfill you requirements and property."
        }
        maxWidth={"sm"}
        mx={0}
        textAlign={"center"}
      />

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, py: 2 }}>
        {message && (
          <Alert severity={messageType} sx={{ mb: 2 }} onClose={() => setMessage(null)}>
            {message}
          </Alert>
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          disabled={loading}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone Number"
          type="text"
          id="phone"
          autoComplete="tel"
          disabled={loading}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="medium"
          disabled={loading}
          sx={{
            fontSize: "0.9rem",
            textTransform: "capitalize",
            py: 2,
            mt: 3,
            mb: 2,
            borderRadius: 0,
            backgroundColor: "#14192d",
            "&:hover": { backgroundColor: "#1e2a5a" },
            "&:disabled": { backgroundColor: "#999" },
          }}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Stack>
  );
};

export default Details;