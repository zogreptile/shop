var currentCart = localStorage.getItem('cart') || [];

$(function () {
    $('.product__add').click(function () {
        var $this = $(this),
            itemData = {
                id: $this.data('product-id'),
                name: $this.data('product-name'),
                price: $this.data('product-price'),
                img: $this.data('product-img'),
                amount: $this.data('product-amount'),
            };
        
        cart.addItem(itemData);
    })

    $('.product__remove').click(function () {
        var itemId = $(this).siblings('.product__add').data('product-id');
        cart.removeItem(itemId);
    })
})

var cart = {
    addItem: function (itemObj) {
        var currentCart = JSON.parse(localStorage.getItem('cart')) || [],
            alreadyAdded = false;

        $(currentCart).each(function (ind, itemInCart) {
            if (itemObj.id == itemInCart.id) {
                itemInCart.amount += itemObj.amount;
                localStorage.setItem('cart', JSON.stringify(currentCart));
                alreadyAdded = true;
                return;
            }
        })

        if (!alreadyAdded) {
            currentCart.push(itemObj);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    },
    removeItem: function (itemId) {
        var currentCart = JSON.parse(localStorage.getItem('cart')) || [],
            updatedCart = [];

            $(currentCart).each(function (ind, itemInCart) {
                if (itemInCart.id !== itemId) {
                    updatedCart.push(itemInCart);
                }
            });

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    changeItemAmount: function (itemId, itemAmount) {
        var currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        $(currentCart).each(function (ind, itemInCart) {
            if (itemInCart.id === itemId) {
                itemInCart.amount = itemAmount;
                localStorage.setItem('cart', JSON.stringify(currentCart));
                return;
            }
        })
    }
}