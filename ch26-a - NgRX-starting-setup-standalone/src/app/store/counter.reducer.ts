import { createReducer, on } from "@ngrx/store";
// import { CounterActions, DecrementAction, IncrementAction } from "./counter.actions";
import { decrement, increment } from "./counter.actions";

const initialState = 0

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value)
);

// export function counterReducer(state = initialState, action: CounterActions | Action){
//   switch(action.type){
//     case '[Counter] INCREMENT':
//       return state + (action as IncrementAction).payload;
//     case '[Counter] DECREMENT':
//       return state - (action as DecrementAction).payload;
//     default:
//       return state;
//   }
// }