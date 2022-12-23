import React, { Suspense, useEffect, useState } from "react";
import "./assets/styles/index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Archives from "./pages/Archives";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContext from "./context/AuthContext";
import ProgressContext from "./context/ProgressContext";
import PageNotFound from "./pages/PageNotFound";
const ShortLink = React.lazy(() => import("./pages/ShortLink"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={user}>
        <ProgressContext.Provider value={{ progress, setProgress }}>
          <div className="App">
            <Container maxW="5xl" height="100vh">
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={<Suspense>{!user && <Home />}</Suspense>}
                />
              </Routes>
              <Routes>
                <Route path="/signup" element={!user && <SignUp />} />
              </Routes>
              <Routes>
                <Route path="/login" element={!user && <Login />} />
              </Routes>
              <Routes>
                <Route path="/archives" element={user && <Archives />} />
              </Routes>
              <Routes>
                <Route
                  path="/create"
                  element={
                    <Suspense>
                      <ShortLink />
                    </Suspense>
                  }
                />
              </Routes>
            </Container>
          </div>
        </ProgressContext.Provider>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
