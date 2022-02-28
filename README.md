# Angular Dialog Service

The `DialogService` pretends to override the base `MatDialog` service offering a safe type system.

Make your dialog component extend the `AppDialog` class specifying the input data and output data types.
```typescript

interface DialogInputData = { one: number, two: number };
interface DialogOutputData = { result: number };

export class MyDialog extends AppDialog<DialogInputData, DialogOutputData> {

  constructor(
    ref: MatDialogRef<MyDialog>,
    @Inject(MAT_DIALOG_DATA) data: Readonly<DialogInputData>
  ) {
    super(ref, data);
  }

  public close = () => {
    const output: DialogOutputData = ...;
    this.ref.close(output);
  }
}
```

Inject the `DialogService` into your components to make use of your `AppDialog` with a proper type security system.
```typescript
@Component({...})
export class MyComponent {

  constructor(private dialog: DialogService) { }

  openDialog = () => {
    const ref = this.dialog.open(MyDialog, {
      data: { one: 1, two: 2 }
    });

    ref.afterClosed().subscribe(result => {
      // result of type DialogOutputData
    });
  }
}
```

> Declare your dialog component without input or output data specifying the corresponding type argument as `never`.
> ```typescript
> // No input data expected
> export class MyDialog extends AppDialog<never, DialogOutputData>  {...}
> 
> // No output data expected
> export class MyDialog extends AppDialog<DialogInputData, never>  {...}
> ```
