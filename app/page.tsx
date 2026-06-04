import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-4">
        TalentDash
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Compare software engineering compensation across companies,
        levels, and locations.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/salaries"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          View Salaries
        </Link>

        <Link
          href="/compare"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Compare Salaries
        </Link>

        <Link
          href="/companies/google"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Google Salaries
        </Link>
      </div>
    </main>
  );
}