import mongoose from "mongoose";
import { Contact } from "./contactSchema.js";
import { faker } from "@faker-js/faker";

const connectDB = async () => {
  try {
    await mongoose.connect("dbUrl_here");
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
};

const generateContacts = (num) => {
  const users = [];

  for (let i = 0; i < num; i++) {
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const phone = '+91' + faker.number.int({ min: 6000000000, max: 9999999999 });
    const adBudget = faker.number.int({ min: 1000, max: 50000 });
    const city = faker.location.city();
    const state = faker.location.state();
    const country = faker.location.country();
    const teamSize = faker.number.int({ min: 1, max: 500 });
    const revenue = faker.number.int({ min: 10000, max: 500000 });
    const enrollingDate = faker.date.between({
      from: '2019-01-01',
      to: '2024-03-19'
    });
    users.push({
      "subaccount": "63be5e5ed3e3860011909e9e",
      properties: [
        {
          name: 'name_sp',
          value: fullName
        },
        {
          name: 'email_sp',
          value: email
        },
        {
          name: 'phone_sp',
          value: phone
        },
        {
          name: 'Ad_Budget_sp',
          value: adBudget
        },
        {
          name: 'city_sp',
          value: city
        },
        {
          name: 'country_sp',
          value: country
        },
        {
          name: 'state_sp',
          value: state
        },
        {
          name: 'Team_Size_sp',
          value: teamSize
        },
        {
          name: 'Revenue_sp',
          value: revenue
        },
        {
          name: 'Enrolling_Date_sp',
          value: enrollingDate
        },
      ]
    });
  }

  return users;
};

const insertContactsInBatches = async (contacts, batchSize) => {
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    try {
      await Contact.insertMany(batch);
      console.log(`Inserted batch ${i / batchSize + 1}`);
    } catch (error) {
      console.error(error);
    }
  }
};

(async () => {
  await connectDB();
  const numContacts = 500000;
  const batchSize = 1000;
  const contacts = generateContacts(numContacts);
  await insertContactsInBatches(contacts, batchSize);
  console.log('All batches inserted.');
})();
