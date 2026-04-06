import { Route, Routes } from "react-router";
import { Dashboard } from "@/features/Dashboard";
import { Treasury } from "@/features/Treasury";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="treasury" element={<Treasury />} />
    </Routes>
  );
};
