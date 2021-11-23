import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./components/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
