import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForYou from "./pages/ForYou";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import PaymentMethod from "./pages/PaymentMethod";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Search from "./pages/Search";
import Help from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/for-you"
          element={
            <>
              <Sidebar />
              <ForYou />
            </>
          }
        />

        <Route
          path="/library"
          element={
            <>
              <Sidebar />
              <Library />
            </>
          }
        />

        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/payment" element={<PaymentMethod />} />

        <Route
          path="/settings"
          element={
            <>
              <Sidebar />
              <Settings />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;