import { useState, useEffect } from "react";

import HerosTable from "./HerosTable";
import HerosFilter from "./HerosFilter";

const Table = () => {
  const [heros, setHeros] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/api/heros");
      const data = await response.json();

      setHeros(data);
    }

    getData();
  }, []);

  return (
    <>
      <HerosFilter />
      <HerosTable heros={heros} />
    </>
  );
};

export default Table;
