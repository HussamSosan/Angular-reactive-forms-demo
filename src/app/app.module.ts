import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { StoregroupComponent } from "./storegroup.component";
import { StoreComponent } from "./store.component";

import { StoreGroupService } from "./storegroup.service";

import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "storegroup",
        component: StoregroupComponent
      },
      {
        path: "store",
        component: StoreComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    StoregroupComponent,
    StoreComponent
  ],
  providers: [StoreGroupService],
  bootstrap: [AppComponent]
})
export class AppModule {}
