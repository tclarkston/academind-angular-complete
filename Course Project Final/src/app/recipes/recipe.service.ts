import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1, 'Beef and Rice', 'Beef and rice recipe for easy dinner'
      , 'https://upload.wikimedia.org/wikipedia/commons/1/11/Fried_ground_beef_and_pickled_garlic_on_sticky_rice%2C_with_Worcestershire_sauce_and_black_pepper_-_Massachusetts.jpg'
      , [
        new Ingredient('Meat', 1),
        new Ingredient('Rice', 4)
      ]),
    new Recipe(2, 'Hamburger', 'Recipe to make delicious hamburgers.'
      , 'https://upload.wikimedia.org/wikipedia/commons/f/f8/The_good_vibes_hamburger_05.jpg'
      , [
        new Ingredient('Meat', 1),
        new Ingredient('Bun', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Lettuce', 1),
        new Ingredient('Tomato', 1),

      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (s) => {
        return s.id === id;
      }
    );
    return recipe;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
