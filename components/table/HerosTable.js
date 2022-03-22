const HerosTable = ({ filteredHeros, loadingData }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead className="text-white">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">country</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredHeros.length > 0 &&
              filteredHeros.map((hero, key) => {
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
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </>
  );
};

export default HerosTable;
