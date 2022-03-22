export default async function handler(req, res) {
  async function fetchData() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + "data/data.json"
    );

    const data = await response.json();

    let APIresponse;

    if (Object.keys(req.query).length === 0) {
      APIresponse = data.map((country) => {
        return {
          name: country.name,
          alpha3Code: country.alpha3Code,
        };
      });
    }

    res.status(200).json(APIresponse);
  }

  await fetchData();
}
