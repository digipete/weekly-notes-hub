import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import Weeknotes from "@/pages/Weeknotes";
import WeeknotesDetail from "@/pages/WeeknotesDetail";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/weeknotes" element={<Weeknotes />} />
        <Route path="/weeknotes/:slug" element={<WeeknotesDetail />} />
        <Route path="/404.html" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
