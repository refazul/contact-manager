import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './types';

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
		private http: HttpClient
	) { }

	getListings(): Observable<Contact[]> {
		return this.http.get<Contact[]>(`/api/${this.root}`);
	}

	getListingById(id: string): Observable<Contact> {
		return this.http.get<Contact>(`/api/${this.root}/${id}`);
	}

	deleteListing(id: string): Observable<any> {
		return new Observable<Contact[]>(observer => {
			//this.auth.user.subscribe(user => {
			//	user && user.getIdToken().then(token => {
			//		if (user && token) {
			this.http.delete<any>(`/api/${this.root}/${id}`, httpOptionsWithAuthToken())
				.subscribe(() => observer.next());
			//		}
			//	});
			//});
		});
	}

	createListing(name: string, description: string, price: number): Observable<Contact> {
		return new Observable<Contact>(observer => {
			//this.auth.user.subscribe(user => {
			//	user && user.getIdToken().then(token => {
			//		if (user && token) {
			this.http.post<Contact>(`/api/${this.root}`, { name, description, price }, httpOptionsWithAuthToken())
				.subscribe(() => observer.next());
			//		}
			//	});
			//});
		});
	}
	editListing(id: string, name: string, description: string, price: number): Observable<Contact> {
		return new Observable<Contact>(observer => {
			//this.auth.user.subscribe(user => {
			//	user && user.getIdToken().then(token => {
			//		if (user && token) {
			this.http.post<Contact>(`/api/${this.root}/${id}`, { name, description, price }, httpOptionsWithAuthToken())
				.subscribe(() => observer.next());
			//		}
			//	});
			//});
		});
	}
}
