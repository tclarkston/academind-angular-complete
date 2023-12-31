import { createAction, props } from "@ngrx/store";

enum counterActions {
  INCREMENT = '[Counter] INCREMENT',
  DECREMENT = '[Counter] DECREMENT',
  INIT = '[Counter] INIT',
  SET = '[Counter] SET'
};

export const increment = createAction(
  counterActions.INCREMENT,
  props<{value: number}>()
);

export const decrement = createAction(
  counterActions.DECREMENT,
  props<{value: number}>()
);

export const init = createAction(
  counterActions.INIT
);

export const set = createAction(
  counterActions.SET,
  props<{value: number}>()
);

// export class IncrementAction implements Action {
//   readonly type = counterActions.INCREMENT;

//   constructor(public payload: number) {
//   }
// }

// export class DecrementAction implements Action {
//   readonly type = counterActions.DECREMENT;

//   constructor(public payload: number) {
//   }
// }
