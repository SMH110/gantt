export type ReducerAction<TAction, TPayload = any> = {
  action: TAction;
  payload: TPayload;
};
