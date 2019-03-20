import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as appActions from '../../app.actions';
import * as actions from '../tasks.actions';
import { ModuleState } from '../module.state';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {

  form: FormGroup;

  constructor(private store: Store<ModuleState>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public projectId: string) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      uri: [null, [Validators.required]],
      totalSimulatedUsers: [1000, [Validators.required]],
      runTime: [30, [Validators.required]]
    });
  }

  cancel() {
    this.store.dispatch(new appActions.CloseAllModals());
  }

  submit() {
    this.store.dispatch(new actions.CreateTask({...this.form.value, projectId: this.projectId}));
  }
}
