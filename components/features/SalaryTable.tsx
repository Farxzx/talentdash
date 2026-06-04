"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import LevelFilter from "./LevelFilter";
import { salaries } from "@/lib/mock-data";

export default function SalaryTable() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredSalaries = salaries
    .filter((salary) => {
      const matchesSearch = salary.company
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLevel =
        level === "All" || salary.level === level;

      return matchesSearch && matchesLevel;
    })
    .sort((a, b) =>
      sortOrder === "desc"
        ? b.totalComp - a.totalComp
        : a.totalComp - b.totalComp
    );

  return (
    <>
      <SearchBar onSearch={setSearch} />

      <LevelFilter
        selected={level}
        onChange={setLevel}
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 rounded-lg mb-4"
      >
        <option value="desc">Highest Compensation</option>
        <option value="asc">Lowest Compensation</option>
      </select>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Base</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Total Comp</th>
            </tr>
          </thead>

          <tbody>
            {filteredSalaries.map((salary) => (
              <tr key={salary.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{salary.company}</td>

                <td className="p-4">{salary.role}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      salary.level === "L3"
                        ? "bg-slate-500"
                        : salary.level === "L4"
                        ? "bg-blue-500"
                        : salary.level === "L5"
                        ? "bg-indigo-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {salary.level}
                  </span>
                </td>

                <td className="p-4">{salary.location}</td>

                <td className="p-4">
                  {salary.experience} yrs
                </td>

                <td className="p-4">
                  ₹{salary.baseSalary.toLocaleString("en-IN")}
                </td>

                <td className="p-4">
                  ₹{salary.stock.toLocaleString("en-IN")}
                </td>

                <td className="p-4 font-bold text-sky-700">
                  ₹{salary.totalComp.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}