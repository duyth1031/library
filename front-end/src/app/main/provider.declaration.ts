import { ErrorHandler } from '@angular/core';

/* Http Services */
import { Http, RequestOptions } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';

/* Guards */
import { HomeGuard } from '../guards/home.guard';
import { BookDetailGuard } from '../guards/book-detail.guard';

/* Handlers */
import { SystemErrorHandler, ResponseHandler } from '../shareds/helpers';
import { LsHelper } from '../shareds/helpers';
import { CheckOutGuard } from '../guards/check-out.guard';
import { BookInCartCheckGuard } from '../guards/book-in-cart-check.guard';

/* Services */
import { RouterService } from '../services/router.service';
import { LoginService } from '../services/login.service';
import { CategoryService } from '../services/category.service';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';
import { MyBookService } from '../services/my-book.service';
import { SearchBookService } from '../services/search-book.service';
import { NotificationService } from '../services/notification.service';
import { PublisherService } from '../services/publisher.service';
import { SupplierService } from '../services/supplier.service';

export const services: any = [
    RouterService,
    LoginService,
    CategoryService,
    BookService,
    CartService,
    MyBookService,
    SearchBookService,
    NotificationService,
    PublisherService,
    SupplierService,
    {
        provide: ErrorHandler,
        useClass: SystemErrorHandler
    },
    ResponseHandler
];

export const guards: any = [
    HomeGuard,
    BookDetailGuard,
    CheckOutGuard,
    BookInCartCheckGuard,
];
