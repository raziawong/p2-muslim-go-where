import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Create() {
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Box sx={{ my: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Create
                </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}