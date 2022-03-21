import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

import HerosTable from "../components/HerosTable";

const heros = () => {
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
    <div className="heros-page">
      <div className="container-fluid bg-white shadow-sm p-0 mb-5">
        <div className="container">
          <Navbar />
        </div>
      </div>
      <div className="container mt-5 mb-3">
        <h2>Heros</h2>
      </div>
      <div className="container mb-5">
        <div className="p-5 rounded-4 bg-white shadow-sm">
          <HerosTable heros={heros} />
        </div>
      </div>
    </div>
  );
};

export default heros;
