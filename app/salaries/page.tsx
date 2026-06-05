import type { Metadata } from "next";
import SalaryTable from "@/components/features/SalaryTable";

export const metadata: Metadata = {
  title: "Software Engineer Salaries | TalentDash",
  description:
    "Compare software engineer salaries across top tech companies, levels, and locations.",
};

export default function SalariesPage() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Software Engineer Salaries
      </h1>

      <SalaryTable />
    </main>
  );
}