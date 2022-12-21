import React, { Suspense, useEffect, useState } from "react";
import "./assets/styles/index.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContext from "./context/AuthContext";
const ShortLink = React.lazy(() => import("./pages/ShortLink"));
const Home = React.lazy(() => import("./pages/Home"));
const Archives = React.lazy(() => import("./pages/Archives"));

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      setUser(userLoggedIn);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={user}>
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
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
              <Route
                path="/archives"
                element={
                  <Suspense>
                    <Archives />
                  </Suspense>
                }
              />
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
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
