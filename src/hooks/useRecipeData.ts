import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import RecipeData from '../interface/RecipeData'

const recipeModify = (res: any): RecipeData [] => {
  const recipeList = res.hits.map((recipe: any, index: number) => {
        const title = recipe.recipe.label
        const img = recipe.recipe.images.THUMBNAIL.url
        const ingredients = recipe.recipe.ingredientLines.join('\n')
        const mealType = recipe.recipe.mealType.join(' ')
        return {title, img, ingredients, mealType}
      })
  return recipeList
}

const useRecipeData = (cuisine: string) => useQuery<RecipeData []>({
  queryKey: ['recipes', cuisine],
  queryFn: () => axios
                  .get<RecipeData []>(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&random=true`,  {
                    headers: {
                      'Accept': 'application/json, text/plain, */*', 
                      'Content-Type': null, 'Access-Control-Allow-Origin': true
                    },
                    params: {
                      'q': cuisine,
                      'app_id': import.meta.env.VITE_EDAMAM_APPLICATION_ID,
                      'app_key': import.meta.env.VITE_EDAMAM_APPLICATION_KEY
                    }
                  })
                  .then(res => res.data)
                  .then(res => recipeModify(res))
  
})

export default useRecipeData