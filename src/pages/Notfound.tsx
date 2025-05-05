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
      <Typography variant="h6" color="textSecondary" paragraph>
      Something went wrong in the application.
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
