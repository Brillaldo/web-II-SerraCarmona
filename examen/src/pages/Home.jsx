import { useEffect, useState } from "react";
import axios from "axios";
import CategoryList from "../components/CategoryList";
import RecipeCard from "../components/RecipeCard";
import "../styles/App.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "asc"
  );

  // Cargar categorías
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategories(res.data.categories));
  }, []);

  // Cargar recetas según categoría
  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
      .then((res) => {
        let sorted = [...res.data.meals];
        sorted.sort((a, b) =>
          sortOrder === "asc"
            ? a.strMeal.localeCompare(b.strMeal)
            : b.strMeal.localeCompare(a.strMeal)
        );
        setMeals(sorted);
      });
  }, [selectedCategory, sortOrder]);

  // Cambiar orden y guardar en localStorage
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    localStorage.setItem("sortOrder", value);
  };

  // Filtrar por búsqueda
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="hero">
        <img src="/chef.png" alt="hero" className="hero-img" />
        
      </header>

      

      <div className="main-content">
        <CategoryList
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div style={{ flex: 1 }}>
  <div className="toolbar">
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes and more..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="sort-by inline">
      <label>
        Sort by:&nbsp;
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </div>
  </div>

  <div className="recipe-grid">
    {filteredMeals.map((meal) => (
      <RecipeCard key={meal.idMeal} meal={meal} />
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default Home;
