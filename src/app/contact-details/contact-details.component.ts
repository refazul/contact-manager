import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../types';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact = { id: '', name: '', address: '', phone: '', photoUrl: '' }
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.contactService.getListingById(id)
      .subscribe(contact => this.contact = contact);
  }

  onDeleteClick(id): void {
    this.contactService.deleteListing(id)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
