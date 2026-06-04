import { salaries } from "@/lib/mock-data";

export default function ComparePage() {
  const salary1 = salaries[0];
  const salary2 = salaries[1];

  const difference =
    salary1.totalComp - salary2.totalComp;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Compare Salaries
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            {salary1.company}
          </h2>

          <p>{salary1.role}</p>
          <p>{salary1.level}</p>
          <p>{salary1.location}</p>

          <p className="mt-4 font-bold text-blue-600">
            ₹{salary1.totalComp}
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            {salary2.company}
          </h2>

          <p>{salary2.role}</p>
          <p>{salary2.level}</p>
          <p>{salary2.location}</p>

          <p className="mt-4 font-bold text-blue-600">
            ₹{salary2.totalComp}
          </p>
        </div>
      </div>

      <div className="mt-8 text-xl font-bold">
        Difference: ₹{difference}
      </div>
    </main>
  );
}