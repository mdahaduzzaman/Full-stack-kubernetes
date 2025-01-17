import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts";
import { Books, Dashboard, Homepage, Login, Profiles, Signup } from "./pages";
import { PrivateRoute } from "./components/common";
import { useUserStore } from "./lib/store";
import { Toaster } from "@/components/ui/toaster";
function App() {
  const { user } = useUserStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="dashboard"
            element={<PrivateRoute user={user} children={<Dashboard />} />}
          />
          <Route
            path="books"
            element={<PrivateRoute user={user} children={<Books />} />}
          />
          <Route
            path="profiles"
            element={<PrivateRoute user={user} children={<Profiles />} />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
