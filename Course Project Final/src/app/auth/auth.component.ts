import { AuthResponse, AuthService } from './auth.service';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs-compat';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    )
    { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        this.error = errorMessage;
        this.showError(errorMessage);
        this.isLoading = false;
      });

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  private showError(message: string){
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const viewContRef = this.alertHost.ViewContainerRef;
    viewContRef.clear();
    
    const compRef = viewContRef.createComponent(alertCompFactory);
    compRef.instance.message = message;    
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      viewContRef.clear();
    });
  };
}
