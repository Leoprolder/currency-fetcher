export class Currency {
    public code: string;
    public id: string;

    constructor(private _code: string, private _id: string) {
        this.code = _code;
        this.id = _id;
    }
}