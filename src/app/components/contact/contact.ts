import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
   selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: true,            
   imports: [CommonModule]      
})
export class Contact {
  successMessage: string = '';
  errorMessage: string = '';

  sendEmail(e: Event) {
    e.preventDefault();

    emailjs.sendForm(
      'service_wcfit0b',    // Your EmailJS Service ID
      'template_4xkl2v7',   // Your EmailJS Template ID
      e.target as HTMLFormElement
    ).then(
      (result) => {
        this.successMessage = 'Message sent successfully! 🎉';
        this.errorMessage = '';
        (e.target as HTMLFormElement).reset();
        // Hide message after 5 seconds
        setTimeout(() => this.successMessage = '', 5000);
      },
      (error) => {
        this.errorMessage = 'Failed to send message. Please try again.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    );
  }
}
