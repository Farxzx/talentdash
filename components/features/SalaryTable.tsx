"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import LevelFilter from "./LevelFilter";
import { salaries } from "@/lib/mock-data";

export default function SalaryTable() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [location, setLocation] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 25;

  const filteredSalaries = salaries
    .filter((salary) => {
      const matchesSearch = salary.company
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLevel =
        level === "All" || salary.level === level;

      const matchesLocation =
        location === "All" ||
        salary.location === location;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesLocation
      );
    })
    .sort((a, b) =>
      sortOrder === "desc"
        ? b.totalComp - a.totalComp
        : a.totalComp - b.totalComp
    );

  const totalRecords = filteredSalaries.length;

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const endIndex =
    startIndex + recordsPerPage;

  const paginatedSalaries =
    filteredSalaries.slice(
      startIndex,
      endIndex
    );

  return (
    <>
      <SearchBar onSearch={setSearch} />

      <div className="flex gap-4 mb-4 flex-wrap">
        <LevelFilter
          selected={level}
          onChange={setLevel}
        />

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded-lg"
        >
          <option value="All">
            All Locations
          </option>
          <option value="Bengaluru">
            Bengaluru
          </option>
          <option value="Hyderabad">
            Hyderabad
          </option>
          <option value="Pune">
            Pune
          </option>
          <option value="Gurgaon">
            Gurgaon
          </option>
          <option value="Mumbai">
            Mumbai
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option value="desc">
            Highest Compensation
          </option>

          <option value="asc">
            Lowest Compensation
          </option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Company
              </th>
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
                Base
              </th>
              <th className="p-4 text-left">
                Stock
              </th>
              <th className="p-4 text-left">
                Total Comp
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSalaries.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center p-8"
                >
                  <p className="text-gray-500 mb-4">
                    No records found for these
                    filters. Try removing a
                    filter.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setLevel("All");
                      setLocation("All");
                      setCurrentPage(1);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Clear Filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedSalaries.map((salary) => (
                <tr
                  key={salary.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4">
                    {salary.company}
                  </td>

                  <td className="p-4">
                    {salary.role}
                  </td>

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

                  <td className="p-4">
                    {salary.location}
                  </td>

                  <td className="p-4">
                    {salary.experience} yrs
                  </td>

                  <td className="p-4">
                    ₹
                    {salary.baseSalary.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="p-4">
                    ₹
                    {salary.stock.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="p-4 font-bold text-sky-700">
                    ₹
                    {salary.totalComp.toLocaleString(
                      "en-IN"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}–
          {Math.min(
            endIndex,
            totalRecords
          )} of {totalRecords} records
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={
              endIndex >= totalRecords
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}