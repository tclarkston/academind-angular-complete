import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRecipeComponent } from './recipes/empty-recipe/empty-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes/recipe.resolver';

const appRoutes: Routes = [
  { path: "", redirectTo: '/recipes', pathMatch: 'full'},
  { path: "recipes", component: RecipesComponent, children: [
    { path: '', component: EmptyRecipeComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]  }
  ]},
  { path: "shopping-list", component: ShoppingListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

