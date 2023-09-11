import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService
    ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const url = 'https://ng-course-recipe-ddaca-default-rtdb.firebaseio.com/recipes.json';
    
    this.http.put(url, recipes)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  fetchRecipes() {
    const url = 'https://ng-course-recipe-ddaca-default-rtdb.firebaseio.com/recipes.json';
    
    return this.http.get<Recipe[]>(
      url
    ).pipe(
      map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
      })
    );
  }
}
