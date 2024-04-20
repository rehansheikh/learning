import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptPetContext.js";
import SearchParams from "./SearchParams.jsx"; // Assuming the file exists in the correct location and the file name and path are correct
import Details from "./Details.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

/* React has a concept of one-way data flow.
 You can pass data from App to Pet not from Pet to App.
*/
const App = () => {
  const adoptedPet = useState(null);
  // App is always captilized, your component should always be capitalized
  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />); //here we are passing a componnet, this is what react does - if you pass a tag it will create tag or if you pass component it will create child components
