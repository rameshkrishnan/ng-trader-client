import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { OrderService } from '../service/order.service';
import { LoggerService } from '../service/logger.service';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let stubOrderService;
  let stubLoggerService;
  let stubSocket;

  beforeEach(async(() => {
    stubOrderService = {
      createOrder: () => {},
      get: () => {
        return of([]);
      },
      deleteAll: () => {}
    };
    stubLoggerService = {
      log: () => {},
      error: () => {},
      warn: () => {}
    };
    stubSocket = {
      removeAllListeners: () => {},
      fromEvent: () => {
        return of([]);
      }
    };
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ FormsModule, ClarityModule ],
      providers: [
        { provide: OrderService, useValue: stubOrderService },
        { provide: LoggerService, useValue: stubLoggerService },
        { provide: Socket, useValue: stubSocket }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
