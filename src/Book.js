import React, { useState, useEffect, useRef } from "react";
import Recipe from "./Recipe";
import PopUpAdd from "./PopUpAdd";
import axios from "axios";

const Book = () => {
  const modalRef = useRef();
  const [recipeDataName, setRecipeDataName] = useState("");
  const [recipeDataIngerdients, setRecipeDataIngredients] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);

  const update = () => {
    fetch("http://localhost:8080/api/v1/recipe")
      .then((res) => res.json())
      .then((json) => {
        setAllRecipes(json);
      });
  };

  const openModal = () => {
    modalRef.current.openModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "recipeName") setRecipeDataName(value);
    else setRecipeDataIngredients(value);
  };

  const postData = async () => {
    const data = {
      name: recipeDataName,
      ingredients: recipeDataIngerdients,
    };
    await axios.post("http://localhost:8080/api/v1/recipe", data);
    modalRef.current.closeModal();
    update();
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div>
      <div className="book">
        {allRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} update={update} />
        ))}
        <button className="add-button" onClick={openModal}>
          Add
        </button>
      </div>
      <PopUpAdd ref={modalRef}>
        <div>
          <h3>Add a Recipe</h3>
          <form>
            <p>Recipe Name</p>
            <input
              type="text"
              name="recipeName"
              onChange={handleChange}
              placeholder="Recipe Name"
            />
            <p>Ingredients</p>
            <input
              type="text"
              name="ingredients"
              onChange={handleChange}
              placeholder="Enter Ingredients"
            />
          </form>
          <div className="pop-buttons">
            <button onClick={() => postData()}>Add</button>
            <button
              className="cancle-button"
              onClick={() => modalRef.current.closeModal()}
            >
              Cancle
            </button>
          </div>
        </div>
      </PopUpAdd>
    </div>
  );
};

export default Book;
