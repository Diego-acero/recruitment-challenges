module.exports = class Order {
    constructor(orderId, dealId, email, street, city, state, zipcode, creditCard)
    {
        this.#orderId = Number(orderId);
        this.#dealId = Number(dealId);
        this.#email = normalice(email.toLowerCase());
        this.#street = normaliceStreet(street.toLowerCase());
        this.#city = city.toLowerCase();
        this.#state = state.toLowerCase();
        this.#zipcode = zipcode;
        this.#creditCard = creditCard;
    }

    get orderId(){return this.#orderId;}
    get dealId() {return this.#dealId;}
    get email() {return this.#email;}
    get street() {return this.#street;}
    get city() {return this.#city;}
    get state() {return this.#state;}
    get zipcode() {return this.#zipcode;}
    get creditCard() {return this.#creditCard;}


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