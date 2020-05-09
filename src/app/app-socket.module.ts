import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment as env } from 'src/environments/environment';

const config: SocketIoConfig = { url: env.API, options: {} };

@NgModule({
  declarations: [],
  imports: [
    SocketIoModule.forRoot(config)
  ]
})
export class AppSocketModule { }
