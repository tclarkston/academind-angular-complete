import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRecipeComponent } from './recipes/empty-recipe/empty-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
  { path: "", redirectTo: '/recipes', pathMatch: 'full'},
  { path: "recipes", component: RecipesComponent, children: [
    { path: '', component: EmptyRecipeComponent },
    { path: ':id', component: RecipeDetailComponent },
  ]},
  { path: "shopping-list", component: ShoppingListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

