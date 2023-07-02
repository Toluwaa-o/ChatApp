"use client";
import { useState, useEffect, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const Search = () => {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    if (search) {
      setDetails({ loading: true, data: [], error: null });
      axios
        .get(`http://localhost:3000/api/users/get-users?username=${search}`)
        .then((res) => {
          setDetails({ loading: false, data: res.data.users, error: null });
        });
    }
  }, [search]);

  return (
    <>
      {details.error && (
        <Alert className="items-center text-lg" severity="error">
          {details.error}
        </Alert>
      )}
      <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg md:p-3 relative z-10">
        <AiOutlineSearch size={20} />
        <input
          className="bg-gray-200 outline-none focus:b-[80vh]"
          type="text"
          name="search"
          placeholder="Search for friends"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search ? (
          <span className="fixed top-[13vh] bg-white w-[100%] md:w-[33%] h-[100%] p-3 m-auto left-0 right-0 md:right-auto">
            <Suspense fallback={<CircularProgress color="inherit" />}>
              {details.data.map((user) => (
                <SearchResults key={user.id} setSearch={setSearch} {...user} />
              ))}
            </Suspense>
          </span>
        ) : null}
      </div>
    </>
  );
};

export default memo(Search);
