import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tutor from "./Tutor";
import TutorsListCSS from "../assets/TutorsList.module.css";
import { useParams } from "react-router-dom";
import {
  getSubmittedText,
  getAllTutors,
  textSubmitted,
} from "../../searchTutors/index";
import fetchTeachers from "../../../services/fetchTeachersService";
import FilterBar from "./filterBar/FilterBar";
import { API_ENDPOINTS } from "../../../utils/apiEndpoints";

const TutorsList = () => {
  const { skill } = useParams();
  const dispatch = useDispatch();
  const submittedText = useSelector(getSubmittedText);

  useEffect(() => {
    if (skill != submittedText) {
      dispatch(textSubmitted(skill));
      dispatch(fetchTeachers(skill));
    }
  }, []);

  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [spokenLanguagesFilter, setSpokenLanguagesFilter] = useState<string[]>(
    []
  );

  const tutors = useSelector(getAllTutors);

  console.log("tutors: ", tutors);

  if (!tutors) return <div>Loading...</div>;
  //Map function is to do something to each element of the array
  const tutorItems = tutors.map((tutor: { _id: string }) => {
    console.log("priceFilter: ", priceFilter);
    return (
      <Tutor
        priceFilter={priceFilter}
        key={tutor._id}
        languagesFilter={spokenLanguagesFilter}
        name={`${tutor.fname} ${tutor.lname}`}
        description={tutor.description}
        skills={tutor.skills}
        spokenLanguages={tutor.spokenLanguages}
        lessonCost={tutor.hourlyRate}
        pictureUrl={`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.IMAGES}${tutor.image}`}
      />
    );
  });

  if (tutors.length == 0) return <div>Loading...</div>;

  return (
    <div className={TutorsListCSS.filterTutorsPageContainer}>
      <FilterBar
        tutorItems={tutors}
        setPriceFilter={setPriceFilter}
        setSpokenLanguagesFilter={setSpokenLanguagesFilter}
      />
      <div className={TutorsListCSS.tutorsGrid}>{tutorItems}</div>
    </div>
  );
};

export default TutorsList;
