import { Observable } from 'rxjs-compat';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ServersService } from '../servers.service';

interface Server {
  id: number,
  name: string, 
  status: string
}

@Injectable()
export class ServerResolverService implements Resolve<Server> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server{
    return this.serversService.getServer(+route.params['id'])
  }
  constructor(private serversService: ServersService) { }
}
