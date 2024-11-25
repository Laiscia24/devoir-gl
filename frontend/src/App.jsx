import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Etudiant from "./pages/etudiant/Etudiant";
import Classe from "./pages/classe/Classe";
import Utilisateur from "./pages/utilisateur/Utilisateur";
import Fiche from "./pages/fiche/Fiche";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const BASE_URL = "http://localhost:8800";

const App = () => {
  return <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
          <Route index element={<Navigate replace to="etudiant"/>}/>
          <Route path="etudiant" element={<Etudiant BASE_URL={BASE_URL}/>}/>
          <Route path="classe" element={<Classe BASE_URL={BASE_URL}/>}/>
          <Route path="utilisateur" element={<Utilisateur BASE_URL={BASE_URL}/>}/>
          <Route path="etudiant/fiche" element={<Fiche BASE_URL={BASE_URL}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  
};

export default App;
