import { NgModule } from '@angular/core';
import { DialogService } from './angular-dialog-service.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [MatDialogModule],
  exports: [DialogService]
})
export class AngularDialogServiceModule { }
