import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-khazna-table-package',
  imports: [ButtonModule],
  templateUrl: './khazna-table-package.component.html',
  styleUrl: './khazna-table-package.component.css',
  standalone: true,
})
export class KhaznaTablePackageComponent {


  onClick() {
    console.log('Button clicked!');
  }
}
