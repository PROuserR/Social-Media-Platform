import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import FavortiesPage from "./pages/FavortiesPage";
import MyPostsPage from "./pages/MyPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import useUserStore from "./stores/UserStore";

function App() {
  const userId = useUserStore((state) => state.userId);

  if (userId) {
    return (
      <main className="flex">
        <NavBar />
        <div className="w-full px-[15%] h-screen overflow-auto  m-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavortiesPage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-post" element={<EditPostPage />} />
          </Routes>
        </div>
      </main>
    );
  } else {
    return (
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    );
  }
}

export default App;
