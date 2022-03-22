import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import HerosTable from "./HerosTable";
import HerosFilter from "./HerosFilter";

const allowedFilters = ["email", "phone", "name", "company", "country", "date"];

const Table = ({ query }) => {
  const router = useRouter();

  const [heros, setHeros] = useState([]);

  const [filteredHeros, setFilteredHeros] = useState([]);

  const [filters, setFilters] = useState({});

  const [queryParams, setQueryParams] = useState({});

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

  // Handle initial query params
  function handleQuery(query) {
    let newQuery = {};
    for (let property in query) {
      if (allowedFilters.includes(property)) {
        newQuery = { ...newQuery, [property]: query[property] };
      }
    }

    setQueryParams(newQuery);

    setFilters({
      email: newQuery?.email || "",
      phone: newQuery?.phone || "",
      name: newQuery?.name || "",
      company: newQuery?.company || "",
      country: newQuery?.country || "",
      date: newQuery?.date || "",
    });
  }

  // Fires when queryParams state updates
  useEffect(() => {
    // Git rid of empty filters
    let newQueryParams = {};
    for (let property in queryParams) {
      if (queryParams[property] !== "") {
        newQueryParams = {
          ...newQueryParams,
          [property]: queryParams[property],
        };
      }
    }

    router.push({ query: newQueryParams });
  }, [queryParams]);

  // Fires on filters input change, updates filters state and queryParams state
  function handleFilters(e) {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });

    setQueryParams({ ...queryParams, [name]: value });
  }

  // Fires when filters state change, filters and updates the filteredHeros state
  useEffect(() => {
    const tempFilteredHeros = heros.filter((hero) => {
      for (let property in filters) {
        const heroProperty = hero[property]?.toLowerCase();
        const filterProperty = filters[property]?.toLowerCase();

        if (
          hero[property] === undefined ||
          (!heroProperty.includes(filterProperty) && filterProperty !== "")
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
      email: "",
      phone: "",
      name: "",
      company: "",
      country: "",
      date: "",
    };

    setFilters(resetFilters);
    setQueryParams({});
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
