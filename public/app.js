class DynamicProduct {
    name = "";
    collectionId = undefined;
    price = 0;
    description = "";
    isActive = false;
    imagePackId = undefined;
    productProps = [];
    sales = [];

    constructor() {

    }

    getData() {
        let viewModel = {
            name: this.name,
            price: this.price,
            description: this.description,
            props: [],
        };

        for (let tprop of this.productProps) {
            viewModel.props.push({
                name: tprop.name,
                values: [...tprop.values],
                defaultIndex: tprop.defaultIndex
            });
        }
        return viewModel;        
    }

    getPossibleVariants() {
        let variants = [];

        this.getVariant(0, `${this.name},${this.price}`, variants);

        return variants;
    }

    getVariant(propIndex, variantStr, box) {
        if (this.productProps[propIndex] != null && this.productProps[propIndex].gen) {
            let prop = this.productProps[propIndex];
            for (let valueObj of prop.values) {
                this.getVariant(propIndex+1, variantStr + ` p[${prop.name}] - [${valueObj.value},${valueObj.tax},${valueObj.measure}]`, box);
            }
        } else {
            box.push(variantStr);
        }
    }
}

const someProp1 = {
    name: "color",
    values: [
        {
            value: "red",
            tax: 100,
            measure: "number"
        },
        {
            value: "green",
            tax: 0,
            measure: "number"
        },
        {
            value: "blue",
            tax: 5,
            measure: "percent"
        },
    ],
    defaultIndex: 0,
    gen: true
}

const someProp2 = {
    name: "size",
    values: [
        {
            value: "S",
            tax: 0,
            measure: "number"
        },
        {
            value: "M",
            tax: 0,
            measure: "number"
        },
        {
            value: "L",
            tax: 200,
            measure: "number"
        },
    ],
    defaultIndex: 0,
    gen: true
}

const someProp3 = {
    name: "box",
    values: [
        {
            value: "small box",
            tax: 100,
            measure: "number"
        },
        {
            value: "medium box",
            tax: 300,
            measure: "number"
        }
    ],
    defaultIndex: 0,
    gen: false
}

const someProp4 = {
    name: "salt",
    values: [
        {
            value: "w/o salt",
            tax: 0,
            measure: "percent"
        },
        {
            value: "with salt",
            tax: 2,
            measure: "percent"
        }
    ],
    defaultIndex: 0,
    gen: true
}


let currentProduct = new DynamicProduct();
currentProduct.name = "Мыло",
currentProduct.description = "прекрасное мыло для тебя";
currentProduct.price = 100;
//currentProduct.productProps.push(someProp1);
//currentProduct.productProps.push(someProp2);






var container = document.getElementById("currentProduct");

function update() {
    let product = currentProduct.getData();

    container.innerHTML = "";

    let newBody = document.createElement("div");
    newBody.setAttribute("id", "currentProductBody");

    let node_name = document.createElement("div");
    node_name.innerHTML = product.name;

    let node_price = document.createElement("div");
    node_price.innerHTML = product.price;

    let node_description = document.createElement("div");
    node_description.innerHTML = product.description;

    newBody.appendChild(node_name);
    newBody.appendChild(node_price);
    newBody.appendChild(node_description);

    for (let prop of product.props) {
        let node_prop_name = document.createElement("div");
        node_prop_name.innerHTML = prop.name;
        newBody.appendChild(node_prop_name);

        // массив значений свойств
        let node_prop_values = document.createElement("ul");
        for (let valueObj of prop.values) {
            let node_prop_value = document.createElement("li");
            node_prop_value.innerHTML = `${valueObj.value}, ${valueObj.tax}, ${valueObj.measure}`;
            node_prop_values.appendChild(node_prop_value);
        }
        newBody.appendChild(node_prop_values);

        let node_prop_di = document.createElement("div");
        node_prop_di.innerHTML = prop.defaultIndex;
        newBody.appendChild(node_prop_di);
    }

    container.appendChild(newBody);
}

function showPossibleVariants() {
    let product = currentProduct.getData();

    container.removeChild(document.getElementById("currentProductBody"));

    let newBody = document.createElement("div");
    newBody.setAttribute("id", "currentProductBody");

    let node_name = document.createElement("div");
    node_name.innerHTML = product.name;

    let node_price = document.createElement("div");
    node_price.innerHTML = product.price;

    let node_description = document.createElement("div");
    node_description.innerHTML = product.description;

    newBody.appendChild(node_name);
    newBody.appendChild(node_price);
    newBody.appendChild(node_description);

    for (let prop of product.props) {
        let node_prop_name = document.createElement("div");
        node_prop_name.innerHTML = prop.name;
        newBody.appendChild(node_prop_name);

        // массив значений свойств
        let node_prop_values = document.createElement("ul");
        for (let valueObj of prop.values) {
            let node_prop_value = document.createElement("li");
            node_prop_value.innerHTML = `${valueObj.value}, ${valueObj.tax}, ${valueObj.measure}`;
            node_prop_values.appendChild(node_prop_value);
        }
        newBody.appendChild(node_prop_values);

        let node_prop_di = document.createElement("div");
        node_prop_di.innerHTML = prop.defaultIndex;
        newBody.appendChild(node_prop_di);
    }

    container.appendChild(newBody);
}