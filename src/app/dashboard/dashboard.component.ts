import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { OrderService } from '../service/order.service';
import { LoggerService } from '../service/logger.service';
import { OrderPlaced } from '../model/order-placed.model';
import { OrderExecuted } from '../model/order-executed.model';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  showTradeModal = false;
  orders: Array<Order> = [];
  qty = 1;

  constructor(private orderService: OrderService, private logger: LoggerService,
              private socket: Socket) { }

  ngOnInit(): void {
    this.getOrders();
    this.setEvents();
  }

  getOrders() {
    this.orderService.get().subscribe((items) => {
      this.orders = items;
    });
  }

  submitTrade() {
    this.orderService.createOrder(this.qty);
    this.showTradeModal = false;
  }

  refresh() {
    this.getOrders();
  }

  deleteAll() {
    this.orderService.deleteAll().subscribe(() => {
      this.logger.log('All orders deleted');
    });
  }

  private setEvents() {
    this.socket.fromEvent('allOrdersDeletedEvent').subscribe(() => {
      this.orders = [];
    });
    this.socket.fromEvent('orderCreatedEvent').subscribe((data) => {
      this.orders.push(data as Order);
    });
    this.socket.fromEvent('executionCreatedEvent').subscribe((data) => {
      const odata = data as OrderExecuted;
      const item = this.orders.find(oitem => oitem.id === odata.orderId);
      item.quantityExecuted += odata.quantityExecuted;
      item.limitPrice = odata.executionPrice;
      item.status = odata.status;
    });
    this.socket.fromEvent('placementCreatedEvent').subscribe((data) => {
      const odata = data as OrderPlaced;
      const item = this.orders.find(oitem => oitem.id === odata.orderId);
      item.quantityPlaced += odata.quantityPlaced;
      item.status = odata.status;
    });
  }

  ngOnDestroy() {
    this.socket.removeAllListeners();
  }

}
