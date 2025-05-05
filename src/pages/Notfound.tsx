import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      bgcolor="background.paper"
    >
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Link to='/'>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
      </Link>
    </Box>
  );
};
