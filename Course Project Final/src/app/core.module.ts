import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  providers: [
    ShoppingListService, 
    RecipeService,
    DataStorageService
  ]
})
export class CoreModule { }
