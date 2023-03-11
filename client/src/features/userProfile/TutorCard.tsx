import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import ImageUpload from "./components/ImageUpload.tsx";
import axios from "../../lib/axios.ts";
import Swal from "sweetalert2";
import { FileWithPath } from "react-dropzone";
import { useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../utils/apiEndpoints.ts";

const TutorCard = () => {
  const user = useSelector((state: any) => state.session);
  const [picture, setPicture] = useState("");
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [hourlyCost, setHourlyCost] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/tutors/byUser/?id=${user.id}`, {}).then((res) => {
      setId(res.data._id);
      setSkills(res.data.skills);
      setLanguages(res.data.spokenLanguages);
      setHourlyCost(res.data.hourlyRate);
      setDescription(res.data.description);
      setPicture(API_ENDPOINTS.BASE_URL + "/img/" + res.data.image);
      setIsLoading(false);
    });
  }, []);

  const handleHourlyCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyCost(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  function handleAcceptedFiles(acceptedFiles: FileWithPath[]) {
    var bodyFormData = new FormData();
    bodyFormData.append("id", id);
    bodyFormData.append("image", acceptedFiles[0]);
    console.log(id);
    axios({
      method: "put",
      url: "/api/v1/tutors/image",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {})
      .catch(function (response) {});
  }

  const handleSubmit = () => {
    axios
      .put("/api/v1/tutors/", {
        id: id,
        skills: skills,
        spokenLanguages: languages,
        hourlyRate: hourlyCost,
        description: description,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "You have updated your data!",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Verify the fields",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Typography variant="h4" fontWeight={500} component="div">
                Tutor Profile
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Grid item md={12}>
                <TagsInput
                  value={skills}
                  onChange={setSkills}
                  name="skills"
                  placeHolder="Skills"
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <TagsInput
                    value={languages}
                    onChange={setLanguages}
                    name="languages"
                    placeHolder="Languages"
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    id="cost"
                    name="cost"
                    label="Hourly Cost"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={hourlyCost}
                    onChange={handleHourlyCostChange}
                    sx={{ margin: "17px 0 0 0" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">CAD</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6}>
              {!isLoading ? (
                <ImageUpload
                  onAcceptedFiles={handleAcceptedFiles}
                  preview={picture}
                />
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item md={12}>
              <TextField
                id="description"
                name="description"
                label="Tell us about yourself"
                variant="outlined"
                fullWidth
                multiline
                sx={{ margin: "17px 0 0 0" }}
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid>

            <Button
              sx={{ mr: 0, my: 1, width: "100%" }}
              variant="contained"
              onClick={handleSubmit}
              disabled={
                skills.length <= 0 ||
                languages.length <= 0 ||
                hourlyCost.length <= 0 ||
                description.length <= 0
              }
            >
              Update
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TutorCard;
