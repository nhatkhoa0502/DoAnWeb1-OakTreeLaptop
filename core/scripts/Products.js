// --------------------------------------------------------------------------- //
// create Constructor
function typeConstructor(id, name) {
    this.id = id;
    this.name = name;
}

// --------------------------------------------------------------------------- //
// mảng thể loại
var types = [
    new typeConstructor("VanPhong", "Lap Văn Phòng"),
    new typeConstructor("Gaming", "Lap Gaming"),
    new typeConstructor("MacBook", "MacBook"),
    new typeConstructor("WStation", "WorkStation"),
    new typeConstructor("All", "Xem tất cả...."),
];

// --------------------------------------------------------------------------- //
// đẩy mảng thể loại lên Local Storage
function PushTypetoLocalStorage() {
    // nếu trong local Storage ko có types thì khởi tạo 
    if (localStorage.getItem('types') == null) 
    {
        localStorage.setItem('types', JSON.stringify(types)); // đẩy dữ liệu lên Local Storage
    }
}
PushTypetoLocalStorage();

// --------------------------------------------------------------------------- //
// js animation
function categoryActive() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var temp = $$(".category-list--item-link");

    temp.forEach(items => {
        items.onclick = function () {
            $(".category-list--item-link.catagory-Active").classList.remove("catagory-Active")
            this.classList.add('catagory-Active');
        }
    })
}

function paginationActive() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var temp = $$(".pagination-item--link");

    temp.forEach(item => {
        item.onclick = function () {
            // cơ chế là khi ấn vào element thì sẽ tự huỷ hết đối tượng element cùng class có chứ class đó
            // rồi sau đó mới add class Active vào cho element được click
            $('.pagination-item--link.paginationActive').classList.remove('paginationActive');
            this.classList.add('paginationActive');
        }
    })
}

// -------------------------------------------------- // 
// tạo thanh danh mục trên pc
function CreateSubMenu() {
    var tempArray = "";
    var typesArray = JSON.parse(localStorage.getItem('types'));
    for (var i = 0; i < typesArray.length; i++) {
        if (typesArray[i].id != 'All') {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${typesArray[i].id} class="category-list--item-link" href="#">${typesArray[i].name}</a>
            </li>
            `;
        } else {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${typesArray[i].id} class="category-list--item-link catagory-Active" href="#">${typesArray[i].name}</a>
            </li>
            `;
        }
    }
    document.querySelector(".category-list").innerHTML = tempArray;
}

// --------------------------------------------------------------------------- //
// tạo thanh danh mục trên mobile
function CreateSubMenu_Mobile() {
    var tempArray = "";
    var typesArray = JSON.parse(localStorage.getItem('types'));
    for (var i = 0; i < typesArray.length; i++) {
        if (typesArray[i].id != 'All') {
            tempArray += `
            <li class="mobile-category__item js-category-item">
                <a id=${typesArray[i].id} href="#" class="mobile-category__link">${typesArray[i].name}</a>
            </li>
            `;
        } else {
            tempArray += `
            <li class="mobile-category__item js-category-item">
                <a id=${typesArray[i].id} href="#" class="mobile-category__link">${typesArray[i].name}</a>
            </li>
            `;
        }
    }
    document.querySelector(".mobile-category-list").innerHTML = tempArray;
}

// -------------------------------------------------- // 
// xử lí phần sản phẩm
var productList = JSON.parse(localStorage.getItem('product'));
var ShowProduct = document.querySelector('#js-product-list');
const NumOfItem = 8; // số lượng sản phẩm trên 1 trang

function InnerProductions(name) {
    var tempArray = '';
    var emptyArray = '';

    // lọc ra các phần tử thoả mãn điều khiện -> trả về một obj chứa các phần tử thoả mãn
    var emptyObject = productList.filter((item) => {
        return item.type == name;
    })

    // --------------------------------------- // 
    // in ra số trang
    for (var i = 0; i < emptyObject.length / NumOfItem; i++) {
        if (i == 0) {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link paginationActive">${i+1}</a>
            </li>
            `
        } else {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link">${i+1}</a>
            </li>
            `
        }
    }
    document.querySelector('#page-num').innerHTML = tempArray;

    // --------------------------------------- // 
    // nếu bé hơn 8 thì lấy luôn chiều dài của obj còn không thì mặc định max là 8 sản phẩm 1 trang
    const numItemPage = emptyObject.length > NumOfItem ? NumOfItem : emptyObject.length; // kiểm tra số lượng phần tử mảng đã lọc

    // --------------------------------------- // 
    // in ra trang đầu tiên khi ấn vào danh mục
    for (var i = 0; i < numItemPage; i++) {
        emptyArray += `
        <div class="col l-3 m-4 c-6">
            <div class="product-item">
                <img class="product-item--img" src="./core${emptyObject[i].img}" alt="">
                <div class="product-item-main">
                    <h3 class="product-item--name">${emptyObject[i].name}</h3>
                    <div class="product-item--price_type">
                        <span class="product-item--price">${emptyObject[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                        <span class="product-item--type">Loại: ${emptyObject[i].type}</span>
                    </div>
                    <button type="button" class="js-product-detail" onClick="showDetail(\'${emptyObject[i].name}\');">Chi tiết</button>
                    <button type="button" class="js-product" onClick="addCart(\'${emptyObject[i].name}\'); addCartSuccess()">Mua Hàng</button>
                </div>
            </div>
        </div>`;
    }
    ShowProduct.innerHTML = emptyArray;

    // --------------------------------------- // 
    // in ra sản phẩm khi ấn vào số trang bất kì
    document.querySelectorAll(".pagination-item--link").forEach(items => {
        items.addEventListener('click', (item) => {
            var emptyArray = '';
            var values = item.target.id;
            var begin = parseInt(values) * numItemPage;
            var end = (parseInt(values) + 1) * numItemPage;
            for (var i = begin; i < end; i++) {
                if (i == parseInt(emptyObject.length)) break;
                emptyArray += `
                <div class="col l-3 m-4 c-6">
                    <div class="product-item">
                        <img class="product-item--img" src="./core${emptyObject[i].img}" alt="">
                        <div class="product-item-main">
                            <h3 class="product-item--name">${emptyObject[i].name}</h3>
                            <div class="product-item--price_type">
                                <span class="product-item--price">${emptyObject[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <span class="product-item--type">Loại: ${emptyObject[i].type}</span>
                            </div>
                            <button type="button" class="js-product-detail" onClick="showDetail(\'${emptyObject[i].name}\');">Chi tiết</button>
                            <button type="button" class="js-product" onClick="addCart(\'${emptyObject[i].name}\'); addCartSuccess()">Mua Hàng</button>
                        </div>
                    </div>
                </div>
                `
            }
            ShowProduct.innerHTML = emptyArray;
        })
    })
}

// --------------------------------------------------------------------------- //
// function in ra tất cả sản phẩm
function InnerAllProductions() {
    var tempArray = '';
    var emptyArray = '';

    // --------------------------------------- // 
    // in ra số trang
    for (var i = 0; i <= productList.length / NumOfItem; i++) {
        if (i == 0) {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link paginationActive">${i+1}</a>
            </li>
            `
        } else {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link">${i+1}</a>
            </li>
            `
        }
    }
    document.querySelector('#page-num').innerHTML = tempArray;

    // --------------------------------------- // 
    const numItemPage = productList.length > NumOfItem ? NumOfItem : productList.length; // kiểm tra số lượng phần tử mảng đã lọc
    // nếu bé hơn 8 thì lấy luôn chiều dài của obj còn không thì mặc định max là 8 sản phẩm 1 trang

    // --------------------------------------- // 
    // in ra trang đầu tiên khi ấn vào danh mục
    for (var i = 0; i < numItemPage; i++) {
        emptyArray += `
        <div class="col l-3 m-4 c-6">
            <div class="product-item">
                <img class="product-item--img" src="./core${productList[i].img}" alt="">
                <div class="product-item-main">
                    <h3 class="product-item--name">${productList[i].name}</h3>
                    <div class="product-item--price_type">
                        <span class="product-item--price">${productList[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                        <span class="product-item--type">Loại: ${productList[i].type}</span>
                    </div>
                    <button type="button" class="js-product-detail" onClick="showDetail(\'${productList[i].name}\');">Chi tiết</button>
                    <button type="button" class="js-product" onClick="addCart(\'${productList[i].name}\'); addCartSuccess()">Mua Hàng</button>
                </div>
            </div>
        </div>
        `
    }
    ShowProduct.innerHTML = emptyArray;

    // --------------------------------------- // 
    // in ra tất cả sản phẩm
    document.querySelectorAll(".pagination-item--link").forEach(items => {
        items.addEventListener('click', (item) => {
            var emptyArray = '';
            var values = item.target.id;
            var begin = parseInt(values) * numItemPage;
            var end = (parseInt(values) + 1) * numItemPage;
            for (var i = begin; i < end; i++) {
                if (i == parseInt(productList.length)) break;
                emptyArray += `
                <div class="col l-3 m-4 c-6">
                    <div class="product-item">
                        <img class="product-item--img" src="./core${productList[i].img}" alt="">
                        <div class="product-item-main">
                            <h3 class="product-item--name">${productList[i].name}</h3>
                            <div class="product-item--price_type">
                                <span class="product-item--price">${productList[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <span class="product-item--type">Loại: ${productList[i].type}</span>
                            </div>
                            <button type="button" class="js-product-detail" onClick="showDetail(\'${productList[i].name}\');">Chi tiết</button>
                            <button type="button" class="js-product" onClick="addCart(\'${productList[i].name}\'); addCartSuccess()">Mua Hàng</button>
                        </div>
                    </div>
                </div>
                `
            }
            ShowProduct.innerHTML = emptyArray;
        })
    })
}

// --------------------------------------------------------------------------- //
// in ra sản phẩm khi ấn vào 1 option trong phần danh mục
function ShowProductItem() {
    var ListOPT = document.querySelectorAll(".js-category-item");
    ListOPT.forEach(items => {
        items.addEventListener('click', (item) => {
            var innerID = item.target.id;  
            // in số sản phẩm trong danh mục thông qua số lượng types có trong local storage
            var typesArray = JSON.parse(localStorage.getItem('types'));
            for(var i = 0; i < typesArray.length; i++) {
                if(innerID == typesArray[i].id) {
                    if(typesArray[i].id == 'All') {
                        InnerAllProductions();
                        paginationActive();
                    }else {
                        InnerProductions(innerID);
                        paginationActive();
                    }
                }
            }
        })
    })
}

// --------------------------------------------------------------------------- //
// xử lí tìm kiếm
function InnerProductions_Search(name) {
    var tempArray = '';
    var emptyArray = '';

    // lọc ra các phần tử thoả mãn điều khiện -> trả về một obj chứa các phần tử thoả mãn
    var emptyObject = productList.filter((item) => {
        return item.name.toLowerCase().search(name.toLowerCase()) != -1;
    })

    // --------------------------------------- // 
    // in ra số trang
    for (var i = 0; i < emptyObject.length / NumOfItem; i++) {
        if (i == 0) {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link paginationActive">${i+1}</a>
            </li>
            `
        } else {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link">${i+1}</a>
            </li>
            `
        }
    }
    document.querySelector('#page-num').innerHTML = tempArray;

    // --------------------------------------- // 
    // nếu bé hơn 8 thì lấy luôn chiều dài của obj còn không thì mặc định max là 8 sản phẩm 1 trang
    const numItemPage = emptyObject.length > NumOfItem ? NumOfItem : emptyObject.length; // kiểm tra số lượng phần tử mảng đã lọc

    // --------------------------------------- // 
    // in ra trang đầu tiên khi ấn vào danh mục
    for (var i = 0; i < numItemPage; i++) {
        emptyArray += `
        <div class="col l-3 m-4 c-6">
            <div class="product-item">
                <img class="product-item--img" src="./core${emptyObject[i].img}" alt="">
                <div class="product-item-main">
                    <h3 class="product-item--name">${emptyObject[i].name}</h3>
                    <div class="product-item--price_type">
                        <span class="product-item--price">${emptyObject[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                        <span class="product-item--type">Loại: ${emptyObject[i].type}</span>
                    </div>
                    <button type="button" class="js-product-detail" onClick="showDetail(\'${emptyObject[i].name}\');">Chi tiết</button>
                    <button type="button" class="js-product" onClick="addCart(\'${emptyObject[i].name}\'); addCartSuccess()">Mua Hàng</button>
                </div>
            </div>
        </div>`;
    }
    ShowProduct.innerHTML = emptyArray;

    // --------------------------------------- // 
    // in ra sản phẩm khi ấn vào số trang bất kì
    document.querySelectorAll(".pagination-item--link").forEach(items => {
        items.addEventListener('click', (item) => {
            var emptyArray = '';
            var values = item.target.id;
            var begin = parseInt(values) * numItemPage;
            var end = (parseInt(values) + 1) * numItemPage;
            for (var i = begin; i < end; i++) {
                if (i == parseInt(emptyObject.length)) break;
                emptyArray += `
                <div class="col l-3 m-4 c-6">
                    <div class="product-item">
                        <img class="product-item--img" src="./core${emptyObject[i].img}" alt="">
                        <div class="product-item-main">
                            <h3 class="product-item--name">${emptyObject[i].name}</h3>
                            <div class="product-item--price_type">
                                <span class="product-item--price">${emptyObject[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                <span class="product-item--type">Loại: ${emptyObject[i].type}</span>
                            </div>
                            <button type="button" class="js-product-detail" onClick="showDetail(\'${emptyObject[i].name}\');">Chi tiết</button>
                            <button type="button" class="js-product" onClick="addCart(\'${emptyObject[i].name}\'); addCartSuccess()">Mua Hàng</button>
                        </div>
                    </div>
                </div>
                `
            }
            ShowProduct.innerHTML = emptyArray;
        })
    })
}

// --------------------------------------------------------------------------- //
// xử lí thanh tìm kiếm
// PC
function InnerProductBySearch() {
    // lấy dữ liệu bằng cách ấn vào nút search
    // lấy dữ liệu bằng cách ấn vào nút search
    document.querySelector("#search-btn").addEventListener('click', () =>{
        var search_Value = document.querySelector('.category-search--input');
        InnerProductions_Search(search_Value.value);
        paginationActive();
    });

    // lấy dữ liệu bằng cách nhập xong rồi ấn enter
    document.querySelector('.category-search--input').addEventListener('change', () => {
        var search_Value = document.querySelector('.category-search--input');
        InnerProductions_Search(search_Value.value);
        paginationActive();
    })
}

// Tablet - Mobile
function InnerProductBySearch_Mobile() {
    // lấy dữ liệu bằng cách ấn vào nút search
    document.querySelector("#search-btn--mobile").addEventListener('click', () =>{
        var search_Value = document.querySelector('.mobile-search--input');
        InnerProductions_Search(search_Value.value);
        paginationActive();
    });

    // lấy dữ liệu bằng cách nhập xong rồi ấn enter
    document.querySelector('.mobile-search--input').addEventListener('change', () => {
        var search_Value = document.querySelector('.mobile-search--input');
        InnerProductions_Search(search_Value.value);
        paginationActive();
    })
}

// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Detail Product 
function HandleEventDetailProduct() {
    var closeBTN = document.querySelector(".js-D-close-btn");

    closeBTN.addEventListener('click', () => {
        document.querySelector(".DetailProduct_Wrap").classList.remove("isOpenDP")
    })  
}


// ---------------------------------------------------------------------------- //
// xử lí công việc mở form Detail Product và show thông tin sản phẩm
function showDetail(name) {
    document.querySelector(".DetailProduct_Wrap").classList.add("isOpenDP");
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name == name) {
            document.querySelector('.Detail_Product_main_form').innerHTML = `
                <img class="Detail_Product_img" src="./core${productList[i].img}" alt="${productList[i].name}">
                <div class="Detail_Product_Sub_form">
                    <div class="Detail_Product__Description"><strong>Mô tả:</strong> ${productList[i].description}</div>
                    <div class="Detail_Product_Sub2">
                        <div class="Detail_Product_type"><strong>Loại:</strong> ${productList[i].type}</div>
                        <div class="Detail_Product_price"><strong>Giá:</strong> ${productList[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                    </div>
                </div>
            `
        }
    }
}

// --------------------------------------------------------------------------- //
CreateSubMenu();
CreateSubMenu_Mobile();
ShowProductItem();
InnerAllProductions();
paginationActive();
categoryActive();
InnerProductBySearch();
InnerProductBySearch_Mobile();
HandleEventDetailProduct();
