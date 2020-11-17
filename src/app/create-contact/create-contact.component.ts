import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../types';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(contact: Contact): void {
    this.contactService.createListing(contact)
      .subscribe((contact) => {
        this.router.navigateByUrl('/contacts/' + contact.id);
      });
  }

}
