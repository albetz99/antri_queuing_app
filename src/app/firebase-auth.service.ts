import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn = false;
  constructor(
      public firebaseAuth: AngularFireAuth,
      private firebaseDB: AngularFireDatabase,
      private router: Router) { }

    getUserState() {
        return this.firebaseAuth.authState;
    }
  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/home']);
        });
  }
  async signUp(name: string , email: string, password: string){

    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(async resSignUp => {
            const path = 'Users/' + resSignUp.user.uid;
            await this.firebaseDB.object(path).set({
                email,
                name,
            });
            await this.sendVerificationEmail();
        });
  }
    sendVerificationEmail(){
        return this.firebaseAuth.currentUser.then(u => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['/login']);
            });
    }
}