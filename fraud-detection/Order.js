module.exports = class Order {
    constructor(orderId, dealId, email, street, city, state, zipcode, creditCard)
    {
        this._orderId = Number(orderId);
        this._dealId = Number(dealId);
        this._email = this.normaliceEmail(email.toLowerCase());
        this._street = this.normaliceStreet(street.toLowerCase());
        this._city = city.toLowerCase();
        this._state = state.toLowerCase();
        this._zipcode = zipcode;
        this._creditCard = creditCard;
        this._isFraudulent = false;
    }

    get orderId(){return this._orderId;}
    get dealId() {return this._dealId;}
    get email() {return this._email;}
    get street() {return this._street;}
    get city() {return this._city;}
    get state() {return this._state;}
    get zipcode() {return this._zipcode;}
    get creditCard() {return this._creditCard;}
    get isFraudulent() {return this._isFraudulent;}

    set isFraudulent(isFraudulent) {this._isFraudulent = isFraudulent};


    normaliceEmail(email) 
    {
        let aux = email.split('@')
        let atIndex = aux[0].indexOf('+')
        aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
        return aux.join('@')
    }

    normaliceStreet(street) 
    {
        return street.replace('st.', 'street').replace('rd.', 'road')
    }

    normaliceState(state)
    {
        return state.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york')
    }

}