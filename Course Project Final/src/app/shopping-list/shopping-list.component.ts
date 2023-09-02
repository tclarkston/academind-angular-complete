import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private listSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.listSub = this.shoppingListService.ingredientsChanged.subscribe(
      (newIngredients: Ingredient[]) =>
        this.ingredients = newIngredients
    );
  }

  ngOnDestroy(): void {
    this.listSub.unsubscribe();
  }

  onEditItem(idx: number){
    this.shoppingListService.startedEdit.next(idx);
  }
}
