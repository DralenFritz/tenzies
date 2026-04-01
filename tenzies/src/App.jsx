import Main from "./components/Main";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/numbers" element={<Main dieType="numbers" />}/>
        <Route path="/pips" element={<Main dieType="pips" />}/>
        <Route path="/*" element={<Navigate to="/numbers" replace />}/>
      </Routes>
    </>
  )
}