import { faker } from "@faker-js/faker";

export default function handler(req, res) {
  let data = [];
  for (let i = 0; i < 10; i++) {
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
