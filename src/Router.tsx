import { Route, Routes } from "react-router";
import { Dashboard } from "@/features/Dashboard";
import { Treasury } from "@/features/Treasury";
import { Upgrades } from "@/features/Upgrades";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="treasury" element={<Treasury />} />
      <Route path="upgrades" element={<Upgrades />} />
    </Routes>
  );
};
