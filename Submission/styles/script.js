$(document).ready(function(){
    $(window).scroll(function(){
         //untuk menghidupkan dan mematikan navbar
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }
        else{
            $('.navbar').removeClass("sticky");
        }
        //untuk menghidupkan dam mematikan tombol UP
        if(this.scrollY > 500){
            $('.scroll-upbtn').addClass("show");
        }else{
            $('.scroll-upbtn').removeClass("show");
        }
    })
});
    //untuk fungsi clik dari tombol UP
    $('.scroll-upbtn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });