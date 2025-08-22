import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-skills-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './skills-projects.html',
  styleUrls: ['./skills-projects.css']
})
export class SkillsProjects implements AfterViewInit {

  @ViewChildren('skillLevel') skillLevels!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('skillPercent') skillPercents!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef<HTMLDivElement>>;

  constructor() {}

  ngAfterViewInit() {

    // ---------------- Animate Skills ----------------
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLDivElement;
          const percentElem = this.skillPercents.find(
            p => p.nativeElement.parentElement?.nextElementSibling?.firstChild === bar
          );
          const targetWidth = bar.getAttribute('data-width');

          if (targetWidth && percentElem) {
            bar.style.width = targetWidth;

            // Animate number from 0 to target %
            let current = 0;
            const targetValue = parseInt(targetWidth);
            const interval = setInterval(() => {
              if (current >= targetValue) clearInterval(interval);
              else current++;
              percentElem.nativeElement.innerText = current + '%';
            }, 15);
          }

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    this.skillLevels.forEach(bar => {
      bar.nativeElement.style.width = '0';
      skillObserver.observe(bar.nativeElement);
    });

    // ---------------- Animate Projects ----------------
    const projectObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    this.projectCards.forEach(card => projectObserver.observe(card.nativeElement));
  }

  // ---------------- Smooth scroll ----------------
  navigateTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
