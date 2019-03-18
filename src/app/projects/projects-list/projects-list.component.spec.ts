import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListComponent } from './projects-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectsListComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.projects = [
      {
        id: 'abc1',
        name: 'project1'
      },
      {
        id: 'abc2',
        name: 'project2'
      },
      {
        id: 'abc3',
        name: 'project3'
      }
    ];

    fixture.detectChanges();
  });

  it('should have a list of projects', () => {
    expect(element.querySelectorAll('mat-list mat-list-item').length).toBe(3);
  });

  it('should have correct name for each project', () => {
    const projects = element.querySelectorAll('mat-list mat-list-item');

    expect(projects[0].textContent).toContain('project1');
    expect(projects[1].textContent).toContain('project2');
    expect(projects[2].textContent).toContain('project3');
  });
});
