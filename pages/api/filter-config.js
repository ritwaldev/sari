export default function handler(req, res) {
  const config = [
    {
      title: "Email",
      type: "text",
    },
    {
      title: "Phone",
      type: "text",
    },
    {
      title: "Name",
      type: "text",
    },
    {
      title: "Company",
      type: "text",
    },
    {
      title: "country",
      type: "dropdown",
      api: "http://countryapi.gear.host/v1/Country/getCountries?pLimit=25&pPage=1",
      multiple: false,
    },
    {
      title: "Date",
      type: "date",
    },
  ];

  res.status(200).json(config);
}
