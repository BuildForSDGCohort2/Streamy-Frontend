import React from "react";
import AppNavbar from "../components/AppNavbar";
import AppHeader from "../components/AppHeader";
import MovieRow from "../components/MovieRow";

export default function Home() {
  return (
    <div className="main-content">
      <AppNavbar />
      <AppHeader />
      <MovieRow />
    </div>
  );
}
