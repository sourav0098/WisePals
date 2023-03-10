import React from "react";

import FilterBarCSS from "../../assets/FilterBar.module.css";
import LanguagesFilter from "./LanguagesFilter";
import PriceSlider from "./PriceSlider";

interface Props {
  tutorItems: Array<{
    hourlyRate: number;
  }>;
  setPriceFilter: (price: number[]) => void;
  setSpokenLanguagesFilter: (languages: Array<string>) => void;
}

const FilterBar: React.FC<Props> = ({
  tutorItems,
  setPriceFilter,
  setSpokenLanguagesFilter,
}) => {
  return (
    <div className={FilterBarCSS.filterBar}>
      <div className={FilterBarCSS.filterItemContainer}>
        <PriceSlider
          highestPrice={Math.max(
            ...tutorItems.map((tutor) => tutor.hourlyRate)
          )}
          setPriceFilter={setPriceFilter}
        />
      </div>
      <div className={FilterBarCSS.filterItemContainer}>
        <LanguagesFilter
          tutorItems={tutorItems}
          setSpokenLanguagesFilter={setSpokenLanguagesFilter}
        />
      </div>
    </div>
  );
};

export default FilterBar;
