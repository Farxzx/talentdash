import { salaries } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const companyRecords = salaries.filter(
    (salary) => salary.slug === slug
  );

  if (companyRecords.length === 0) {
    notFound();
  }

  const company = companyRecords[0];

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        {company.company}
      </h1>

      <p className="mt-4 text-gray-600">
        Location: {company.location}
      </p>

      <h2 className="text-2xl font-bold mt-8">
        Salary Records
      </h2>

      <div className="mt-4">
        {companyRecords.map((record) => (
          <div
            key={record.id}
            className="border p-4 rounded-lg mb-4"
          >
            <p>{record.role}</p>
            <p>{record.level}</p>
            <p>₹{record.totalComp}</p>
          </div>
        ))}
      </div>
    </main>
  );
}