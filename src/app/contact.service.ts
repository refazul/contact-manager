import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './types';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}
const httpOptionsWithAuthToken = (token: string = '') => ({
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'AuthToken': token,
	})
});

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	root = 'contacts';
	constructor(
		private http: HttpClient,
		private auth: AngularFireAuth
	) { }

	getListings(): Observable<Contact[]> {
		return new Observable<Contact[]>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
						this.http.get<Contact[]>(`/api/${this.root}`, httpOptionsWithAuthToken(token))
							.subscribe((contacts) => observer.next(contacts));
					}
				});
			});
		});
	}

	getListingById(id: string): Observable<Contact> {
		return new Observable<Contact>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
						this.http.get<Contact>(`/api/${this.root}/${id}`, httpOptionsWithAuthToken(token))
							.subscribe((contact) => observer.next(contact));
					}
				});
			});
		});
	}

	createListing(args): Observable<Contact> {
		return new Observable<Contact>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
						this.http.post<Contact>(`/api/${this.root}`, { ...args }, httpOptionsWithAuthToken(token))
							.subscribe((contact) => observer.next(contact));
					}
				});
			});
		});
	}
	editListing(args): Observable<Contact> {
		const { id, ...others } = args;
		return new Observable<Contact>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
						this.http.post<Contact>(`/api/${this.root}/${id}`, { ...others }, httpOptionsWithAuthToken(token))
							.subscribe((contact) => observer.next(contact));
					}
				});
			});
		});
	}
	deleteListing(id: string): Observable<any> {
		return new Observable<Contact[]>(observer => {
			this.auth.user.subscribe(user => {
				user && user.getIdToken().then(token => {
					if (user && token) {
						this.http.delete<any>(`/api/${this.root}/${id}`, httpOptionsWithAuthToken(token))
							.subscribe(() => observer.next());
					}
				});
			});
		});
	}
}
