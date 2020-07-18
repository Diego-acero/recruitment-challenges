const fs = require('fs');
const Order = require('./Order');

class FraudRadar {
    #orders = [];
    #fraudResults = [];

    get orders() {return this.#orders}
    get fraudResults() {return this.#fraudResults}

    check(filePath) 
    {
        this._setOrdersFromFile(filePath);

        for (let i = 0; i < this.#orders.length; i++) {
            let current = this.#orders[i]
            let isFraudulent = false
        
            for (let j = i + 1; j < this.#orders.length; j++) {
              isFraudulent = false
              
              if (this._isOrderPersonalDataFraudulent(current, this.#orders[j])) {
                  isFraudulent = true
                }
              if (this._isOrderLocationDataFraudulent(current, this.#orders[j])) {
                  isFraudulent = true
                }
              
              if (isFraudulent) {
                fraudResults.push({
                  isFraudulent: true,
                  orderId: orders[j].orderId
                })
              }
            }
          }
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