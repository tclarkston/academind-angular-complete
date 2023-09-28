import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

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
  editedItemIdx: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEdit.subscribe(
      (index: number) => {
        this.editedItemIdx = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.itemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  // Template forms
  onAddItem(form: FormControl) {
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      
      this.shoppingListService.updateIngredient(this.editedItemIdx, newIngredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);

    }

    this.onClear();
  }

  onClear(){
    this.itemForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIdx);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
