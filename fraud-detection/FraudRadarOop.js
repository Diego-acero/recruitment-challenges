const fs = require('fs');
const Order = require('./Order');

module.exports = class FraudRadarOop {
    #orders = [];
    #fraudResults = [];

    get orders() {return this.#orders}
    get fraudResults() {return this.#fraudResults}

    check(filePath) 
    {
        this._setOrdersFromFile(filePath);
        this._setFraudulentResults();
        return this.#fraudResults;
    }

    _setOrdersFromFile(filePath) 
    {
        let fileContent = fs.readFileSync(filePath, 'utf8');
        let lines = fileContent.split('\n');
        for (let line of lines) {
            let items = line.split(',')
            this.#orders.push(new Order(items[0],
                                        items[1],
                                        items[2],
                                        items[3],
                                        items[4],
                                        items[5],
                                        items[6],
                                        items[7])
                                        );
        }
    }

    _setFraudulentResults() 
    {
      for (let i = 0; i < this.#orders.length; i++) 
        {
            let current = this.#orders[i]
            for (let j = i + 1; j < this.#orders.length; j++) {
              if (this._isOrderPersonalDataFraudulent(current, this.#orders[j]) ||
                 this._isOrderLocationDataFraudulent(current, this.#orders[j])) 
                {
                  this.#fraudResults.push({
                    isFraudulent: true,
                    orderId: this.#orders[j].orderId
                  });
                }
            }
        }
    }

    _isOrderPersonalDataFraudulent(current, order) {
        return current.dealId === order.dealId
                && current.email === order.email
                && current.creditCard !== order.creditCard;
    }

    _isOrderLocationDataFraudulent(current, order) {
        return current.dealId === order.dealId
                && current.state === order.state
                && current.zipCode === order.zipCode
                && current.street === order.street
                && current.city === order.city
                && current.creditCard !== order.creditCard;
    }
}