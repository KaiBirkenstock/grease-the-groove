import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {Tab2PageModule} from '../tab2/tab2.module';
import {Tab3PageModule} from '../tab3/tab3.module';
import {HomePageModule} from '../home/home.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    Tab2PageModule,
    Tab3PageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
