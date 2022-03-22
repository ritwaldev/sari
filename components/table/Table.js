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

  const [loadingData, setLoadingData] = useState(false);

  // Fetch all heros from backend on page load and update heros states ..
  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_SITE_URL + "/api/heros"
      );
      const data = await response.json();
      setHeros(data);
    }

    async function runFetchData() {
      try {
        await fetchData();
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingData(false);
      }
    }
    runFetchData();
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

    setQueryParams({ ...queryParams, [name]: value.toLowerCase() });
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
  function handleResetFilters(e, countrySelect) {
    e.preventDefault();

    const resetFilters = {
      email: "",
      phone: "",
      name: "",
      company: "",
      country: "",
      date: "",
    };

    // reset selection idex
    countrySelect.current.selectedIndex = 0;

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
      <HerosTable filteredHeros={filteredHeros} loadingData={loadingData} />
    </>
  );
};

export default Table;
