class Heroes {

}

class Coffee {
    id;
    name;
    description;
    reference;
    country_id;
    price_per_kg;
    available;
    created_at;
    updated_at;
    customerPrice;

    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.reference = data.reference;
        this.country_id = data.country_id;
        this.price_per_kg = data.price_per_kg;
        this.available = data.available;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.customerPrice = data.customerPrice;
    }

    formatedPrice() {
    // console.log(typeof this.customerPrice);    
    return Number(this.customerPrice).toFixed(2).replace('.', ',') + ' €';    
    }
}

export default Coffee;