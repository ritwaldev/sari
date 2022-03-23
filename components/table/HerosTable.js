const HerosTable = ({
  filteredHeros,
  loadingData,
  sortHerosAsc,
  sortHerosDsc,
  sortingDirection,
}) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead className="text-white">
            <tr>
              <th
                className="hero-name-table-header d-flex justify-content-between align-items-center"
                scope="col"
              >
                Name
                {sortingDirection && (
                  <svg
                    onClick={sortHerosAsc}
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                  </svg>
                )}
                {!sortingDirection && (
                  <svg
                    onClick={sortHerosDsc}
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                  </svg>
                )}
              </th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">country</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredHeros.map((hero, key) => {
              const date = new Date(hero.date);
              return (
                <tr key={key} className="small">
                  <td className="fw-bold">{hero.name}</td>
                  <td>{hero.phone}</td>
                  <td>
                    <a href={`mailto:${hero.email}`}>{hero.email}</a>
                  </td>
                  <td>{`${date.toLocaleString("en-US", {
                    month: "long",
                  })} ${date.getDate()} -  ${date.getFullYear()}`}</td>
                  <td>{hero.country}</td>
                  <td>{hero.company}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredHeros.length === 0 && !loadingData && (
        <div className="p-3 d-flex justify-content-center">
          No Heros match your filters criteria
        </div>
      )}

      {loadingData && (
        <div className="p-3 d-flex justify-content-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}
    </>
  );
};

export default HerosTable;
