import { Currency } from "../models/currency";

export class CurrencyResponseParser {
    public static parseCurrencyValue(response: any, currency: Currency): number {
        try {
            const parsedResponse = JSON.parse(response);
            return Number(parsedResponse?.Valute[currency.code]?.Value);
        }
        catch (e) {
            let result = 0;
            const parser = new DOMParser();
            const parsedResponse = parser.parseFromString(response,"text/xml");
            parsedResponse.firstChild?.childNodes.forEach(
                childNode => {
                    const text = childNode.textContent;
                    if ((childNode as any).attributes[0].nodeValue === currency.id) {
                        result = (childNode.childNodes.item(childNode.childNodes.length - 1) as any).innerHTML.replace(',', '.');
                    }
                }
            );

            return Number(result);
        }
    }
}