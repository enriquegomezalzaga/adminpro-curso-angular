import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.usuarioService.estaLogueado() && this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }

}
