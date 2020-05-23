import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { environment as env } from 'src/environments/environment';
import { InstrumentsService } from './instruments.service';
import { LoggerService } from './logger.service';
import { Order } from '../model/order.model';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = env.API + '/orders';
  private side = ['Buy', 'Sell'];

  constructor(private http: HttpClient, private instrumentsService: InstrumentsService,
              private authService: AuthService, private logger: LoggerService, private toastr: ToastrService) { }

  get() {
    return this.http.get<Array<Order>>(this.url);
  }

  createOrder(qty: number) {
    this.instrumentsService.get().subscribe((instruments) => {
      const user: User = this.authService.get();

      for (let i = 1; i <= qty; i++) {
        const sideIndex = this.random(0, 1);
        const instrumentsIndex = this.random(0, instruments.length - 1);
        const quantity = this.random(1000, 20000);
        const price = this.random(1, 1000);

        const orderData = {
            side: this.side[sideIndex],
            symbol: instruments[instrumentsIndex].symbol,
            quantity,
            limitPrice: price,
            traderId: user.id
        };
        this.http.post(this.url, orderData).subscribe((response: any) => {
          this.toastr.success('Order ' + response.id + ' has been successfully placed to server for execution');
        }, (error) => {
          this.toastr.error('Error posting order. please try again');
          this.logger.error(error);
        });
      }
    });
  }

  deleteAll() {
    return this.http.delete(this.url);
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
