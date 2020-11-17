import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../types';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contact: Contact = { id: '', name: '', address: '', phone: '', photoUrl: '' }
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.contactService.getListingById(id)
      .subscribe(contact => this.contact = contact);
  }

  onSubmit(args): void {
    this.contactService.editListing(args)
      .subscribe(contact => this.contact = contact);
  }
}
