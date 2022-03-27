import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import valHelper, { valPatterns } from "../utils/validation"
import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";

export default function Create(props) {
  const initialState = {
    displayName: "test",
    name: "",
    email: "",
    allowPublic: false,
    title: "",
    description: "",
    details: [],
    photos: [],
    categories: [],
    address: "",
    country: "",
    city: "",
    tags: [],
  };
  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {...initialState} });
  const liftData = (data) => {
    props.submitArticle(data);
  };

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Grid container spacing={2} sx={{ m: 4}}>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Display Name"
                name="displayName"
                {...register("displayName", { maxLength: 80, pattern: valPatterns.displayName })}
                {...valHelper(errors.displayName, {pattern: "displayName", length: 80})}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Contact Name"
                name="name"
                {...register("name", { required: true, maxLength: 80, pattern: valPatterns.displayName })}
                {...valHelper(errors.name, {length: 80, pattern: "displayName"})}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Email"
                name="email"
                {...register("email", { required: true, pattern: valPatterns.email })}
                {...valHelper(errors.email, {pattern: "email"})}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Title"
                name="title"
                {...register("title", { required: true, maxLength: 50, pattern: valPatterns.displayName })}
                {...valHelper(errors.title, {length: 50, pattern: "displayName"})}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Description"
                name="description"
                {...register("description", { required: true, maxLength: 150 })}
                {...valHelper(errors.description, {length: 150, pattern: "displayName"})}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                fullWidth
                label="Address"
                name="address"
                {...register("address")}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                select
                fullWidth
                label="Country"
                name="country"
                defaultValue="none"
                {...register("country", { required: true })}
                {...valHelper(errors.country)}
                >
                    <MenuItem value="none">None</MenuItem>
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                select
                fullWidth
                label="City"
                name="city"
                defaultValue="none"
                {...register("city", { required: true })}
                {...valHelper(errors.city)}
                >
                    <MenuItem value="none">None</MenuItem>
                </TextField>
            </Grid>
            {/* <Grid item md={6}>
                <TextField
                select
                fullWidth
                label="Categories"
                name="categories"
                defaultValue="none"
                {...register("country", { required: true })}
                {...valHelper(errors.country)}
                >
                    <MenuItem value="none">None</MenuItem>
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                select
                fullWidth
                label="City"
                name="city"
                defaultValue="none"
                {...register("city", { required: true })}
                {...valHelper(errors.city)}
                >
                    <MenuItem value="none">None</MenuItem>
                </TextField>
            </Grid> */}
            <Grid item md={12}>
                <Button type="submit" variant="contained" onClick={handleSubmit(liftData)}>
                    Submit
                </Button>
            </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
