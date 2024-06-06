import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts";
import { Books, Dashboard, Homepage, Login, Profiles, Signup } from "./pages";
import { PrivateRoute } from "./components/common";
import { useUserStore } from "./lib/store";

function App() {
  const { user } = useUserStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute user={user} children={<Dashboard />} />}
          />
          <Route path="books" element={<Books />} />
          <Route path="profiles" element={<Profiles />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
