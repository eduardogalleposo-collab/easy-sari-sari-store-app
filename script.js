let products = JSON.parse(localStorage.getItem("products")) || [];

function showForm() {

    const form = document.getElementById("productForm");

    form.style.display = "block";

    document.getElementById("itemName").focus();

}

function addProduct() {

    let itemName = document
        .getElementById("itemName")
        .value
        .trim();

    let costPrice = Number(
        document.getElementById("costPrice").value
    );

    let sellingPrice = Number(
        document.getElementById("sellingPrice").value
    );

    if (
        itemName === "" ||
        costPrice <= 0 ||
        sellingPrice <= 0 ||
        sellingPrice < costPrice
    ) {

        alert(
            "Selling price must be greater than or equal to cost price."
        );

        return;

    }

    products.push({

        name: itemName,
        cost: costPrice,
        selling: sellingPrice

    });

    saveProducts();

    displayProducts();

    document.getElementById("itemName").value = "";
    document.getElementById("costPrice").value = "";
    document.getElementById("sellingPrice").value = "";

    document.getElementById("productForm").style.display = "none";

}

function displayProducts(searchText = "") {

    let productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.sort(function(a, b) {

        return a.name.localeCompare(b.name);

    });

    let filteredProducts = products.filter(function(product) {

        return product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

    });

    filteredProducts.forEach(function(product) {

        let index = products.indexOf(product);

        let profit = product.selling - product.cost;

        let productBox = document.createElement("div");

        productBox.className = "product";

        productBox.innerHTML = `

            <div>

                <strong>${product.name}</strong><br>

                <small>
                    Cost: ₱${product.cost.toFixed(2)}
                </small>

                <br>

                <small>
                    Selling: ₱${product.selling.toFixed(2)}
                </small>

                <br>

                <small>
                    Profit: ₱${profit.toFixed(2)}
                </small>

            </div>

            <div class="price-area">

                <div class="action-buttons">

                    <button onclick="editProduct(${index})">
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteProduct(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

        productList.appendChild(productBox);

    });

}

function searchProducts() {

    let searchText = document
        .getElementById("searchInput")
        .value;

    displayProducts(searchText);

}

function editProduct(index) {

    let product = products[index];

    let productBox =
        document.getElementsByClassName("product")[index];

    productBox.innerHTML = `

        <div>

            <input
                type="text"
                id="editName${index}"
                value="${product.name}"
            >

            <input
                type="number"
                id="editCost${index}"
                value="${product.cost}"
            >

            <input
                type="number"
                id="editSelling${index}"
                value="${product.selling}"
            >

        </div>

        <div class="price-area">

            <button onclick="saveProduct(${index})">
                Save
            </button>

        </div>

    `;

}

function saveProduct(index) {

    let newName = document
        .getElementById(`editName${index}`)
        .value
        .trim();

    let newCost = Number(
        document.getElementById(`editCost${index}`).value
    );

    let newSelling = Number(
        document.getElementById(`editSelling${index}`).value
    );

    if (
        newName === "" ||
        newCost <= 0 ||
        newSelling <= 0 ||
        newSelling < newCost
    ) {

        alert(
            "Selling price must be greater than or equal to cost price."
        );

        return;

    }

    products[index].name = newName;
    products[index].cost = newCost;
    products[index].selling = newSelling;

    saveProducts();

    displayProducts();

}

function deleteProduct(index) {

    products.splice(index, 1);

    saveProducts();

    displayProducts();

}

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

displayProducts();
