import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const ContactTutor = () => {
  const { tutor } = useParams();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");

  const [skillOptions, setSkillsOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [foundTutor, setFoundTutor] = useState(false);
  const user = useSelector((state: any) => state.session);

  useEffect(() => {
    axios
      .get(`api/v1/tutors/byId/?id=${tutor}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSkillsOptions(res.data.skills);
        setLanguageOptions(res.data.spokenLanguages);
        setFoundTutor(true);
      })
      .catch(() => {
        setFoundTutor(false);
      });
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post("/api/v1/contact/", {
        title: title,
        language: language,
        skill: skill,
        description: description,
        user: user.id,
        tutor: tutor,
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setLanguage("");
        setSkill("");
        Swal.fire({
          title: "Success!",
          text: "You have contacted the tutor!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="div" fontWeight={500}>
            Contact
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth sx={{ mr: 5, my: 0 }}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput
                  id="title"
                  label="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mr: 5, my: 1 }}>
                <Autocomplete
                  disablePortal
                  value={skill}
                  onChange={(_, value: any) => setSkill(value)}
                  id="combo-box-demo"
                  options={skillOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Skills" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mr: 5, my: 1 }}>
                <Autocomplete
                  disablePortal
                  onChange={(_, value: any) => setLanguage(value)}
                  id="combo-box-demo"
                  options={languageOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Language" />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth sx={{ mr: 5, my: 1 }}>
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormControl>
          <Button
            sx={{ mr: 5, my: 1, width: "100%" }}
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !foundTutor ||
              title.length <= 0 ||
              skill.length <= 0 ||
              language.length <= 0 ||
              description.length <= 0
            }
          >
            Contact
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactTutor;
