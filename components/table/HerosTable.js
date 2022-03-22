const HerosTable = ({ filteredHeros }) => {
  return (
    <>
      <table className="table">
        <thead>
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

      {filteredHeros.length === 0 && (
        <div className="d-flex justify-content-center">
          No Heros match your filters criteria
        </div>
      )}
    </>
  );
};

export default HerosTable;
