import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/layouts/main-layout";
import DisplayAlbum from "./pages/display-album";
import DisplaySong from "./pages/display-song";
import DisplayHome from "./components/display-home";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import AuthLayout from "./pages/layouts/auth-layout";
import Dashboard from "./pages/admin/dashboard";
import AddSong from "./pages/admin/add-song";
import ListSongs from "./pages/admin/list-songs";
import ListAlbums from "./pages/admin/list-albums";
import AdminLayout from "./pages/layouts/admin-layout";
import AddAlbum from "./pages/admin/add-album";
import ProtectedRoute from "./pages/layouts/protected-layout";


function App() {

  return (
    <>
        <Routes>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />} >
                <Route index element={<DisplayHome />}  />
                <Route path='/album/:albumId' element={<DisplayAlbum />} />
                <Route path='/song/:songId' element={<DisplaySong />} />
              </Route>
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-song" element={<AddSong />} />
              <Route path="list-songs" element={<ListSongs />} />
              <Route path="add-album" element={<AddAlbum />} />
              <Route path="list-albums" element={<ListAlbums />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>

            <Route path='*' element={<Navigate to={"/"} />} />

        </Routes>

    </>
  )
}

export default App
