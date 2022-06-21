/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array("assets/images/Arrow_04.png",
            "assets/images/Arrow_06.png",
            "assets/images/arrow-left-bottom.png",
            "assets/images/arrow-left-top.png",
            "assets/images/arrow-right-bottom.png",
            "assets/images/arrow-right-top.png",
            "assets/images/arrow-x-axis.svg",
            "assets/images/arrow-y-axis.svg",
            "assets/images/drag-btn-active.svg",
            "assets/images/check-icn.svg",
            "assets/images/drag-btn-horizontal.svg",
            "assets/images/drag-btn-vertical.svg",
            "assets/images/graph.png",
            "assets/images/hook.svg",
            "assets/images/logo.png",
            "assets/images/logo.svg",                    
            "assets/images/oscillation.png",
            "assets/images/phone-portrait-pngrepo-com.png",
            "assets/images/slider-btn-active.svg",
            "assets/images/slider-btn-normal.svg", 
            "assets/images/spring.svg",
            "assets/images/spring.png",
            "assets/images/texture.svg",
            "assets/images/theme-icon-outline-left.svg",
            "assets/images/theme-icon-outline-right.svg",
            "assets/images/watermark-1.png",
            "assets/images/watermark-2.png",
            "assets/images/weight.svg"
			);

/*--Audio--*/
var audioPreloadArray = [];
$(document).ready(function(){
    
});
//Html is bydefault added to html
//generatePreloader();
setTimeout(function(){
  preloadImages();
},50)

function generatePreloader()
{
  var preloaderhtml = `<div class="preloader">
  <div class="preloadpanel">
     <div class="preloadingInstr">
         <div class="progress"></div>
         <div class="progress-text">
             Loading ... 100%
         </div>
     </div>
 </div> 
</div>`
  $("body").append(preloaderhtml)
}

function preloadImages(){
    imagePreCount = 0;
    for(var pId = 0; pId < imgPreloadArray.length; pId++)
    {
        var img = new Image();
        img.onload = imagePreloaded;
        img.src = imgPreloadArray[pId];
    }
}
function imagePreloaded(){
    imagePreCount++;
    var percentageload = Number((imagePreCount/imgPreloadArray.length*100).toFixed(0))
    $(".preloader .progress-text").text("Loading..." + percentageload + "%")
    if(imagePreCount == imgPreloadArray.length)
    {
        setTimeout(function(){
          $(".preloader").remove();
        },50);
    }
}
