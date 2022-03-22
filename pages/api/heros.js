import { faker } from "@faker-js/faker";

export default function handler(req, res) {
  // lets define a bunch of static heros for the sake of testing
  let data = [
    {
      name: "Ahmed Khalid",
      phone: "(966) 541-5441",
      email: "ahmed.khalid@test.com",
      date: "2019-10-21T07:28:31.351Z",
      country: "Saudi Arabia",
      company: "Sari",
    },
  ];

  // Generate rest if heros with fake data
  for (let i = 0; i < 100; i++) {
    data.push({
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber("(###) ###-####"),
      email: faker.internet.email(),
      date: faker.date.past(20),
      country: faker.address.country(),
      company: faker.company.companyName(),
    });
  }

  res.status(200).json(data);
}
