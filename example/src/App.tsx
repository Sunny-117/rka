import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import { KeepAlive, KeepAliveTransfer, useKeepAlive } from "rkajs";

const AliveHomeView = KeepAliveTransfer(Home, "home");
const AliveFormView = KeepAliveTransfer(Form, "form");

function Controls() {
  const { refresh, drop } = useKeepAlive();

  //  分析与修复说明

  //  Refresh home 与 Drop form cache 之所以没有按预期工作，是因为旧实现只清空了已捕获的 DOM 节点，却继续复用同一个 React 元素实例；React
  //  因此保留了原有组件状态，刷新与丢弃操作都不会触发真正的重建。
  //  此次更新在缓存状态中新增 version 字段，并在 refresh/drop 时将条目标记为 REFRESHING 或 DROPPED，清空缓存节点与 React
  //  元素，同时自增版本号。Provider 在渲染缓存容器时使用 keepAliveId-version 作为 key，于是版本一变，React
  //  会卸载旧实例并重新挂载全新的组件。

  //  预期效果
  //  •  Refresh home：立即移除 Home 页缓存并强制其重新挂载，任何局部状态都会被重置，相当于刷新组件。
  //  •  Drop form cache：清空 Form 页缓存；若当前正在 Form 页，会触发即时重建；若不在 Form 页，下次导航到 /form
  //     时会以全新实例渲染，之前的表单输入不会被保留。

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
      <button type="button" onClick={() => refresh("home")}>
        Refresh home
      </button>
      <button type="button" onClick={() => drop("form")}>
        Drop form cache
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <KeepAlive>
        <div>
          <Controls />
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
