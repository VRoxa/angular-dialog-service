import { MatDialogRef } from "@angular/material/dialog";

type DialogRef<TParams, TResult> = MatDialogRef<AppDialog<TParams, TResult>, TResult>;
​
export class AppDialog<TParams, TResult> {
  constructor(
    protected ref: DialogRef<TParams, TResult>, 
    protected data?: TParams
  ) { }
}