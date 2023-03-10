import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { REGEX_VALIDATIONS } from "../utils/regexValidations";
import Swal from "sweetalert2";
import ROLES from "../utils/rolesList";

import {
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import ImageUpload from "../features/addTutor/components/ImageUpload";
import { FileWithPath } from "react-dropzone";
import { addTutor } from "../features/addTutor/store/tutorSlice";
import { login } from "../features/authentication/store/authenticationSlice";

const NewTutorForm = () => {
  //Get the user session from the redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.session);

  const { loading, status } = useSelector((state: any) => ({
    ...state.tutorSlice,
  }));

  // image upload
  const [image, setImage] = useState<File[]>([]);

  function handleAcceptedFiles(acceptedFiles: FileWithPath[]) {
    setImage(acceptedFiles);
  }

  // Input fields
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currency, setCurrency] = useState("");
  const [hourlyCost, setHourlyCost] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    image: false,
    skills: false,
    languages: false,
    hourlyCost: false,
    currency: false,
    description: false,
  });

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleHourlyCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyCost(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const validateForm = (): any => {
    const errors: any = {
      skills: false,
      languages: false,
      hourlyCost: false,
      currency: false,
      description: false,
    };
    const priceRegex = REGEX_VALIDATIONS.PRICE;

    if (image.length == 0) {
      errors.image = true;
    }

    if (!priceRegex.test(hourlyCost)) {
      errors.hourlyCost = true;
    }

    if (currency === "") {
      errors.currency = true;
    }

    if (description === "") {
      errors.description = true;
    }

    if (languages.length === 0) {
      errors.languages = true;
    }

    if (skills.length === 0) {
      errors.skills = true;
    }

    return errors;
  };

  // Alert based on response status
  const showAlert = (loading: any, status: any) => {
    if (loading === false && status === 201) {
      Swal.fire({
        title: "Success!",
        text: "Profile registered successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/userProfile");
    } else if (loading === false && status === 409) {
      Swal.fire({
        text: "User is aleady registered as tutor",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else if (loading === false && status) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  useEffect(() => {
    showAlert(loading, Number(status));
  }, [loading, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (
      errors.image === true ||
      errors.skills === true ||
      errors.languages === true ||
      errors.hourlyCost === true ||
      errors.currency === true ||
      errors.description === true
    ) {
      // Errors
      setErrors(errors);
    } else {
      //No errors
      const addTutorAction = addTutor({
        values: {
          userId: user.id,
          fname: user.name,
          lname: user.lastName,
          image: image[0],
          description: description,
          spokenLanguages: languages,
          skills: skills,
          hourlyRate: Number(hourlyCost),
          currency: currency,
        },
      });

      dispatch(addTutorAction).then(() => {
        dispatch(
          login({
            ...user,
            roles: [...user.roles, ROLES.TUTOR],
          })
        );
        console.log(user);
      });

      // Reset form
      setImage([]);
      setSkills([]);
      setLanguages([]);
      setCurrency("");
      setHourlyCost("");
      setDescription("");
      


      setErrors({
        image: false,
        skills: false,
        languages: false,
        hourlyCost: false,
        currency: false,
        description: false,
      });

    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ width: "60%" }}>
        <Grid container>
          <Grid item md={12}>
            <Typography
              variant="h4"
              sx={{ mb: "2px" }}
              fontWeight={500}
              color="initial"
            >
              Register as a Tutor
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                inputProps={{ readOnly: true }}
                defaultValue={user.name}
                variant="outlined"
                sx={{ margin: "17px 0 0 0" }}
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                inputProps={{ readOnly: true }}
                defaultValue={user.lastName}
                variant="outlined"
                sx={{ margin: "17px 0 0 0" }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                inputProps={{ readOnly: true }}
                defaultValue={user.email}
                variant="outlined"
                sx={{ margin: "17px 0 0 0" }}
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                inputProps={{ readOnly: true }}
                defaultValue={user.phone}
                variant="outlined"
                sx={{ margin: "17px 0 0 0" }}
                fullWidth
              />
            </Grid>
          </Grid>
          <form
            action="POST"
            encType="multipart/form-data"
            style={{ width: "100%" }}
          >
            <Grid item md={12}>
              <TagsInput
                value={skills}
                onChange={setSkills}
                name="skills"
                placeHolder="Skills"
              />
              {errors.skills && (
                <FormHelperText error>Please enter some skills</FormHelperText>
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TagsInput
                  value={languages}
                  onChange={setLanguages}
                  name="languages"
                  placeHolder="Languages"
                />
                {errors.languages && (
                  <FormHelperText error>
                    Please enter some language
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={3}>
                <TextField
                  id="cost"
                  error={errors.hourlyCost}
                  helperText={
                    errors.hourlyCost ? "Please enter a valid price" : ""
                  }
                  name="cost"
                  label="Hourly Cost"
                  variant="outlined"
                  // type="number"
                  value={hourlyCost}
                  onChange={handleHourlyCostChange}
                  fullWidth
                  sx={{ margin: "17px 0 0 0" }}
                />
              </Grid>
              <Grid item md={3}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    error={errors.currency}
                  >
                    Currency
                  </InputLabel>
                  <Select
                    error={errors.currency}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleCurrencyChange}
                  >
                    <MenuItem value={"CAD"}>CAD</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                  </Select>
                  {errors.currency && (
                    <FormHelperText error>
                      Please choose a currency
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item md={12} sx={{ marginBottom: 2 }}>
              <TextField
                id="description"
                name="description"
                label="Tell us something about yourself"
                variant="outlined"
                fullWidth
                multiline
                sx={{ margin: "17px 0 0 0" }}
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                error={errors.description}
                helperText={
                  errors.description ? "Please enter a valid description" : ""
                }
              />
            </Grid>
            {/* Image Component */}
            <ImageUpload onAcceptedFiles={handleAcceptedFiles} />
            {errors.image && (
              <FormHelperText error>Please upload an image</FormHelperText>
            )}
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default NewTutorForm;
