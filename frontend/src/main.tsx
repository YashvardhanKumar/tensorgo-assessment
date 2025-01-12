import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Service from "./routes/Service";
import CreateService from "./routes/CreateService.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id">
          <Route path="" element={<Service />} />
          <Route path="create" element={<CreateService />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);