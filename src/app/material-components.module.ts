import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatInputModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatInputModule,
      MatCardModule,
      MatProgressSpinnerModule
  ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatInputModule,
      MatCardModule,
      MatProgressSpinnerModule
  ],
})
export class MaterialComponentsModule { }
