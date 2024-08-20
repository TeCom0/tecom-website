import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Works from "./pages/Works"
import SignInForm from "./pages/Login"
import Manager from "./pages/Manager"
import Profile from "./components/Profile"
import Event from "./components/Events"
import Members from "./components/Members"
import NotFound from "./pages/NotFound"
import Computer from "./components/useCom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:eventType" element={<Works />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="404" element={<NotFound />} />
          <Route path="/useComputer" element={<Computer />} />
          <Route path="/manager" element={<Manager />}>
            <Route index element={<Navigate to='/manager/profile' />} />
            <Route path="profile" element={<Profile />} />
            <Route path="events" element={<Event />} />
            <Route path="members" element={<Members />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
