import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: { ingredients: Ingredient[] };
  private listSub: Subscription;
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(res => {
      this.ingredients = { ingredients: res.ingredients}
      console.log(this.ingredients);
    });
    ;
    
    // this.ingredients = this.shoppingListService.getIngredients();

    // this.listSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (newIngredients: Ingredient[]) =>
    //     this.ingredients = newIngredients
    // );

    // this.loggingService.printLog("Here we are in shopping-list")

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(idx: number){
    this.shoppingListService.startedEdit.next(idx);
  }
}
