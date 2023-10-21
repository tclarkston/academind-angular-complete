import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: { ingredients: Ingredient[] };
  private listSub: Subscription;
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      this.ingredients = { ingredients: stateData.ingredients}
    });
    ;
    
    // this.ingredients = this.shoppingListService.getIngredients();

    // this.listSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (newIngredients: Ingredient[]) =>
    //     this.ingredients = newIngredients
    // );

    // this.loggingService.printLog("Here we are in shopping-list")
  }

  onEditItem(idx: number){
    // this.shoppingListService.startedEdit.next(idx);
    this.store.dispatch(new ShoppingListActions.StartEdit(idx));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
