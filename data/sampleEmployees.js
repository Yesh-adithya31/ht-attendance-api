import bcrypt from "bcryptjs";

const sampleEmployees = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "employee",
    profile: {
      personal: {
        dob: new Date("1990-01-01"),
        address: "123 Main St",
        phone: "123-456-7890",
      },
      professional: {
        jobTitle: "Software Engineer",
        department: "Development",
        dateOfJoining: new Date("2020-01-01"),
      },
      documents: ["doc1.pdf", "doc2.pdf"],
    },
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "manager",
    profile: {
      personal: {
        dob: new Date("1985-05-15"),
        address: "456 Elm St",
        phone: "987-654-3210",
      },
      professional: {
        jobTitle: "Project Manager",
        department: "Management",
        dateOfJoining: new Date("2018-03-15"),
      },
      documents: ["doc3.pdf", "doc4.pdf"],
    },
  },
];

export default sampleEmployees;
