import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Recipe.css"; // Asegúrate de tenerlo o separarlo si deseas

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => setMeal(res.data.meals[0]));
  }, [id]);

  if (!meal) return <p className="loading">Cargando receta...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="recipe-detail-container">
      <h1 className="detail-title">{meal.strMeal}</h1>
      <img className="detail-image" src={meal.strMealThumb} alt={meal.strMeal} />

      <div className="detail-meta">
        <p><strong>Categoría:</strong> {meal.strCategory}</p>
        <p><strong>Origen:</strong> {meal.strArea}</p>
        <p>
          <strong>YouTube:</strong>{" "}
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Ver Video
          </a>
        </p>
        {meal.strSource && (
          <p>
            <strong>Fuente:</strong>{" "}
            <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
              Ver Página
            </a>
          </p>
        )}
      </div>

      <div className="detail-section">
        <h3>Instrucciones</h3>
        <p>{meal.strInstructions}</p>
      </div>

      <div className="detail-section">
        <h3>Ingredientes</h3>
        <ul className="ingredients-list">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetail;
