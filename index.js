var carousel = document.getElementsByClassName('image-slider')[0];
var slider = {
    "autoplay":true,
    "current":0,
    "images":{
        "desktop":['img/background.jpg','img/sliderimg1.jpg','img/careershead.jpg','img/scrollableimages/img3(2000px).jpg','img/background.jpg','img/sliderimg1.jpg','img/careershead.jpg','img/career1.jpg'],
        "mobile":['img/background.jpg','img/sliderimg1.jpg','img/careershead.jpg','img/scrollableimages/img3(2000px).jpg','img/background.jpg','img/sliderimg1.jpg','img/careershead.jpg','img/career1.jpg'],
    },
    "right":function(){
        if(slider.current < slider.images.desktop.length-2){
            this.current +=1;
        }else{
            this.current = 0;
        }
        carousel.style.backgroundImage = "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('"+ this.images.mobile[this.current]+"')"       
    },
    "left":function(){
        if(slider.current > 0){
            this.current -=1;
        }else{
            this.current = (slider.images.desktop.length)-2;
        }
        carousel.style.backgroundImage = "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('"+ this.images.desktop[this.current]+"')"         
    },
    "test":{ //Testimonials 
        "curr":0,
        "right":function(){
            var indicator = document.getElementsByClassName('_indicators')[0].children;
            slider.test.curr+=1;
            for(let i =0; i < indicator.length -2 ; i++){
            if(i !== slider.test.curr){
                indicator[i].className = ""
            }else{
                indicator[slider.test.curr].className = "curr-test"

            }   
        }   
    },
    "left": function(){
            var indicator = document.getElementsByClassName('_indicators')[0].children;
            slider.test.curr -=1
            for(let i =0; i < indicator.length -2 ; i++){
            if(i !== slider.test.curr){
                indicator[i].className = ""
            }else{
                indicator[slider.test.curr].className = "curr-test"

            }   
        }
    }
}    
}
var cart = {
    "items":[],
    "total":0,
    "addCart":function(imgURl, product, price,quantity){
        var cartArea = document.getElementsByClassName('cart-area')[0]
        var cartCard = document.createElement('div');
        cartCard.className = "cart-card";
        var prodImg = document.createElement('img');
        prodImg.setAttribute('src',imgURl);
        var cardBody = document.createElement('cart-card-body');
        cardBody.className = "cart-card-body";
        var prodName = document.createElement('h5');
        prodName.textContent = product;
        var prodPrice = document.createElement('h6');
        prodPrice.textContent = quantity + " x " + price;
        cardBody.append(prodName);
        cardBody.append(prodPrice);
        var remove = document.createElement('i');
        remove.className = "fas fa-trash";
        remove.addEventListener('click',this.removeCart);

        if(!cart.items.includes(product)){
            cartCard.append(prodImg);
            cartCard.append(cardBody);
            cartCard.append(remove);
    
            cartArea.append(cartCard);
            cart.items.push(product);
            cart.updateTotal();
            cart.saveCart()
        }else{
            var cartIndex = cart.items.indexOf(product);
            var cartKid = cartArea.children;
            var targetCard = cartKid[cartIndex];
            var targetQuant = targetCard.children[1].children[1].textContent;
            var currQuant = parseInt(targetQuant.split(' ')[0]); // 
            currQuant+=parseInt(quantity)
            targetQuant = currQuant + " x " + price;
            targetCard.children[1].children[1].textContent = targetQuant;
            cart.updateTotal() 
            cart.saveCart()

      
        }
    },
    "removeCart":function(e){
        var target = e.currentTarget.parentElement
        cartSectArea.removeChild(target);
        var prodName = target.children[1].children[0].textContent;
        var prodIndex = cart.items.indexOf(prodName);
        cart.items.splice(prodIndex,1)
        cart.updateTotal();
        cart.saveCart()

    },
    "saveCart":function(){
        sessionStorage.setItem('tot_savedCart','')
        var testObj = {
            'products':[],
            'prices':[],
            'quantity':[],
            'images':[],
        }
        var cartItems = cartSectArea.children;
        for(let i=0; i < cartItems.length; i++){
            var itemValues = cartItems[i].children[1].children[1].textContent.split(" ");
            var quant = itemValues[0]
            var price = itemValues[2] + " " + itemValues[3]
            var product = cartItems[i].children[1].children[0].textContent;
            var prodImg = cartItems[i].children[0].src;

            testObj.products.push(product);
            testObj.prices.push(price);
            testObj.quantity.push(quant);
            testObj.images.push(prodImg)
        }       
        sessionStorage.tot_savedCart =JSON.stringify(testObj)
    },
    "updateTotal":function(){
        var cartItems = cartSectArea.children;
        var cartTotalDisp = document.getElementById('cart-total')
        var cartTotal = 0;
        var cartCount = document.getElementsByTagName('span')[0];

        for(let i =0; i < cartItems.length; i++){
             var itemValues = cartItems[i].children[1].children[1].textContent.split(" ");
             var quant = parseInt(itemValues[0]);
             var price = parseInt(itemValues[3].replace("$",""));

             cartTotal += quant * price
        }
        this.total = cartTotal;
        cartTotalDisp.textContent = "JMD " + "$" +this.total + ".00";
        cartCount.textContent = "Cart("+cartItems.length+")"
    }
}
const cartSectArea = document.getElementsByClassName('cart-area')[0];
const emptyCartprompt = document.getElementsByClassName('empty-cart')[0];
const checkout = document.getElementsByClassName('checkout')[0];
const removeBtn = document.getElementsByClassName('fa-trash')[0];


const observer = new MutationObserver(function() {
    if(cartSectArea.children.length >= 1){
        emptyCartprompt.style.display = "none";
        checkout.style.display ="block";
    }else{
        emptyCartprompt.style.display = "block";
        checkout.style.display ="none"
    }
});
observer.observe(cartSectArea, {subtree: true, childList: true});

var autoScrl; //Set interval var



//Phone Number test
function formatPhoneNumber(value){
    if(!value) return value;

    const phoneNumber = value.replace(/[^\d]/g,"");
    const phoneNumberLength = phoneNumber.length;

    if(phoneNumberLength < 4) return phoneNumber;
    if(phoneNumberLength < 7 ){
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;

    }
    else{
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,9)}`;
    }
}
function phoneNumberFormatter(){
    const numInput = document.getElementById("inputPhone");
    const formattedNum = formatPhoneNumber(numInput.value);
    numInput.value = formattedNum;

}




//Phone Number end





function main(){
    var $mobMenu = $('.menu-toggle');
    $('.cart-sect').hide()

    $mobMenu.on('click', ()=>{
        $('#menu-top').toggleClass('open-top');
        $('#menu-btm').toggleClass('open-bottom');
        $('#menu-txt').toggleClass('open-text');
        $('.nav-links').toggleClass('mobnav-open');
        $('.announce').toggle()
        $('.cart-sect').hide()

     
    })
    $('.cart-nav').on('click', ()=>{
        $('.cart-sect').toggle()
    }).on('mouseenter', ()=>{
        $('.cart-sect').show()
    })

    // Carousel Controls start
    $('.fa-chevron-right').on('click',()=>{
        slider.right();
        clearInterval(autoScrl);
        autoScrl = setInterval(function() {slider.right();}, 6000);
    });
    $('.fa-chevron-left').on('click',()=>{
        slider.left()
        clearInterval(autoScrl);
        autoScrl = setInterval(function() {slider.right();}, 6000);
    });


    //Carousel Controls End
    //Product Carousel Start
    var $prodSlide1 = $(".prod-slider");
    var $prodRight = $("#prodRight");
    var $prodLeft = $("#prodLeft")
    var currentScrl;
   
    $prodRight.on('click', ()=>{
        currentScrl = $prodSlide1.scrollLeft()
        currentScrl += 150
        $prodSlide1.scrollLeft(currentScrl)
    })
    $prodLeft.on('click', ()=>{
        currentScrl = $prodSlide1.scrollLeft()
        currentScrl -= 150
        $prodSlide1.scrollLeft(currentScrl)
    })
    $(window).on('scroll', ()=>{
        var scrlTopPos = $(window).scrollTop();

        if(scrlTopPos > 40){
            $('nav').css('position', 'fixed');
            $('nav').addClass('nav-scroll')
            $('.cart-sect').css('top', '115px')

        }else{
            $('nav').css('position', 'sticky');
            $('nav').removeClass('nav-scroll')

            $('.cart-sect').css('top', '142px')
        }
    }).on('load',()=>{
        if(window.location.pathname.includes('index.html')){
            autoScrl = setInterval(function() {slider.right();}, 6000);
        }else{
            clearInterval(autoScrl);  
        }

        if(sessionStorage.getItem('tot_savedCart') !== null){
            var savedCart = JSON.parse(sessionStorage.tot_savedCart);
            var numinCart = savedCart.images.length

            for(let i = 0; i < numinCart; i++){
                var prodImg = savedCart.images[i];
                var prodName = savedCart.products[i];
                var quantity = savedCart.quantity[i];
                var prodPrice = savedCart.prices[i]
                cart.addCart(prodImg, prodName,prodPrice,quantity);

            }
        }

    })
    //Product Carousel End
    //Test Scroll start
    $('#testLeft').on('click', ()=>{
        slider.test.right()
    })
    $('#testRight').on('click', ()=>{
        slider.test.left()
    })
    // Test Scroll End

    //Shop Sect
    var $incQuant = $('.fa-plus');
    var $decQuant = $('.fa-minus');
    var $addCart = $('.addItem');
    var $prodModal =$('.addCart-modal')
    var $viewMore = $('.viewDetails')

    $incQuant.on('click', (event)=>{
        var $itemCard =$(event.currentTarget).parent().parent();
        var input = $itemCard.find('input');
        var currVal = input.val();
        parseInt(currVal)
        currVal ++
        input.val(currVal)
    })

    $decQuant.on('click',(e)=>{
        var $itemCard =$(e.currentTarget).parent().parent();
        var input = $itemCard.find('input');
        var currVal = input.val();
        parseInt(currVal);
        if(currVal > 0){
            currVal--
            input.val(currVal)
        }
    });
    $viewMore.on('click', (e)=>{
        var $itemCard =$(e.currentTarget).parent();
        var prodName = $itemCard.find('h4').text();
        var prodPrice = $itemCard.find('h5').text();
        var prodImg = $itemCard.find('img').attr('src');
        //Set Modal Items
        $('.modal-img').find('img').attr('src', prodImg);
        $('.modal-info').find('h2').text(prodName);
        $('.modal-info').find('h3').text(prodPrice);
        $prodModal.show()
    })
    $addCart.on('click', (e)=>{
        var $itemCard =$(e.currentTarget).parent().parent();
        var input = $itemCard.find('input');
        var prodName = $itemCard.find('h2').text();
        var prodPrice = $itemCard.find('h3').text();
        var prodImg = $itemCard.find('img').attr('src');
        var quantity = parseInt(input.val())
        if(quantity >=1){
            cart.addCart(prodImg, prodName,prodPrice,quantity);
            $('.cart-sect').show()
            input.val('');
            $prodModal.hide()
        } 
    })
    $('.cart-sect').on('mouseleave', ()=>{
        $('.cart-sect').hide()
    })
   
    $('.shop-main').on('click', ()=>{
        $('.cart-sect').hide()

    })
    $('#closeModal').on('click',()=>{
        $prodModal.hide()
    });



    //Shop sect end
}




$(document).ready(main)