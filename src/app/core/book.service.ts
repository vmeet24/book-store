import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetails } from './book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = 'http://localhost:57044/api/Books/';
  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<BookDetails[]> {
    return this.http.get<BookDetails[]>(this.baseUrl);
  }

  getBookById(id): Observable<BookDetails> {
    return this.http.get<BookDetails>(this.baseUrl + id);
  }

  addBook(data: BookDetails): Observable<BookDetails> {
    // console.log(data);
    return this.http.post<BookDetails>(this.baseUrl, data);
  }

  deleteBookById(id): Observable<BookDetails> {
    return this.http.delete<BookDetails>(this.baseUrl + id);
  }

  updateBook(data: BookDetails): Observable<BookDetails> {
    return this.http.put<BookDetails>(this.baseUrl + data.bookId, data);
  }
}
