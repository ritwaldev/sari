import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import HerosTable from "./HerosTable";
import HerosFilter from "./HerosFilter";

const Table = ({ query }) => {
  const router = useRouter();

  const [heros, setHeros] = useState([]);

  const [filteredHeros, setFilteredHeros] = useState([]);

  const [filters, setFilters] = useState({
    email: "any",
    phone: "any",
    name: "any",
    company: "any",
    country: "any",
    date: "any",
  });

  // Fetch all heros from backend on page load and update heros states ..
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/api/heros");
      const data = await response.json();
      setHeros(data);
    }

    getData();
  }, []);

  useEffect(() => {
    handleQuery(query);

    if (!query) {
      setFilteredHeros(heros);
    }
  }, [heros]);

  function handleQuery(newQuery) {
    setFilters({
      email: newQuery?.email || "any",
      phone: newQuery?.phone || "any",
      name: newQuery?.name || "any",
      company: newQuery?.company || "any",
      country: newQuery?.country || "any",
      date: newQuery?.date || "any",
    });
  }

  // Fires on filters input change, updates filters state and query params
  function handleFilters(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    router.push({
      query: { ...filters, [name]: value },
    });
  }

  // Fires when filters state change, filters and updates the filteredHeros state
  useEffect(() => {
    const tempFilteredHeros = heros.filter((hero) => {
      for (let property in filters) {
        if (
          hero[property] === undefined ||
          (hero[property] !== filters[property] && filters[property] !== "any")
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredHeros(tempFilteredHeros);
  }, [filters]);

  // Fires on reset filters button click
  function handleResetFilters(e) {
    e.preventDefault();

    const resetFilters = {
      email: "any",
      phone: "any",
      name: "any",
      company: "any",
      country: "any",
      date: "any",
    };

    setFilters(resetFilters);
    router.push({
      query: resetFilters,
    });
  }

  return (
    <>
      <HerosFilter
        filters={filters}
        handleFilters={handleFilters}
        /* handleFilterFormSubmit={handleFilterFormSubmit} */
        handleResetFilters={handleResetFilters}
      />
      <HerosTable filteredHeros={filteredHeros} />
    </>
  );
};

export default Table;
