import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Node } from '../node.model';
import { NodesListComponent } from './nodes-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NodesListComponent', () => {
  let component: NodesListComponent;
  let fixture: ComponentFixture<NodesListComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NodesListComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.nodes = [
      {
        id: 'abc1',
        name: 'node1'
      },
      {
        id: 'abc2',
        name: 'node2'
      },
      {
        id: 'abc2',
        name: 'node3'
      }
    ] as Node[];

    fixture.detectChanges();
  });

  it('should have correct header', () => {
    expect(element.querySelector('mat-list h3').textContent).toContain('Nodes');
  });

  it('should have a list of nodes', () => {
    expect(element.querySelectorAll('mat-list mat-list-item h4').length).toBe(3);
  });

  it('should have correct name of each node', () => {
    const nodes = element.querySelectorAll('mat-list mat-list-item');

    expect(nodes[0].textContent).toContain('node1');
    expect(nodes[1].textContent).toContain('node2');
    expect(nodes[2].textContent).toContain('node3');
  });

  it('should have correct icon on each node', () => {
    const icons = element.querySelectorAll('mat-list mat-list-item mat-icon');

    expect(icons[0].textContent).toContain('computer');
    expect(icons[1].textContent).toContain('computer');
    expect(icons[2].textContent).toContain('computer');
  });
});
