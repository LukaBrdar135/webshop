import React, { useEffect, useState } from "react";
import SectionItem from "./SectionItem";
import Spinner from "../UI/Spinner";
import Section from "../../types/Section";
import classes from "./SectionsGrid.module.css";
import useHttp from "../../hooks/use-http";
import { FIREBASE_URL } from "../../globals/GlobalConstants";

const SectionsGrid: React.FC = () => {
  const { isLoading, sendRequest } = useHttp();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    sendRequest(
      {
        url: FIREBASE_URL + "sections.json",
      },
      setSections
    );
  }, [sendRequest]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className={classes.grid}>
        {sections.map((item: Section) => (
          <SectionItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default SectionsGrid;
