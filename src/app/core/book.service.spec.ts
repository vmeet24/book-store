import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetails } from './book.model';

let httpClient: HttpClient;

let baseUrl = "http://localhost:57044/api/Books/";
describe('BookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [BookService]
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'post').and.callThrough();
    spyOn(httpClient, 'put').and.callThrough();
    spyOn(httpClient, 'get').and.callThrough();
    spyOn(httpClient, 'delete').and.callThrough();
  });


  it('should be created', () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });


  /******TEST GET BOOKS*****/

  it('Should be getting Books', () => {
    let x: Observable<BookDetails[]>
    const getter: BookService = TestBed.get(BookService)
    expect(getter.getBooks()).toBeTruthy(x)
  })


  /******TEST POST BOOKS*****/

  it('Should be Adding Books', () => {
    const service: BookService = TestBed.get(BookService);
    const book: BookDetails = {
      bookId: 1,
      bookName: "defName",
      authorName: "defPrice",
      bookDescription: "niceasda"
    }
    service.addBook(book)
    expect(httpClient.post).toHaveBeenCalledWith(baseUrl, book)
  })

  /******TEST POST BOOKS*****/

  it('Should be Deleting Books', () => {
    const service: BookService = TestBed.get(BookService);
    const bookId = 1;
    service.deleteBookById(bookId)
    expect(httpClient.delete).toHaveBeenCalledWith(baseUrl + bookId)
  })

  /******TEST UPDATE BOOKS*****/
  it('Should be Updating   Books', () => {
    const service: BookService = TestBed.get(BookService);
    const book: BookDetails = {
      bookId: 1,
      bookName: "defName",
      authorName: "defPrice",
      bookDescription: "nicea"
    }
    service.updateBook(book)
    expect(httpClient.put).toHaveBeenCalledWith(baseUrl + book.bookId, book)
  })
});