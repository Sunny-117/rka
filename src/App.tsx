import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/form"}>Form</Link>
          </li>
        </ul>
        <div>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/form" element={<Form></Form>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
