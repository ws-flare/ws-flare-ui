import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as appActions from '../../app.actions';
import * as actions from '../tasks.actions';
import {ModuleState} from '../module.state';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MonacoFile} from 'ngx-monaco';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent implements OnInit {

  form: FormGroup;

  file: MonacoFile = {
    uri: '',
    language: 'json',
    content: `[]`
  };

  scripts = '[]';

  constructor(private store: Store<ModuleState>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public projectId: string) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      cfApi: ['https://api.run.pivotal.io', [Validators.required]],
      cfUser: [null, [Validators.required]],
      cfPass: [null, [Validators.required]],
      cfOrg: [null, [Validators.required]],
      cfSpace: [null, [Validators.required]],
      cfApps: [null, [Validators.required]],
      successThreshold: [80, Validators.required],
      scripts: [null, [Validators.required]],
    });
  }

  cancel() {
    this.store.dispatch(new appActions.CloseAllModals());
  }

  submit() {
    this.store.dispatch(new actions.CreateTask({...this.form.value, projectId: this.projectId, scripts: this.scripts}));
  }

  onFileChange(file: MonacoFile) {
    this.scripts = file.content;
  }
}
