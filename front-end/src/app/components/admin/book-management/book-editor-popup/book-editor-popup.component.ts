import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from 'angularx-bootstrap-modal';
import { Book } from '../../../../models/book.model';
import { Category } from '../../../../models/category.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/reducers';
import { DropDownData } from '../../../common/dropdown/dropdown.component';
import { getSupplier } from '../../../../store/reducers/index';
import { BookService } from '../../../../services/book.service';

@Component({
    selector: 'book-editor-popup',
    templateUrl: './book-editor-popup.component.html'
})
export class BookEditorPopupComponent extends DialogComponent<any, any> implements OnInit {
    public book: Book;

    private categories: DropDownData[] = [];
    private publishers: DropDownData[] = [];
    private suppliers: DropDownData[] = [];

    @ViewChild('fileInput') private fileInput;

    private urlImg: string;
    private bookCodeExisted: boolean = false;
    private fileToUpload: any;

    private options: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }, 'link']
        ]
    };

    constructor(
        public dialogService: DialogService,
        private store: Store<fromRoot.State>,
        private bookService: BookService) {
        super(dialogService);
    }

    public ngOnInit() {
        this.store.select(fromRoot.getCategory).subscribe((res) => {
            this.categories = [];
            if (res) {
                res.forEach((x) => {
                    if (x.enabled) {
                        this.categories.push(new DropDownData(x.id, x.categoryName));
                    }
                });
            }
        });
        this.store.select(fromRoot.getPublisher).subscribe((res) => {
            this.publishers = [];
            if (res) {
                res.forEach((x) => {
                    if (x.enabled) {
                        this.publishers.push(new DropDownData(x.id, x.name));
                    }
                });
            }
        });
        this.store.select(fromRoot.getSupplier).subscribe((res) => {
            this.suppliers = [];
            if (res) {
                res.forEach((x) => {
                    if (x.enabled) {
                        this.suppliers.push(new DropDownData(x.id, x.name));
                    }
                });
            }
        });
    }

    private bookCodeChange(bookCode: string): void {
        this.bookService.checkBookCodeExists(this.book.bookId, bookCode).subscribe((res) => {
            this.bookCodeExisted = res;
        });
    }

    private selectCategory(data: DropDownData): void {
        this.book.categoryId = data.key;
        this.book.categoryName = data.value;
    }

    private selectSupplier(data: DropDownData): void {
        this.book.supplierId = data.key;
        this.book.supplier = data.value;
    }

    private selectPublisher(data: DropDownData): void {
        this.book.publisherId = data.key;
        this.book.publisher = data.value;
    }

    private onSave(): void {
        this.bookService.saveBook(this.book).subscribe((res) => {
            if (res) {
                this.book.bookId = res.bookId;
                this.result = this.book;
                this.bookService.saveImage(this.fileToUpload).subscribe();
                this.close();
            }
        });
    }

    private onChooseFile(): void {
        $('.fileInput').click();
    }

    private selectedImg(fileInput: any): void {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ((e) => {
                this.urlImg = e.target['result'];
            });
            reader.readAsDataURL(fileInput.target.files[0]);
            // this.fileToUpload = fileInput.files[0];
        }
    }
}
