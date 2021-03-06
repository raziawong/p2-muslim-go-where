import React, { Fragment } from "react";
import helper from "../../utils/helper";
import { default as Editor } from "mui-rte";
import { convertToRaw } from "draft-js";
import {
  Box,
  IconButton,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineSharp,
  RemoveCircleOutlineSharp,
} from "@mui/icons-material";

export default function ArticleDetails({
  articleState,
  setArticleState,
  articleError,
  setArr,
  removeArr,
}) {
  const handleRemovePhoto = (evt, i) => {
    removeArr("photos", i);
  };

  const handleAddPhoto = (evt) => {
    setArr("photos", "");
  };

  const handlePhotoChange = (evt, i) => {
    let photos = [...articleState.photos];
    photos[i] = evt.target.value;
    setArticleState({
      target: {
        name: "photos",
        value: photos,
      },
    });
  };

  const handleRemoveDetail = (evt, i) => {
    removeArr("details", i);
  };

  const handleAddDetail = (evt) => {
    setArr("details", helper.emptyDetail);
  };

  const handleDetailChange = (evt, i) => {
    let details = JSON.parse(JSON.stringify(articleState.details)) || {};
    if (evt.target) {
      details[i].sectionName = evt.target.value;
    } else if (evt.getCurrentContent()) {
      const contentUpdate = JSON.stringify(
        convertToRaw(evt.getCurrentContent())
      );
      if (contentUpdate !== details[i].content) {
        details[i].content = contentUpdate;
      }
    }

    setArticleState({
      target: {
        name: "details",
        value: details,
      },
    });
  };

  const checkError = (fieldName, i, innerKey = false) => {
    const err = articleError[fieldName];
    if (err) {
      if (err.length >= i) {
        return err[i];
      }
      return false;
    }
    return false;
  };

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 4 }}
      sx={{ maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12} md={8}>
        {articleState?.photos?.map((photo, i) => (
          <Fragment key={i}>
            <TextField
              fullWidth
              label="Image URL"
              name={`photos[${i}]`}
              value={photo}
              onChange={(evt) => handlePhotoChange(evt, i)}
              error={!!checkError("photos", i)}
              helperText={checkError("photos", i)}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {articleState.photos.length && (
                <IconButton
                  color="secondary"
                  aria-label="Remove Photo"
                  onClick={(evt) => handleRemovePhoto(evt, i)}
                >
                  <RemoveCircleOutlineSharp />
                </IconButton>
              )}
            </Box>
          </Fragment>
        ))}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap-reverse",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <FormHelperText>
            A default image based on first category selected will be used if there is no image URL
          </FormHelperText>
          <IconButton
            color="primary"
            aria-label="Add Photo"
            onClick={handleAddPhoto}
          >
            <Typography>Add Photo </Typography>
            <AddCircleOutlineSharp />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        {articleState?.details?.map((dtl, i) => (
          <Fragment key={i}>
            <Box>
              <TextField
                fullWidth
                label="Header"
                name={`details[${i}]sectionName`}
                value={dtl.sectionName}
                onChange={(evt) => handleDetailChange(evt, i)}
                error={!!checkError("details", i)?.sectionName}
                helperText={checkError("details", i)?.sectionName}
              />
              <Box
                sx={
                  !!checkError("details", i)?.content
                    ? {
                        borderColor: "error.main",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }
                    : {}
                }
              >
                <Editor
                  toolbarButtonSize="small"
                  controls={helper.rteControls}
                  inlineToolbar
                  label="Insert content for section"
                  name={`details[${i}]content`}
                  value={dtl.content}
                  onChange={(evt) => handleDetailChange(evt, i)}
                />
              </Box>
              {checkError("details", i)?.content && (
                <FormHelperText error>
                  {checkError("details", i)?.content}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {articleState.details.length && (
                <IconButton
                  color="secondary"
                  aria-label="Remove Detail"
                  onClick={(evt) => handleRemoveDetail(evt, i)}
                >
                  <RemoveCircleOutlineSharp />
                </IconButton>
              )}
            </Box>
          </Fragment>
        ))}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap-reverse",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <FormHelperText>
            Encouraged to insert details like directions, openining hours, or
            things to note
          </FormHelperText>
          <IconButton
            color="primary"
            aria-label="Add Details"
            onClick={handleAddDetail}
          >
            <Typography>Add Details </Typography>
            <AddCircleOutlineSharp />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
