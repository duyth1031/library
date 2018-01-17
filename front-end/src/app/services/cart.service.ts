import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config, PathController } from '../config';
import { map, tap, catchError } from 'rxjs/operators';
import { BookInCart } from '../models/book.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';
import * as bookAction from '../store/actions/book.action';
import { LsHelper } from '../shareds/helpers/ls.helper';
import * as moment from 'moment';

@Injectable()
export class CartService {
    private apiURL: string = Config.getPath(PathController.Cart);

    constructor(
        private http: HttpClient,
        private store: Store<fromRoot.State>) {
    }

    public getBookInCart(): Observable<BookInCart[]> {
        return this.store.select(fromRoot.getCurrentUser).first().mergeMap((user) => {
            return this.http.get(this.apiURL + '/ReturnBookInCart').pipe(
                tap(
                    (res: BookInCart[]) => {
                        this.store.dispatch(new bookAction.FetchBookInCart(res));
                        return res as BookInCart[];
                    }
                ),
                catchError((err) => {
                    return Observable.of(null);
                }));
        });
    }

    public addBookToCart(bookId: number): Observable<BookInCart> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiURL + '/AddBookInCart', bookId, { headers }).pipe(
            tap(
                (res: any) => {
                    this.store.dispatch(new bookAction.AddBookInCart(res.data));
                    return res;
                }
            ),
            catchError((err) => {
                console.error(err);
                return Observable.of(false);
            }));
    }

    public deleteBookToCart(bookId: number): Observable<BookInCart> {
        return this.http.delete(this.apiURL + '/DeleteBookInCart/' + bookId).pipe(
            tap(
                (res: any) => {
                    this.store.dispatch(new bookAction.DeleteBookInCart(bookId));
                    return res;
                }
            ),
            catchError((err) => {
                console.error(err);
                return Observable.of(false);
            }));
    }

    public updateStatusBookInCart(bookId: number, status: number): Observable<BookInCart> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');
        return this.http.put(this.apiURL + '/UpdateStatusBookInCart/' + bookId
            , status, { headers }).pipe(
            tap(
                (res: any) => {
                    this.store.dispatch(new bookAction.UpdateStatusBookInCart({ bookId, status }));
                    return res;
                }
            ),
            catchError((err) => {
                console.error(err);
                return Observable.of(false);
            }));
    }
}
