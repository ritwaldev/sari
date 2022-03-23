export default function handler(req, res) {
  const requiredFields = Object.keys(req.query);

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
      title: "Country",
      type: "dropdown",
      api:
        process.env.NEXT_PUBLIC_SITE_URL + "/api/countries?pLimit=270&pPage=1",
      multiple: false,
    },
    {
      title: "Date",
      type: "date",
    },
  ];

  const response = config.filter((input) =>
    requiredFields.includes(input.title.toLowerCase())
  );

  res.status(200).json(response);
}
