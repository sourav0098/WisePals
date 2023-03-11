import React from "react";
import FilterBarCSS from "../../assets/FilterBar.module.css";
import MultiSelect from "./MultiSelect";

interface tutorItemsProps {
  tutorItems: Array<object>;
  setSpokenLanguagesFilter: (languagesArray: Array<string>) => void;
}

const LanguagesFilter: React.FC<tutorItemsProps> = ({
  tutorItems,
  setSpokenLanguagesFilter,
}) => {
  const languagesArray: Array<string> = [];

  const languagesOfTutors: Array<object> = [];
  tutorItems.map((tutor: object) => {
    tutor.spokenLanguages.map((language: string) => {
      const languageUpperCase = language.toUpperCase();
      const languageFirstLetterUpperCase =
        language[0].toUpperCase() + language.slice(1);
      if (
        !languagesOfTutors.some(
          (item) => item.language.toUpperCase() === languageUpperCase
        )
      ) {
        languagesOfTutors.push({ language: languageFirstLetterUpperCase });
      }
    });
  });

  const convertAndsetSpokenLanguagesFilter = (
    multipleLanguages: Array<object>
  ) => {
    multipleLanguages.map((languageObject: object) => {
      languagesArray.push(languageObject.language.toLowerCase());
    });
    setSpokenLanguagesFilter(languagesArray);
  };

  return (
    <>
      <div className={FilterBarCSS.languageFilterText}>
        <label>Languages</label>
      </div>
      <div className={FilterBarCSS.multiselect}>
        <MultiSelect
          data={[...new Set(languagesOfTutors)]}
          displayValue="language"
          onSelect={convertAndsetSpokenLanguagesFilter}
          onRemove={convertAndsetSpokenLanguagesFilter}
        />
      </div>
    </>
  );
};

export default LanguagesFilter;
