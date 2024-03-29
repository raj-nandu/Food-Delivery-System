import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';

import { PusherService } from './pusher.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PublicComponent } from './public/public.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ResturantloginComponent } from './resturantlogin/resturantlogin.component';
import { RestaurantregComponent } from './restaurantreg/restaurantreg.component';
import { FormsModule } from '@angular/forms';
import { RestaurantViewComponent } from './restaurant-view/restaurant-view.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { RestaurantdetailsComponent } from './restaurantdetails/restaurantdetails.component';
import { RestaurantmenuComponent } from './restaurantmenu/restaurantmenu.component';
import { RestaurantstatsComponent } from './restaurantstats/restaurantstats.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RestaurantviewdetailsComponent } from './restaurantviewdetails/restaurantviewdetails.component';
import { RestaurantviewmenuComponent } from './restaurantviewmenu/restaurantviewmenu.component';
import { RestaurantcurrentordersComponent } from './restaurantcurrentorders/restaurantcurrentorders.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { VerifyComponent } from './verify/verify.component';
import { RecoverComponent } from './recover/recover.component';
import { RestaurantdropdownComponent } from './restaurantdropdown/restaurantdropdown.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { CustomereditprofileComponent } from './customereditprofile/customereditprofile.component';
import { DeliveryloginComponent } from './deliverylogin/deliverylogin.component';
import { DeliveryregComponent } from './deliveryreg/deliveryreg.component';
import { LogindropdownComponent } from './logindropdown/logindropdown.component';
import { RestaurantvieworderComponent } from './restaurantvieworder/restaurantvieworder.component';
import { CustomerdropdownComponent } from './customerdropdown/customerdropdown.component';
import { ChatfeatureComponent } from './chatfeature/chatfeature.component';
import { DeliverydropdownComponent } from './deliverydropdown/deliverydropdown.component';
import { DeliveryorderhistoryComponent } from './deliveryorderhistory/deliveryorderhistory.component';
import { DeliverycurrentordersComponent } from './deliverycurrentorders/deliverycurrentorders.component';
import { DeliveryprofileComponent } from './deliveryprofile/deliveryprofile.component';
import { DisplayMenuComponent } from './display-menu/display-menu.component';
import { OrderComponent } from './order/order.component';
import { DeliveryeditprofileComponent } from './deliveryeditprofile/deliveryeditprofile.component';
import {AgmCoreModule, AgmGeocoder} from "@agm/core";
import { CustomerCurrentOrdersComponent } from './customer-current-orders/customer-current-orders.component';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { CustomerRecommendationsComponent } from './customer-recommendations/customer-recommendations.component';
import { DeliverychatfeatureComponent } from './deliverychatfeature/deliverychatfeature.component';
import { PrivatechatComponent } from './privatechat/privatechat.component';
import { DeliveryprivatechatComponent } from './deliveryprivatechat/deliveryprivatechat.component';
import {AgmDirectionModule} from "agm-direction";

export function socialConfigs(){
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('972152010788-6umkrsi25km4g7lge6u8alqgr5719a74.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('2606643606225907')
    }
  ]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PublicComponent,
    RegistrationComponent,
    ResturantloginComponent,
    RestaurantregComponent,
    RestaurantViewComponent,
    OrderhistoryComponent,
    RestaurantdetailsComponent,
    RestaurantmenuComponent,
    RestaurantstatsComponent,
    SidebarComponent,
    RestaurantviewdetailsComponent,
    RestaurantviewmenuComponent,
    RestaurantcurrentordersComponent,
    CustomerdashboardComponent,
    VerifyComponent,
    RecoverComponent,
    RestaurantdropdownComponent,
    CustomerprofileComponent,
    CustomereditprofileComponent,
    DeliveryloginComponent,
    DeliveryregComponent,
    LogindropdownComponent,
    RestaurantvieworderComponent,
    CustomerdropdownComponent,
    ChatfeatureComponent,
    DeliverydropdownComponent,
    DeliveryorderhistoryComponent,
    DeliverycurrentordersComponent,
    DeliveryprofileComponent,
    DisplayMenuComponent,
    OrderComponent,
    DeliveryeditprofileComponent,
    CustomerCurrentOrdersComponent,
    CustomerOrderHistoryComponent,
    CustomerRecommendationsComponent,
    DeliverychatfeatureComponent,
    PrivatechatComponent,
    DeliveryprivatechatComponent  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMlEdoVdUq5SvrCUCJYQeA9vzOypKhJDY'
    }),
    AgmDirectionModule,

    RouterModule.forRoot([
      {
        path: "orderaddress/:restaurant_id/:customer_id",
        component: OrderComponent
      },
      {
        path: "customerorderhistory",
        component: CustomerOrderHistoryComponent
      },
      {
        path: "customerrecommendations",
        component: CustomerRecommendationsComponent
      },
      {
        path: "customercurrentorders",
        component: CustomerCurrentOrdersComponent
      },
      {
        path: '',
        component: PublicComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'public',
        component: PublicComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'resturantlogin',
        component: ResturantloginComponent
      },
      {
        path: 'restaurantreg',
        component: RestaurantregComponent
      },
      {
        path: 'restaurant-view',
        component: RestaurantViewComponent
      },
      {
        path: 'orderhistory',
        component: OrderhistoryComponent
      },
      {
        path: 'restaurantdetails',
        component: RestaurantdetailsComponent
      },
      {
        path: 'restaurantmenu',
        component: RestaurantmenuComponent
      },
      {
        path: 'restaurantstats',
        component: RestaurantstatsComponent
      },
      {
        path: 'restaurantviewdetails',
        component: RestaurantviewdetailsComponent
      },
      {
        path: 'restaurantviewmenu',
        component: RestaurantviewmenuComponent
      },
      {
        path: 'restaurantcurrentorders',
        component: RestaurantcurrentordersComponent
      },
      {
        path: 'customerdashboard',
        component: CustomerdashboardComponent
      },
      {
        path: 'verify',
        component: VerifyComponent
      },
      {
        path: 'recover',
        component: RecoverComponent
      },
      {
        path: 'customerprofile',
        component: CustomerprofileComponent
      },
      {
        path: 'customereditprofile',
        component: CustomereditprofileComponent
      },
      {
        path: 'deliverylogin',
        component: DeliveryloginComponent
      },
      {
        path: 'deliveryreg',
        component: DeliveryregComponent
      },
      {
        path: 'deliveryorderhistory',
        component: DeliveryorderhistoryComponent
      },
      {
        path: 'deliverycurrentorders',
        component: DeliverycurrentordersComponent
      },
      {
        path: 'deliveryprofile',
        component: DeliveryprofileComponent
      },
      {
        path: 'chatfeature',
        component: ChatfeatureComponent
      },
      {
        path: 'deliverychatfeature',
        component: DeliverychatfeatureComponent
      },
      {
        path: 'displaymenu/:restaurant_id',
        component: DisplayMenuComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'deliveryeditprofile',
        component: DeliveryeditprofileComponent
      },
      {
        path: 'privatechat/:order_id',
        component: PrivatechatComponent
      },
      {
        path: "deliveryprivatechat/:order_id",
        component: DeliveryprivatechatComponent
      }
    ])
  ],
  providers: [
    CookieService,
    PusherService,
    AuthService,{
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
