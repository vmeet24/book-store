export class BookDetails {
    bookId: number;
    bookName: string;
    authorName: string;
    bookDescription: string;

    constructor(value) {
        this.bookId = value.bookId;
        this.bookName = value.bookName;
        this.authorName = value.authorName;
        this.bookDescription = value.bookDescription;
    }
}
