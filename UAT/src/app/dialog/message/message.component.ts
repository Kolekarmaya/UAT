// Copyright (C) 2019-2020 NSEIT Limited, Mumbai. All rights reserved.
//
// This program and the accompanying materials are made available
// under the terms described in the LICENSE file which accompanies
// this distribution. If the LICENSE file was not attached to this
// distribution or for further clarifications, please contact
// legal@nseit.com.
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  template: '<div></div>'
})
export class MessageDialogComponent {
  constructor(public dialog: MatDialog) {
  }

  openDialog(message: string) {
    this.dialog.open(MessageDialog, {
      data: {
        message
      }
    });
  }
}


@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
})
export class MessageDialog {
  constructor(public dialogRef: MatDialogRef<MessageDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }
}
