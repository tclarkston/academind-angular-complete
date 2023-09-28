import { ADD_INGREDIENT, ShoppingListActions } from './../shopping-list/store/shopping-list.actions';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SLA from '../shopping-list/store/shopping-list.actions'
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
    // new Recipe('Beef and Rice'
    //   , 'Beef and rice recipe for easy dinner'
    //   , 'https://upload.wikimedia.org/wikipedia/commons/1/11/Fried_ground_beef_and_pickled_garlic_on_sticky_rice%2C_with_Worcestershire_sauce_and_black_pepper_-_Massachusetts.jpg'
    //   , [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Rice', 4)
    //   ]),
    // new Recipe('Hamburger'
    //   , 'Recipe to make delicious hamburgers.'
    //   , 'https://upload.wikimedia.org/wikipedia/commons/f/f8/The_good_vibes_hamburger_05.jpg'
    //   , [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Bun', 1),
    //     new Ingredient('Cheese', 1),
    //     new Ingredient('Lettuce', 1),
    //     new Ingredient('Tomato', 1),

    //   ])

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(idx: number) {
    const recipe = this.recipes[idx];
    return recipe;
  }

  getRecipes() {
    return this.recipes.slice();
    
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    console.log(ingredients)
    this.store.dispatch(new SLA.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  upodateRecipe(idx: number, newRecipe: Recipe){
    this.recipes[idx] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(idx: number){
    this.recipes.splice(idx, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
