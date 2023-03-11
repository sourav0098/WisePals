import { useSelector } from "react-redux";
import { getSubmittedText } from "../../searchTutors/index";
import TutorCSS from "../assets/Tutor.module.css";
import { Link, useNavigate } from "react-router-dom";

interface TutorProps {
  priceFilter: [number, number];
  languagesFilter: string[];
  name: string;
  description: string;
  skills: string[];
  spokenLanguages: string[];
  lessonCost: number;
  pictureUrl: string;
  currency: string;
  id: string;
}

const Tutor: React.FC<TutorProps> = ({
  priceFilter,
  languagesFilter,
  name,
  description,
  skills,
  spokenLanguages,
  lessonCost,
  pictureUrl,
  currency,
  id,
}) => {
  const submittedText = useSelector(getSubmittedText);

  const navigate = useNavigate();
  const containLanguage = spokenLanguages.some((language) =>
    languagesFilter.includes(language.toLowerCase())
  );

  if (
    (!languagesFilter.length || containLanguage === true) &&
    submittedText !== undefined &&
    ((lessonCost <= priceFilter[1] && lessonCost >= priceFilter[0]) ||
      !priceFilter)
  )
    return (
      <div className={`${TutorCSS.card}`}>
        <div
          className={`${TutorCSS.leftSide}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/tutorprofile/${id}`);
          }}
        >
          <img src={pictureUrl} alt="tutor profile" />
        </div>
        <div className={TutorCSS.center}>
          <div className={TutorCSS.cardTitle}>
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/tutorprofile/${id}`);
              }}
            >
              {name}
            </h3>
          </div>

          <div className={TutorCSS.skills}>📚{skills.join(", ")}</div>
          <br />
          <div className={TutorCSS.spokenLanguages}>
            🗣{spokenLanguages.join(", ")}
          </div>
          <br />
          <div className={TutorCSS.description}>
            {description.length > 425
              ? description.substring(0, 210) + "..."
              : description}
          </div>
        </div>
        <div className={TutorCSS.rightSide}>
          <div className={TutorCSS.price}>
            {currency} ${lessonCost} /hr
          </div>
          <div className={TutorCSS.cardButtons}>
            <Link to={`/contactTutor/${id}`}>
              <button className={TutorCSS.btn}>Contact Tutor</button>
            </Link>
            {/* <button className={`${TutorCSS.btn} ${TutorCSS.btnOutline}`}>
              Contact tutor
            </button> */}
          </div>
        </div>
      </div>
    );
};

export default Tutor;
