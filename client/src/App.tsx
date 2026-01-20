import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import BookDetails from "@/pages/BookDetails";
import Favorites from "@/pages/Favorites";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ProfilePage from "@/pages/ProfilePage";

// Router props interface
interface RouterProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  profileImage: string;
}

// Router component
function Router({
  loggedIn,
  setLoggedIn,
  setUserName,
  setProfileImage,
  userName,
  profileImage,
}: RouterProps) {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/book/:id" component={BookDetails} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/about" component={About} />

      {/* Login page with props */}
      <Route path="/login">
        <LoginPage
          setLoggedIn={setLoggedIn}
          setUserName={setUserName}
          setProfileImage={setProfileImage}
        />
      </Route>

      {/* Signup page with props */}
      <Route path="/signup">
        <SignUpPage
          setLoggedIn={setLoggedIn}
          setUserName={setUserName}
          setProfileImage={setProfileImage}
        />
      </Route>

      {/* Profile page with props */}
      <Route path="/profile">
        <ProfilePage
          userName={userName}
          setUserName={setUserName}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      </Route>

      {/* Catch-all 404 */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

// App component
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User"); // default username is "User"
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [walletBalance, setWalletBalance] = useState(0); // NEW: Wallet balance state

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              {/* Header */}
              <Header
                loggedIn={loggedIn}
                userName={userName}
                profileImage={profileImage}
                setLoggedIn={setLoggedIn}
                balance={walletBalance} // Pass wallet balance to header
              />

              {/* Main content */}
              <main className="flex-1">
                <Router
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setUserName={setUserName}
                  setProfileImage={setProfileImage}
                  userName={userName}
                  profileImage={profileImage}
                />
              </main>

              {/* Footer */}
              <Footer />
            </div>

            <Toaster />
          </TooltipProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
