import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements AfterViewInit {

  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef<HTMLDivElement>>;

  constructor() {}

  ngAfterViewInit() {
    // IntersectionObserver for fade-in animation
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    this.projectCards.forEach(card => observer.observe(card.nativeElement));
  }
}
