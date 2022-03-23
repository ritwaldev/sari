export default async function handler(req, res) {
  async function fetchData() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + "data/data.json"
    );

    const data = await response.json();

    const countries = data.map((country) => {
      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
      };
    });

    const startIndex = (req.query.pPage - 1) * req.query.pLimit || 0;
    const endIndex = req.query.pPage * req.query.pLimit || 300;

    const paginatedCountries = countries.slice(startIndex, endIndex);

    res.status(200).json(paginatedCountries);
  }

  async function runFetchData() {
    try {
      await fetchData();
    } catch (e) {
      console.error(e);
    }
  }

  await runFetchData();
}
