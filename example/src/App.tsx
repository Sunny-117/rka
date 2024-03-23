import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import { KeepAlive, KeepAliveTransfer } from "rkajs";

const AliveHomeView = KeepAliveTransfer(Home, "home");
const AliveFormView = KeepAliveTransfer(Form, "form");

export default function App() {
  return (
    <BrowserRouter>
      <KeepAlive>
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
              <Route path="/" element={<AliveHomeView></AliveHomeView>}></Route>
              <Route
                path="/form"
                element={<AliveFormView></AliveFormView>}
              ></Route>
            </Routes>
          </div>
        </div>
      </KeepAlive>
    </BrowserRouter>
  );
}
