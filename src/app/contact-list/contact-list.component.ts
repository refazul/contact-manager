import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../types';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactService.getListings()
      .subscribe(contacts => this.contacts = contacts);
  }

}
