import { createContext, useState, useEffect, Children, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    useEffect(() => {
      const fetchCities = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/cities`);
          const data = await response.json();
          setCities(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCities();
    }, []);

    async function getCity(id) {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        setCurrentCity(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          currentCity,
          getCity,
        }}
      >
        {children}
      </CitiesContext.Provider>
    );

}

function useCities(){
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("context is being used outside of provider");
    return context;
}

export {CitiesProvider, useCities};