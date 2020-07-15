import React from "react"
import Recipe from "./Recipe"
import PopUpAdd from "./PopUpAdd"
import axios from "axios"

class Book extends React.Component{
    constructor()  {
        super()
        this.modalRef = React.createRef()
        this.recipeData = {
            recipeName: "",
            ingredients:""
        }
        this.state = {
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/recipe')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json
                })
        })
    }

    update = () => {
        fetch('http://localhost:8080/api/v1/recipe')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json
                })
        })
        this.render()
    }

    openModal = () => {
        this.modalRef.current.openModal()
    };

    handleChange = (event) => {
        const {name, value} = event.target
        if (name === "recipeName") this.recipeData.recipeName = value
        else this.recipeData.ingredients = value 
    }

    postData = async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        let data = {
            "name" : this.recipeData.recipeName,
            "ingredients" : this.recipeData.ingredients
        }
        axios.post('http://localhost:8080/api/v1/recipe', data)
        this.modalRef.current.closeModal()
        await delay(50)
        this.update()
    }


    render() {
        const posts = this.state.data.map(recipe => <Recipe key="recipe.id" recipe={recipe} update={this.update}/>)

        return (
            <div>
                <div className="book">
                    {posts}
                    <button className="add-button" onClick={this.openModal}>Add</button>
                </div>  
                <PopUpAdd ref={this.modalRef}>
                    <div>
                        <h3>Add a Recipe</h3>
                        <form>
                            <p>Recipe Name</p>
                            <input 
                                type="text"
                                name="recipeName"
                                onChange={this.handleChange}
                                placeholder="Recipe Name"
                            />
                            <p>Ingredients</p>
                            <input 
                                type="text"
                                name="ingredients"
                                onChange={this.handleChange}
                                placeholder="Enter Ingredients"
                            />
                        </form>
                        <div className="pop-buttons">
                            <button onClick={() => this.postData()}>Add</button>
                            <button className="cancle-button" onClick={() => this.modalRef.current.closeModal()}>Cancle</button>
                        </div>
                    </div>
                </PopUpAdd>
            </div>
        )
    }
}

export default Book