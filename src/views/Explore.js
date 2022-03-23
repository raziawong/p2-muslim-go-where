import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Explore() {
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Explore
                </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}