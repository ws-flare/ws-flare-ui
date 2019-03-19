import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModuleState } from '../module.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as appActions from '../../app.actions';
import * as actions from '../projects.actions';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {

  form: FormGroup;

  constructor(private store: Store<ModuleState>, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  cancel() {
    this.store.dispatch(new appActions.CloseAllModals());
  }

  submit() {
    this.store.dispatch(new actions.CreateProject(this.form.value.name));
  }

}
