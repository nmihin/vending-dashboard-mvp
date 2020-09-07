import { BrowserModule } from '@angular/platform-browser';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipesModule } from 'pipes-module';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ChunksPipe } from './pipes/load-chunks.pipe';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor  } from './helpers';
//import { fakeBackendProvider } from './helpers/fake-backend';

import { appRoutes } from './routes';

// MATERIAL MODULES
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//CHARTS
import { NgxChartsModule } from '@swimlane/ngx-charts';

// NOTIFICATION
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

//MAPBOX
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

//SPLIT SCREEN
import { AngularSplitModule } from 'angular-split';

// LAYOUT
import { SectionHomeComponent } from './sections/section-home/section-home.component';
import { SectionAreasComponent } from './sections/section-areas/section-areas.component';
import { SectionLoginComponent } from './sections/section-login/section-login.component';
import { RangesFooter } from './sections/section-home/ranges-footer/ranges-footer.component';

// API MODULE
import { ApiModule } from './api/api.module';
import { HttpModule } from '@angular/http';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionProductsComponent } from './sections/section-products/section-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionHomeComponent,
    SectionAreasComponent,
    SectionHomeComponent,
    SectionLoginComponent,
    RangesFooter,
    OrderByPipe,
    ChunksPipe,
    SectionSalesComponent,
    SectionProductsComponent
  ],
  imports: [
    // tslint:disable-next-line: deprecation
    HttpModule,
    SatDatepickerModule,
    SatNativeDateModule,
    BrowserModule,
    NotifierModule.withConfig(customNotifierOptions),
    RouterModule.forRoot(appRoutes),
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    PipesModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibGltYm83NzciLCJhIjoiY2pqZ3Q4b2I0MG1keDN2bGcxMnZkeHpwYyJ9.xzM2vWikDaCZyqP_yt7VVg',
      geocoderAccessToken: 'TOKEN'
    }),
    ApiModule
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [RangesFooter],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
})
export class AppModule { }
