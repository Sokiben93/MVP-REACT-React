import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; //  package contains bindings
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Post from "./Pages/Post";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to React Router!</h1> */}
      <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/createpost">Create A Post</Link>
        <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
