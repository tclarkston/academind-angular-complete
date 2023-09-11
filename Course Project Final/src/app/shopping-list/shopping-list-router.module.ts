import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const shoppingListRoutes: Routes = [
  { path: '', component: ShoppingListComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingListRoutes)
  ]
})
export class ShoppingListRouterModule { }
