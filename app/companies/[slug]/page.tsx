import { salaries } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = [...new Set(salaries.map((s) => s.slug))];

  return slugs.map((slug) => ({
    slug,
  }));
}

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

  const totalComps = companyRecords
    .map((r) => r.totalComp)
    .sort((a, b) => a - b);

  const medianTC =
    totalComps[
      Math.floor(totalComps.length / 2)
    ];

  const minTC = Math.min(...totalComps);
  const maxTC = Math.max(...totalComps);

  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {company.company}
      </h1>

      <div className="flex gap-4 flex-wrap mb-8">
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          Median TC: ₹
          {medianTC.toLocaleString("en-IN")}
        </div>

        <div className="bg-green-100 px-4 py-2 rounded-lg">
          Range: ₹
          {minTC.toLocaleString("en-IN")}
          {" - "}
          ₹
          {maxTC.toLocaleString("en-IN")}
        </div>

        <div className="bg-purple-100 px-4 py-2 rounded-lg">
          Records: {companyRecords.length}
        </div>
      </div>

      <Link
        href={`/compare?c1=${slug}`}
        className="bg-sky-600 text-white px-4 py-2 rounded-lg"
      >
        Compare
      </Link>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Salary Records
      </h2>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">
              Role
            </th>
            <th className="p-4 text-left">
              Level
            </th>
            <th className="p-4 text-left">
              Location
            </th>
            <th className="p-4 text-left">
              Experience
            </th>
            <th className="p-4 text-left">
              Total Comp
            </th>
          </tr>
        </thead>

        <tbody>
          {companyRecords.map((record) => (
            <tr
              key={record.id}
              className="border-b"
            >
              <td className="p-4">
                {record.role}
              </td>

              <td className="p-4">
                {record.level}
              </td>

              <td className="p-4">
                {record.location}
              </td>

              <td className="p-4">
                {record.experience} yrs
              </td>

              <td className="p-4 font-bold text-sky-700">
                ₹
                {record.totalComp.toLocaleString(
                  "en-IN"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}