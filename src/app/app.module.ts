import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ],
  providers: [
      StatusBar,
      SplashScreen,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      BarcodeScanner,
      FileTransfer,
      AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
