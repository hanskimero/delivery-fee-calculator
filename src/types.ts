interface FormData { // poistettu kyssärit, jotta luokka toimisi
    [key : string] : any,
    cartValue? : number,
    deliveryDistance? : number,
    numberOfItems? : number,
    orderTime? : Date
}

interface Errors {
    [key : string] : any,
    cartValue?: string,
    deliveryDistance?: string,
    numberOfItems?: string,
    orderTime?: string
}

export type { FormData, Errors }
