import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { EmptyRecipeComponent } from './empty-recipe/empty-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const recipeRoutes: Routes = [
  { 
    path: '', 
    component: RecipesComponent, 
    canActivate: [AuthGuard],
    children: [
    { path: '', component: EmptyRecipeComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]  }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }

