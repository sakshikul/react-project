import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Result from './Result';
import useDropdown from "./useDropdown";
import regeneratorRuntime from "regenerator-runtime";


const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");

  const [breeds, updateBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

// below state declarations
async function requestPets() {
  const { animals } = await pet.animals({
    location,
    breed,
    type: animal
  });

  setPets(animals || []);
}
useEffect(() => {
    updateBreeds([]);
    updateBreed("");
    pet.breeds(animal).then(({ breeds : breedsapi}) => {
      const breedStrings = breedsapi.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
     <form
  onSubmit={e => {
    e.preventDefault();
    requestPets();
  }}
>
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onBlur={e => setLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Result pets = {pets} />
    </div>
  );
};
export default SearchParams;
