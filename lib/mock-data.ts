import { SalaryRecord } from "@/types/salary";

const companies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Meta",
  "Apple",
  "Uber",
  "Atlassian",
  "Adobe",
  "Salesforce",
  "Oracle",
  "Nvidia",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "Goldman Sachs",
];

const locations = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Gurgaon",
  "Mumbai",
];

const levels = ["L3", "L4", "L5", "L6"];

export const salaries: SalaryRecord[] = companies.flatMap(
  (company, companyIndex) =>
    levels.map((level, levelIndex) => {
      const baseSalary =
        1800000 + levelIndex * 800000 + companyIndex * 50000;

      const bonus = levelIndex * 100000;
      const stock = levelIndex * 300000;

      return {
        id: String(companyIndex * 10 + levelIndex + 1),
        company,
        slug: company.toLowerCase().replace(/\s+/g, "-"),
        role: "Software Engineer",
        level,
        location:
          locations[
            (companyIndex + levelIndex) % locations.length
          ],
        experience: levelIndex + 2,
        baseSalary,
        bonus,
        stock,
        totalComp: baseSalary + bonus + stock,
      };
    })
);