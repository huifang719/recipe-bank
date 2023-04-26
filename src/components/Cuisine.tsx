import { useEffect, useState } from "react";
import { IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonImg } from "@ionic/react"

interface PropState {
  cuisine: string;
}

interface Recipe {
  title: string;
  img: string;
  mealType: string; 
  ingredients: string; 
}

const Cuisine = ({cuisine}:PropState) => {
 
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fetchRecipes = async() => {
    const response= await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${cuisine}&app_id=${import.meta.env.VITE_EDAMAM_APPLICATION_ID}&app_key=${import.meta.env.VITE_EDAMAM_APPLICATION_KEY}&random=true`)
      .then(res => res.json())
    
    if (response.error) return setErrorMessage("Something went wrong with fetching recipes")
 
    const expectRecipes = await response.hits.map((recipe: any, index: number) => {
      const title = recipe.recipe.label
      const img = recipe.recipe.images.THUMBNAIL.url
      const ingredients = recipe.recipe.ingredientLines.join(', ')
      const mealType = recipe.recipe.mealType.join(' ')
      return {title, img, ingredients, mealType}
    })
    await setRecipes(expectRecipes)
  }

  useEffect(() => {
    fetchRecipes()}, [])

  return (
    <>
      <IonToolbar>
        <IonTitle>{cuisine}</IonTitle>
      </IonToolbar>
      <IonList>
        {recipes && recipes.map((recipe, index) => 
        <IonItem key={index}>
          <IonLabel>{recipe.title}</IonLabel>
          <IonImg src={recipe.img}></IonImg>
        </IonItem>

        )}
      </IonList>
      
    </>
  )
}

export default Cuisine;