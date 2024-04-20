//UseEffect is used to run side effects in functional components, like api calls, subscriptions, timers, etc, save to local storage.
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results.jsx";
import useBreedList from "./useBreedList.js";
import fetchSearch from "./fetchSearch.js";
import AdoptedPetContext from "./AdoptPetContext.js";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //They have to be called evryy single time in same order.
  //you cannot have conditional hooks.
  //const locationHook = userState("Seattle, WA");
  //const location = locationHook[0];
  //const setLocation = locationHook[1];
  //The above line is same as const [location, setLocation] = useState("Seattle, WA");

  const [requestParams, setRequestParams] = useState({
    location: "Seattle, WA",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal); //useBreedList is a custom hook
  const [adoptedPet] = useContext(AdoptedPetContext); //useContext is a hook to get the context value

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results.data?.pets || [];

  //effects runs every time the component is rendered
  // useEffect(() => {
  //   requestPets();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); //empty array means it will run only once, if you remove the empty array it will run every time the component is rendered

  // async function requestPets() {
  //   const res = await fetch(
  //     `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }
  //const location = "Seattle, WA";
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setRequestParams({
            location: formData.get("location") ?? "Seattle, WA",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select id="breed" disabled={!breeds.length} name="breed">
          <option />
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button> Submit </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
