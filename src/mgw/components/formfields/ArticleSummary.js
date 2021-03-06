import React, { Fragment, useEffect, useState } from "react";
import helper from "../../utils/helper";
import { Autocomplete, Grid, FormHelperText, TextField } from "@mui/material";

export default function ArticleSummary({
  articleState,
  setArticleState,
  articleError,
  countryOpts,
}) {
  const [cityOpen, setCityOpen] = useState(false);
  const [cityOpts, setCityOptions] = React.useState([]);
  const loading = cityOpen && cityOpts.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      if (articleState.country) {
        const opts = await helper.cityObj(countryOpts, articleState.countryId);
        setCityOptions([...opts]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, articleState.country]);

  useEffect(() => {
    if (!cityOpen) {
      setCityOptions([]);
    }
  }, [cityOpen]);

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 4 }}
      sx={{ maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          required
          label="Title"
          arial-label="Title"
          name="title"
          value={articleState.title}
          onChange={setArticleState}
          error={!!articleError?.title}
          helperText={articleError?.title}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          required
          multiline
          minRows={3}
          label="Description"
          arial-label="Description"
          name="description"
          value={articleState.description}
          onChange={setArticleState}
          error={!!articleError?.description}
          helperText={articleError?.description}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          required
          label="Address"
          arial-label="Address"
          name="address"
          value={articleState.address}
          onChange={setArticleState}
          error={!!articleError?.address}
          helperText={articleError?.address}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Autocomplete
          autoSelect
          fullWidth
          name="country"
          value={articleState.country}
          options={countryOpts}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Country"
              aria-label="Country"
              error={!!articleError?.countryId}
              helperText={articleError?.countryId}
            />
          )}
          onChange={(evt, value) => {
            const arg = { target: { name: "country", value: value } };
            setArticleState(arg);
          }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Autocomplete
          autoSelect
          fullWidth
          name="cityId"
          open={cityOpen}
          onOpen={() => setCityOpen(true)}
          onClose={() => setCityOpen(false)}
          disabled={!articleState.countryId}
          value={articleState.city}
          options={cityOpts}
          loading={loading}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="City"
              aria-label="City"
              error={!!articleError?.cityId}
              helperText={articleError?.cityId}
            />
          )}
          onChange={(evt, value) => {
            const arg = { target: { name: "city", value: value } };
            setArticleState(arg);
          }}
        />
        <FormHelperText
          sx={{
            display:
              !!articleError?.cityId && articleState.country?.name
                ? "none"
                : "block",
          }}
        >
          Please select Country first
        </FormHelperText>
      </Grid>
    </Grid>
  );
}
