import { useEffect, useState } from "react";
import { IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonImg } from "@ionic/react";
import { Link } from "react-router-dom";
import Recipe from "../interface/RecipeData";
import CuisineMeals from "../interface/CuisineMeals";
import useRecipeData from "../hooks/useRecipeData";

interface PropState {
  cuisine: string;
}

const Cuisine = ({cuisine}:PropState) => {
  const {data: recipes, isLoading, error} = useRecipeData(cuisine)
 
  return (
    <>
      <IonToolbar>
        <IonTitle>{cuisine}</IonTitle>
      </IonToolbar>
      <IonList>
        {recipes && recipes.map((recipe: Recipe, index:number) => 
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