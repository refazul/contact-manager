import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../types';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() buttonText = '';
  
  @Input() currentName = '';
  @Input() currentAddress = '';
  @Input() currentPhone = '';

  @Output() onSubmit = new EventEmitter<Contact>();

  constructor() { }

  onButtonClicked(): void {
    this.onSubmit.emit({
      id: '',
      name: this.currentName,
      address: this.currentAddress,
      phone: this.currentPhone,
      photoUrl: ''
    });
  }
}
