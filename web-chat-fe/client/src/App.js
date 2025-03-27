import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage/HomePage";
import "./index.css"; // File chứa Tailwind
import Group from "./component/Group/Group";
import Register from "./component/Register/Register";
import Login from './component/Register/Login';
import Test from "./component/test/Test";
import Status from "./component/Status/Status";
import FriendRequest from "./component/AddFriend/FriendRequest";
import WatchUser from "./component/AddFriend/WatchUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create-group" element={<Group/>}></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/status" element= {<Status/>}></Route>
        <Route path="/Friend" element= {<FriendRequest/>}></Route>
        <Route path="/watch-user" element={<WatchUser/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
