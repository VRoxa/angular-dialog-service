import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";
import { AppDialog } from "./app-dialog";

// We define two types to return the TParams and TResult types based on a TDialog.
type ParamsOf<T> = T extends AppDialog<infer TParams, any> ? TParams : never;
type ResultOf<T> = T extends AppDialog<any, infer TResult> ? TResult : never;

type Constructor<T> = new (...args: any[]) => T;
type DialogConfig<T> = MatDialogConfig<ParamsOf<T>>;
type DialogRef<T> = MatDialogRef<T, ResultOf<T>>

@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public get openDialogs(): MatDialogRef<any, any>[] { return this.dialog.openDialogs; }
  public get afterAllClosed(): Observable<void> { return this.dialog.afterAllClosed; }
  public get afterOpened(): Subject<MatDialogRef<any, any>> { return this.dialog.afterOpened; }

  public open = <TDialog extends AppDialog<any, any>>(
    type: Constructor<TDialog>,
    config?: DialogConfig<TDialog>  // infer the TParams type arg
  ): DialogRef<TDialog> => {        // infer the TResult type arg
    // We are inferring our types to the MatDialog open function
    return this.dialog.open(type, config);
  }

  public getDialogById = (id: string): MatDialogRef<any, any> | undefined => {
    return this.dialog.getDialogById(id);
  }
​
  public closeAll = (): void => {
    return this.dialog.closeAll();
  }
}
