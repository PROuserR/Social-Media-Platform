import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import FavortiesPage from "./pages/FavortiesPage";
import MyProfilePage from "./pages/MyPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import useUserStore from "./stores/UserStore";
import "./App.css";

function App() {
  const userId = useUserStore((state) => state.userId);

  if (userId) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavortiesPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post" element={<EditPostPage />} />
        </Routes>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
}

export default App;
