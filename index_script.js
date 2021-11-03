window.onload = function() {
    $("#bigPlane").attr("height", "30%");
    $("#bigPlane").attr("width", "auto");
    function makePlane(){
        let plane = $("<img>").attr("src","plane.png");
        plane.attr("height","40px");
        plane.attr("width","100px");
        plane.css({
            'top': Math.floor(Math.random() * (window.innerHeight-300))+100 + "px",
            'height':'40px',
            'width':'100px',
            'position': 'absolute',
            'left':'-200px',
            'animation-name': 'plane_ani',
            'animation-duration': '10s',
            'animation-timing-function': 'linear'
            
        });
        plane.addClass("plane");
        $("#ani").append(plane);
    }
    
    function makePlaneOBJ(){
        setInterval(makePlane, 10000);
    }
    
    makePlaneOBJ();
    setTimeout(makePlaneOBJ, 2000);
    setTimeout(makePlaneOBJ, 4000);
    setTimeout(makePlaneOBJ, 6000);
    setTimeout(makePlaneOBJ, 8000);
}




