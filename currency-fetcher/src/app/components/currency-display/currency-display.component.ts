import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, switchMap } from 'rxjs';
import { CurrencyFetchService } from 'src/app/services/currency-fetch.service';

@Component({
    selector: 'currency-display',
    templateUrl: 'currency-display.component.html',
    styleUrls: [ "currency-display.component.scss" ],
    providers: [ CurrencyFetchService ]
})

export class CurrencyDisplayComponent implements OnInit {
    public currencyRate$: Observable<number>;
    private _timeInterval = 10000;

    constructor(private _currencyFetchService: CurrencyFetchService) { }

    ngOnInit() {
        this.currencyRate$ = interval(this._timeInterval).pipe(
            switchMap(c => this._currencyFetchService.getEuroRate())
        );
    }
}