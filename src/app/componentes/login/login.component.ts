import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Servicios/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email:string | null = null;
  password: string | null = null;
  mensaje: string | null = null;

  constructor(private router:Router,
    private loginService: LoginService
  ){}

  ngOnInit(){
    this.loginService.getAuthState().subscribe(usuario =>{
      if(usuario){
        this.router.navigate(['/'])
      }
    })
  }

  login() {
    if(this.email && this.password){
      this.loginService.login(this.email,this.password)
      .then(()=>{
        this.router.navigate(['/']);
      })
      .catch(error =>{
        this.mensaje = 'Erro al hacer login:' + error;
      });
    }else{
      this.mensaje = 'Por favor, ingresa un email y password validos'
    }
  }



}
