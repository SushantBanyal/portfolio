import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements AfterViewInit {

  @ViewChildren('skillLevel') skillLevels!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('skillPercent') skillPercents!: QueryList<ElementRef<HTMLSpanElement>>;

  constructor() {}

  ngAfterViewInit() {
    // Intersection observer for skill bars
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLDivElement;
          const targetWidth = bar.getAttribute('data-width');
          
          // Find corresponding percentage element
          const percentElem = this.skillPercents.find(p => 
            p.nativeElement.parentElement?.nextElementSibling?.firstElementChild === bar
          );

          if (targetWidth && percentElem) {
            bar.style.width = '0'; // Start from 0
            let current = 0;
            const targetValue = parseInt(targetWidth);
            
            const interval = setInterval(() => {
              if (current >= targetValue) clearInterval(interval);
              else current++;
              percentElem.nativeElement.innerText = current + '%';
            }, 15);

            // Animate width
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 50);
          }

          observer.unobserve(bar); // stop observing
        }
      });
    }, { threshold: 0.5 });

    // Initialize all bars with width 0 and observe
    this.skillLevels.forEach(bar => {
      bar.nativeElement.style.width = '0';
      barObserver.observe(bar.nativeElement);
    });
  }

  navigateTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
