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
      api: "http://localhost:3000/api/countries",
      multiple: false,
    },
    {
      title: "Date",
      type: "date",
    },
  ];

  res.status(200).json(config);
}
