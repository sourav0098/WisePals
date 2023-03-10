import React from "react";
import { useSelector } from "react-redux";
import { getSubmittedText } from "../../searchTutors/index";
import TutorCSS from "../assets/Tutor.module.css";

interface TutorProps {
  name: string;
  description: string;
  skills: string[];
  spokenLanguages: string[];
  lessonCost: number;
  picture: string;
  priceFilter: [number, number];
  languagesFilter: string[];
}

const Tutor: React.FC<TutorProps> = ({
  priceFilter,
  languagesFilter,
  name,
  description,
  skills,
  spokenLanguages,
  lessonCost,
  picture,
}) => {
  const submittedText = useSelector(getSubmittedText);

  const containLanguage = spokenLanguages.some((language) =>
    languagesFilter.includes(language.toLowerCase())
  );

  if (
    (!languagesFilter.length || containLanguage == true) &&
    submittedText !== undefined &&
    ((lessonCost <= priceFilter[1] && lessonCost >= priceFilter[0]) ||
      !priceFilter)
  )
    return (
      <div className={`${TutorCSS.card}`}>
        <div className={`${TutorCSS.leftSide}`}>
          {/* <img src={picture} /> */}
          <img src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTYxMDZ8MHwxfHNlYXJjaHwxfHxtYW4lMjBmYWNlc3xlbnwwfHx8fDE2NzQyNDU2MTU&ixlib=rb-4.0.3&q=80" />
        </div>
        <div className={TutorCSS.center}>
          <div className={TutorCSS.cardTitle}>
            <h3>{name}</h3>
          </div>

          <div className={TutorCSS.skills}>📚{skills.join(", ")}</div>
          <br />
          <div className={TutorCSS.spokenLanguages}>
            🗣{spokenLanguages.join(", ")}
          </div>
          <br />
          <div className={TutorCSS.description}>{description}</div>
        </div>
        <div className={TutorCSS.rightSide}>
          <div className={TutorCSS.price}>USD${lessonCost}</div>
          <div className={TutorCSS.cardButtons}>
            <button className={TutorCSS.btn}>Contact Tutor</button>
            {/* <button className={`${TutorCSS.btn} ${TutorCSS.btnOutline}`}>
              Contact tutor
            </button> */}
          </div>
        </div>
      </div>
    );
};

export default Tutor;
