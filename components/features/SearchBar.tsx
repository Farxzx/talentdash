"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      placeholder="Search company..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
      }}
      className="w-full p-3 border rounded-lg mb-6"
    />
  );
}