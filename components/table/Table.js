import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import HerosTable from "./HerosTable";
import HerosFilter from "./HerosFilter";

export const herosContext = React.createContext();

const allowedFilters = ["email", "phone", "name", "company", "country", "date"];

const Table = ({ query }) => {
  const router = useRouter();

  const [heros, setHeros] = useState([]);

  const [sortedHeros, setSortedHeros] = useState([]);

  const [filteredHeros, setFilteredHeros] = useState([]);

  const [sortingDirection, setSortingDirection] = useState(true);

  const [filters, setFilters] = useState({});

  const [queryParams, setQueryParams] = useState({});

  const [loadingData, setLoadingData] = useState(false);

  // Fetch all heros from backend on page load and update heros state ..
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
        // should set a state with error and use that state to display an error message
        console.error(e);
      } finally {
        setLoadingData(false);
      }
    }
    runFetchData();
  }, []);

  // Handle query params on first page load
  useEffect(() => {
    handleQuery();

    setSortedHeros(heros);

    if (!query) {
      setFilteredHeros(heros);
    }
  }, [heros]);

  // Handle initial query params
  function handleQuery() {
    let newQuery = {};
    for (let key in query) {
      if (allowedFilters.includes(key)) {
        newQuery = { ...newQuery, [key]: query[key] };
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
    for (let key in queryParams) {
      if (queryParams[key] !== "") {
        newQueryParams = {
          ...newQueryParams,
          [key]: queryParams[key],
        };
      }
    }

    router.push({ query: newQueryParams }, undefined, { shallow: true });
  }, [queryParams]);

  // Fires on filters input change, updates filters state and queryParams state
  function handleFilters(e) {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });

    setQueryParams({ ...queryParams, [name]: value.toLowerCase() });
  }

  // Fires when filters state change, filters and updates the filteredHeros state
  useEffect(() => {
    const tempFilteredHeros = sortedHeros.filter((hero) => {
      for (let key in filters) {
        // normalize to lowercase to be able to match without case sensitivity
        const heroProperty = hero[key]?.toLowerCase();
        const filterProperty = filters[key]?.toLowerCase();

        if (
          hero[key] === undefined ||
          (!heroProperty.includes(filterProperty) && filterProperty !== "")
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredHeros(tempFilteredHeros);
  }, [filters, sortedHeros]);

  // Fires on reset filters button click
  function handleResetFilters(e, countrySelectRef) {
    e.preventDefault();

    const resetFilters = {
      email: "",
      phone: "",
      name: "",
      company: "",
      country: "",
      date: "",
    };

    // reset selection index
    countrySelectRef.current.selectedIndex = 0;

    setFilters(resetFilters);
    setQueryParams({});
  }

  // sort heros by name
  let tempSortedHeros, an, bn;
  function sortHerosAsc() {
    tempSortedHeros = [...sortedHeros].sort((a, b) => {
      an = a.name.split(" ", 2)[0].toLowerCase();
      bn = b.name.split(" ", 2)[0].toLowerCase();

      if (an < bn) {
        return -1;
      }
      if (an > bn) {
        return 1;
      }
      return 0;
    });

    sortName(tempSortedHeros);
  }

  function sortHerosDsc() {
    tempSortedHeros = [...sortedHeros].sort((a, b) => {
      an = a.name.split(" ", 2)[0].toLowerCase();
      bn = b.name.split(" ", 2)[0].toLowerCase();

      if (an < bn) {
        return 1;
      }
      if (an > bn) {
        return -1;
      }
      return 0;
    });

    sortName(tempSortedHeros);
  }

  function sortName(tempSortedHeros) {
    setSortingDirection((sortDir) => !sortDir);

    setSortedHeros(tempSortedHeros);
  }

  return (
    <>
      <herosContext.Provider value={heros}>
        <HerosFilter
          filters={filters}
          handleFilters={handleFilters}
          handleResetFilters={handleResetFilters}
        />
      </herosContext.Provider>
      <HerosTable
        filteredHeros={filteredHeros}
        loadingData={loadingData}
        sortHerosAsc={sortHerosAsc}
        sortHerosDsc={sortHerosDsc}
        sortingDirection={sortingDirection}
      />
    </>
  );
};

export default Table;
