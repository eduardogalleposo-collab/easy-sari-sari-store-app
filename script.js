// Load saved products
let products = JSON.parse(localStorage.getItem("products")) || [];


// Show the Add Product form
function showForm() {

    const form = document.getElementById("productForm");

    form.style.display = "block";

    document.getElementById("itemName").focus();
}


// Add a new product
function addProduct() {

    let itemName = document
        .getElementById("itemName")
        .value
        .trim();

    let costPrice = Number(
        document.getElementById("costPrice").value
    );


    // Check if information is valid
    if (itemName === "" || costPrice <= 0) {

        alert(
            "Please enter a valid item name and cost price greater than zero."
        );

        return;
    }


    // Add product
    products.push({

        name: itemName,

        cost: costPrice

    });


    // Save products
    saveProducts();


    // Display products
    displayProducts();


    // Clear input boxes
    document.getElementById("itemName").value = "";

    document.getElementById("costPrice").value = "";


    // Hide form
    document.getElementById("productForm").style.display = "none";
}


// Display products
function displayProducts(searchText = "") {

    let productList = document.getElementById("productList");


    // Clear current list
    productList.innerHTML = "";


    // Sort ALL products alphabetically A-Z
    products.sort(function(a, b) {

        return a.name.localeCompare(b.name);

    });


    // Search products
    let filteredProducts = products.filter(function(product) {

        return product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

    });


    // Display filtered products
    filteredProducts.forEach(function(product) {


        // Find the original product index
        let index = products.indexOf(product);


        // Calculate 20% markup
        let markup = product.cost * 0.20;


        // Calculate selling price
        let sellingPrice = product.cost + markup;


        // Create product box
        let productBox = document.createElement("div");


        productBox.className = "product";


        productBox.innerHTML = `

            <div>

                <strong>${product.name}</strong><br>

                <small>
                    Cost: ₱${product.cost.toFixed(2)}
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


                <strong>
                    ₱${sellingPrice.toFixed(2)}
                </strong>


            </div>

        `;


        // Add product to the screen
        productList.appendChild(productBox);

    });

}


// Search products
function searchProducts() {

    let searchText = document
        .getElementById("searchInput")
        .value;


    displayProducts(searchText);

}


// Edit product
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


        </div>


        <div class="price-area">


            <button onclick="saveProduct(${index})">
                Save
            </button>


        </div>

    `;

}


// Save edited product
function saveProduct(index) {

    let newName = document
        .getElementById(`editName${index}`)
        .value
        .trim();


    let newCost = Number(

        document
            .getElementById(`editCost${index}`)
            .value

    );


    if (newName === "" || newCost <= 0) {

        alert("Please enter valid information.");

        return;

    }


    // Update product
    products[index].name = newName;

    products[index].cost = newCost;


    // Save changes
    saveProducts();


    // Display again
    displayProducts();

}


// Delete product
function deleteProduct(index) {

    products.splice(index, 1);


    // Save changes
    saveProducts();


    // Display again
    displayProducts();

}


// Save products
function saveProducts() {

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}


// Load products when app opens
displayProducts();