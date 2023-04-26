import { useEffect, useState } from "react";
import { IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonImg } from "@ionic/react";
import { Link } from "react-router-dom";
import Recipe from "../interface/RecipeData";
import CuisineMeals from "../interface/CuisineMeals";
import { showResult, reset } from '../features/recipeSlice';
import { useDispatch, useSelector } from 'react-redux';

interface PropState {
  cuisine: string;
}

const Cuisine = ({cuisine}:PropState) => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const recipes = useSelector((state: any) => state.recipe.value)
  const recipeShowing = recipes.filter((cuisineMeals: CuisineMeals) => cuisineMeals.cuisine === cuisine)[0]
  const fetchRecipes = async() => {
    dispatch(reset())
    const response= await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${cuisine}&app_id=${import.meta.env.VITE_EDAMAM_APPLICATION_ID}&app_key=${import.meta.env.VITE_EDAMAM_APPLICATION_KEY}&random=true`)
      .then(res => res.json())
    
    if (response.error) return setErrorMessage("Something went wrong with fetching recipes")
    
    const expectRecipes = await response.hits.map((recipe: any, index: number) => {
      const title = recipe.recipe.label
      const img = recipe.recipe.images.THUMBNAIL.url
      const ingredients = recipe.recipe.ingredientLines.join('\n')
      const mealType = recipe.recipe.mealType.join(' ')
      return {title, img, ingredients, mealType}
    })
    await dispatch(showResult({cuisine: cuisine,recipes: expectRecipes}))
  }

  useEffect(() => {
    fetchRecipes()
  }, [])
 
  return (
    <>
      <IonToolbar>
        <IonTitle>{cuisine}</IonTitle>
      </IonToolbar>
      <IonList>
        {recipeShowing && recipeShowing.recipes.map((recipe: Recipe, index:number) => 
        <IonItem key={index}>
          <IonLabel>{recipe.title}</IonLabel>
          <Link to={`recipe/${cuisine}/${index}`}>
            <IonImg src={recipe.img} />
          </Link>
        </IonItem>
        )}
      </IonList>
      
    </>
  )
}

export default Cuisine;