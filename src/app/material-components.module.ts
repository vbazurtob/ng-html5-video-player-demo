import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatInputModule, MatCardModule } from '@angular/material';
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
      MatCardModule
  ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatInputModule,
      MatCardModule
  ],
})
export class MaterialComponentsModule { }
