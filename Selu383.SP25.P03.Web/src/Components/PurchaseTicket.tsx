// components/PurchaseTicket.tsx
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const PurchaseTicket: React.FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Purchase Tickets
      </Typography>
      <Typography variant="h6" gutterBottom>
        Credit Card Information
      </Typography>

      {/* Credit Card Placeholder */}
      <TextField
        label="Card Number"
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        placeholder="1234 5678 9876 5432"
      />
      <Grid container spacing={2}>
        <Grid>
          <TextField
            label="Expiry Date"
            fullWidth
            variant="outlined"
            placeholder="MM/YY"
          />
        </Grid>
        <Grid>
          <TextField
            label="CVV"
            fullWidth
            variant="outlined"
            placeholder="123"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Or Pay with:
      </Typography>

      {/* Placeholder for Apple Pay / Google Pay */}
      <Grid container spacing={2}>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 150 }}
            disabled
          >
            Apple Pay
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 150 }}
            disabled
          >
            Google Pay
          </Button>
        </Grid>
      </Grid>

      {/* Proceed Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => alert("Proceeding to payment...")} // Placeholder function
        >
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PurchaseTicket;
