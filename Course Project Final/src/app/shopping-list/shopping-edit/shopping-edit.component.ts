import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef: ElementRef
  // @ViewChild('amountInput') amountInputRef: ElementRef
  @ViewChild('itemForm') itemForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit() {
    this.editSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIdx > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.itemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });
    // this.editSubscription = this.shoppingListService.startedEdit.subscribe(
    //   (index: number) => {
    //     this.editedItemIdx = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
       
    //   }
    // );
  }

  // Template forms
  onAddItem(form: FormControl) {
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);

    }

    this.onClear();
  }

  onClear(){
    this.itemForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }
}
