import React from 'react'
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import CuisineMeals from "../interface/CuisineMeals";
import RecipeData from '../interface/RecipeData';
import { IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';

interface ParamsState {
  cuisine: string;
  index:string;
}
const Recipe: React.FC = () => {
  const {cuisine, index} = useParams() as ParamsState
  const recipes = useSelector((state: any) => state.recipe.value)
  const recipe:RecipeData = recipes.filter((cuisineMeals: CuisineMeals) => cuisineMeals.cuisine === cuisine)[0].recipes[index]

  return (
    <div>
      <IonToolbar>
        <IonTitle className="ion-text-center" >{recipe.title}</IonTitle>
      </IonToolbar>
      <IonGrid>
        <IonRow>
          <IonCol size='6'>
            <IonImg src={recipe.img} />
          </IonCol>
          <IonCol>
            <IonRow>
              {recipe.ingredients}
            </IonRow>
            <IonRow>
              Type: {recipe.mealType}
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}

export default Recipe;