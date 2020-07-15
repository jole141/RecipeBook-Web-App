import React, {forwardRef, useImperativeHandle} from "react"
import axios from "axios"
import PopUpAdd from "./PopUpAdd";

function Recipe(props) {

    const modalRef = React.useRef()
    const editRef = React.useRef()

    const recipeData = {
        recipeName: "",
        ingredients:""
    }

    const deleteData = async() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const url = "http://localhost:8080/api/v1/recipe/" + props.recipe.id 
        axios.delete(url)
        modalRef.current.closeModal()
        await delay(50)
        props.update()
    };

    const editData = async() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const url = "http://localhost:8080/api/v1/recipe/" + props.recipe.id

        let data = {
            "name" : recipeData.recipeName,
            "ingredients" : recipeData.ingredients
        }
        closeEditModal()
        axios.put(url, data)
        await delay(50)
        props.update()
    };

    const openModal = () => {
        modalRef.current.openModal()
    };

    const openEditModal = () => {
        closeModal()
        editRef.current.openModal()
    };

    const closeModal = () => {
        modalRef.current.closeModal()
    };

    const closeEditModal = () => {
        editRef.current.closeModal()
    };

    const handleChange = (event) => {
        const {name, value} = event.target
        if (name === "recipeName") recipeData.recipeName = value
        else recipeData.ingredients = value 
    }

    return (
        <div className="recipe">
            <p>{props.recipe.name}</p>
            <button onClick={openModal}><b>!</b></button>
            <PopUpAdd ref={modalRef}>
                    <div className="recipe-edit">
                        <h3>Recipe Info</h3>
                        <form className="info-form">
                            <p> <b>Recipe Name:</b>{props.recipe.name}</p>
                            <p> <b>Ingredients</b>: {props.recipe.ingredients}</p>
                        </form>
                        <div className="pop-buttons-edit">
                            <button className="edit-button" onClick={openEditModal}>Edit</button>
                            <button className="delete-button" onClick={() => deleteData()}>Delete</button>
                        </div>
                    </div>
            </PopUpAdd>
            <PopUpAdd ref={editRef}>
                    <div>
                        <h3>Edit a Recipe - {props.recipe.name}</h3>
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
                            <button onClick={editData}>Edit</button>
                            <button className="cancle-button" onClick={() => editRef.current.closeModal()}>Cancle</button>
                        </div>
                    </div>
                </PopUpAdd>
        </div>
    )
}

export default Recipe