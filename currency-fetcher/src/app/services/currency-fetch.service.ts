import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, map, Observable, of, retry, switchMap } from "rxjs";
import { CurrencyResponseParser } from "../helpers/currency-response-parser";
import { Currencies } from "../constants/currencies.constants";
import { Currency } from "../models/currency";

@Injectable({
    providedIn: 'root'
})
export class CurrencyFetchService {
    private _sources: string[] = [
        'https://www.cbr-xml-daily.ru/daily_json.js',
        'https://www.cbr-xml-daily.ru/daily_utf8.xml'
    ];

    constructor(private _httpClient: HttpClient) {
    }

    public getEuroRate(): Observable<number> {
        return this._getCurrencyRate(Currencies.Euro);
    }

    private _getCurrencyRate(currency: Currency): Observable<number> {
        return from(this._sources).pipe(
            switchMap(source =>
                this._httpClient.get(source, { responseType: 'text' })
                    .pipe(
                        map(response => CurrencyResponseParser.parseCurrencyValue(response, currency))
                    )
            ),
            retry({
                resetOnSuccess: true,
                count: this._sources.length,
                delay: 500
            })
        );
    }
}