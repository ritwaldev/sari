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
      title: "Country",
      type: "dropdown",
      api: process.env.NEXT_PUBLIC_SITE_URL + "/api/countries",
      multiple: false,
    },
    {
      title: "Date",
      type: "date",
    },
  ];

  res.status(200).json(config);
}
