// --------------------------------------------------------------------------- //
// khởi tạo user
function createAccount() {
    var userArray = [];
    // if (localStorage.getItem('user') == null)
    {
        var admin = {
            username: 'admin',
            password: '123',
            gmail: 'admin123@gmail.com',
            RegisterDay: `3-7-2003`,
            userType: 'admin',
        };
        userArray.push(admin);

        var user1 = {
            username: 'user1',
            password: '123',
            gmail: 'user1123@gmail.com',
            RegisterDay: `5-3-2000`,
            userType: 'user',
        };
        userArray.push(user1);

        var user2 = {
            username: 'user2',
            password: '123',
            gmail: 'user2123@gmail.com',
            RegisterDay: `20-5-2001`,
            userType: 'user',
        };
        userArray.push(user2);
        
        localStorage.setItem('user', JSON.stringify(userArray)); // đẩy dữ liệu lên Local Storage
    }
}

// --------------------------------------------------------------------------- //
//  khởi tạo dữ liệu sản phẩm
function createProducts() {
    // if (localStorage.getItem('product') === null)
    {     
        var productArray = [
            { id: 0, type: 'VanPhong', name: 'Acer Swift 1', img: '/img/Products/VanPhong/020.jpg', price: 55000 , description: ""},
            { id: 1, type: 'VanPhong', name: 'Acer Swift 2', img: '/img/Products/VanPhong/021.jpg', price: 50000 , description: ""},
            { id: 2, type: 'VanPhong', name: 'Acer Swift 3', img: '/img/Products/VanPhong/022.jpg', price: 110000, description: ""},
            { id: 3, type: 'VanPhong', name: 'Acer Swift 4', img: '/img/Products/VanPhong/023.jpg', price: 270000, description: ""},
            { id: 4, type: 'Gaming', name: 'Asus TUF Gaming 1', img: '/img/Products/Gaming/001.jpg', price: 100000, description: ""},
            { id: 5, type: 'Gaming', name: 'Asus TUF Gaming 2', img: '/img/Products/Gaming/002.jpg', price: 120000, description: ""},
            { id: 6, type: 'Gaming', name: 'Asus TUF Gaming 3', img: '/img/Products/Gaming/003.jpg', price: 150000, description: ""},
            { id: 7, type: 'Gaming', name: 'Asus TUF Gaming 4', img: '/img/Products/Gaming/004.jpg', price: 287000, description: ""},
            { id: 8, type: 'Gaming', name: 'Asus TUF Gaming 5', img: '/img/Products/Gaming/005.jpg', price: 330000, description: ""},
            { id: 9, type: 'Gaming', name: 'Asus TUF Gaming 6', img: '/img/Products/Gaming/006.jpg', price: 290000, description: ""},
            { id: 10, type: 'Gaming', name: 'Asus TUF Gaming 7', img: '/img/Products/Gaming/007.jpg', price: 270000, description: ""},
            { id: 11, type: 'Gaming', name: 'Asus TUF Gaming 8', img: '/img/Products/Gaming/008.jpg', price: 220000, description: ""},
            { id: 12, type: 'Gaming', name: 'Asus TUF Gaming 9', img: '/img/Products/Gaming/009.jpg', price: 250000, description: ""},
            { id: 13, type: 'Gaming', name: 'Asus TUF Gaming 10', img: '/img/Products/Gaming/010.jpg', price: 500000, description: ""},
            { id: 14, type: 'MacBook', name: 'MacBook Air M1', img: '/img/Products/Macbook/011.jpg', price: 350000, description: ""},
            { id: 15, type: 'MacBook', name: 'MacBook Air M2', img: '/img/Products/Macbook/012.jpg', price: 350000, description: ""},
            { id: 16, type: 'MacBook', name: 'MacBook Air M3', img: '/img/Products/Macbook/013.jpg', price: 260000, description: ""},
            { id: 17, type: 'MacBook', name: 'MacBook Air M3 Blue', img: '/img/Products/Macbook/blue.jpg', price: 390000, description: ""},
            { id: 18, type: 'MacBook', name: 'MacBook Air M3 Purple', img: '/img/Products/Macbook/purple.jpg', price: 450000, description: ""},
            { id: 19, type: 'MacBook', name: 'MacBook Air M3 Yellow', img: '/img/Products/Macbook/yellow.jpg', price: 150000, description: ""},
            { id: 20, type: 'WStation', name: 'Dell Precision 3510', img: '/img/Products/WStation/014.jpg', price: 756000, description: ""},
            { id: 21, type: 'WStation', name: 'Dell Latitude 3200', img: '/img/Products/WStation/015.jpg', price: 892000, description: ""},
            { id: 22, type: 'WStation', name: 'Dell Latitude 3300', img: '/img/Products/WStation/016.jpg', price: 190000, description: ""},
            { id: 23, type: 'WStation', name: 'Dell Latitude 3400', img: '/img/Products/WStation/017.jpg', price: 890000, description: ""},
            { id: 24, type: 'WStation', name: 'Dell Latitude 3500', img: '/img/Products/WStation/018.jpg', price: 790000, description: ""},
            { id: 25, type: 'WStation', name: 'Dell Latitude 3600', img: '/img/Products/WStation/019.jpg', price: 396000, description: ""},
            { id: 26, type: 'WStation', name: 'Dell Latitude 3700', img: '/img/Products/WStation/026.jpg', price: 190000, description: ""},
            { id: 27, type: 'WStation', name: 'Dell Latitude 3800', img: '/img/Products/WStation/027.jpg', price: 999000, description: ""},
            { id: 28, type: 'WStation', name: 'Dell Latitude 3900', img: '/img/Products/WStation/028.jpg', price: 167000, description: ""},
            { id: 29, type: 'WStation', name: 'Dell Latitude 5100', img: '/img/Products/WStation/029.jpg', price: 292000, description: ""},
            { id: 30, type: 'WStation', name: 'Dell Latitude 4600', img: '/img/Products/WStation/030.jpg', price: 219000, description: ""},
        ];
        localStorage.setItem('product', JSON.stringify(productArray));
    }
}

// --------------------------------------------------------------------------- //
// khởi tạo cartList rỗng
function createCartListEmpty() {
    // if (localStorage.getItem('cartList') === null) 
    {
        var CartEmpty = [];
        localStorage.setItem('cartList', JSON.stringify(CartEmpty));
    }
}

createAccount();
createProducts();
createCartListEmpty();