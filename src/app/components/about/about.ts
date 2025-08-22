import { Component } from '@angular/core';
import { Contact } from '../contact/contact';
import { Projects } from '../projects/projects';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {


  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
