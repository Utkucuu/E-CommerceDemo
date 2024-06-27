"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../../public/icon";
import SearchResults from "./SearchResults";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Input
        classNames={{
          base: "min-w-full sm:max-w-[10rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Search..."
        size="sm"
        startContent={<SearchIcon size={18} width={20} height={20} />}
        type="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {searchTerm && isDropdownOpen && (
        <SearchResults
          searchTerm={searchTerm}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      )}
    </div>
  );
};

export default SearchInput;
