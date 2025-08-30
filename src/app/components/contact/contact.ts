import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class Contact {
  successMessage: string = '';
  errorMessage: string = '';
  isSending: boolean = false;

  sendEmail(e: Event) {
    e.preventDefault();
    this.isSending = true;

    emailjs.sendForm(
      'service_wcfit0b',    // ✅ Your EmailJS Service ID
      'template_4xkl2v7',   // ✅ Your EmailJS Template ID
      e.target as HTMLFormElement,
      'aN6wMrKdKR4lAtXB8'   // ✅ Your EmailJS Public Key
    ).then(
      () => {
        this.successMessage = '✅ Message sent successfully!';
        this.errorMessage = '';
        this.isSending = false;

        // reset form
        (e.target as HTMLFormElement).reset();

        // auto-hide success message after 5s
        setTimeout(() => this.successMessage = '', 5000);
      },
      (error) => {
        console.error('EmailJS error:', error);
        this.errorMessage = '❌ Failed to send message. Please try again.';
        this.successMessage = '';
        this.isSending = false;

        // auto-hide error message after 5s
        setTimeout(() => this.errorMessage = '', 5000);
      }
    );
  }
}
