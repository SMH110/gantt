export type ReducerAction<TAction, TPayload = any> = {
  type: TAction;
  payload: TPayload;
};
