import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    ShoppingListRouterModule,
    SharedModule
  ],
  // providers: [ 
  //   LoggingService
  // ]
})
export class ShoppingListModule { }
