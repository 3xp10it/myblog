/**
 * Created by outer on 2016/10/24.
 */
var container = new Array("linklist");

var objects = new Array();
var links = new Array();
var tmp = new Array();
var interval = 0;
var c=0;

function initEventListener()
{
    for(i=0; i < container.length; i++)
    {
        objects[i] = document.getElementById(container[i]).getElementsByTagName("a");

        for(j=0; j < objects[i].length; j++)
        {
            if(document.all)
            {
                objects[i][j].attachEvent("onmouseover", resetLinkFade);
                objects[i][j].attachEvent("onmouseout", startLinkFade);
            } else {
                objects[i][j].addEventListener("mouseover", resetLinkFade, false);
                objects[i][j].addEventListener("mouseout", startLinkFade, false);
            }

            var defcol = getPseudoRule(container[i], "a");
            var hovcol = getPseudoRule(container[i], "a:hover");

            if(defcol.charAt(0) == "#")
                defcol = hex2rgb(defcol);
            else if(defcol[0] == "r") //its a color with the type rgb(r, g, b)
            {
                defcol = defcol.match(/rgb\((\d+), (\d+), (\d+)\)/);
                defcol = defcol.slice(1);
            }

            if(hovcol.charAt(0) == "#")
                hovcol = hex2rgb(hovcol);
            else if(hovcol[0] == "r") //its a color with the type rgb(r, g, b)
            {
                hovcol = hovcol.match(/rgb\((\d+), (\d+), (\d+)\)/);
                hovcol = hovcol.slice(1);
            }

            links[c]					= new Array();
            links[c]["object"]		= objects[i][j];
            links[c]["defaultcolor"]	= defcol;
            links[c]["currentcolor"]	= defcol;
            links[c]["hovercolor"]	= hovcol;

            c++;
        }
    }
}

function resetLinkFade(e)
{
    var evt = e || window.event;
    var obj = evt.target || evt.srcElement;

    for(r=0; r<links.length; r++)
    {
        if(obj == links[r]["object"])
        {
            tmp = links[r]["defaultcolor"].clone();
            links[r]["currentcolor"] = links[r]["defaultcolor"];
            links[r]["object"].style.backgroundColor = rgb2hex(links[r]["hovercolor"]);
        }
    }
}

function startLinkFade(e)
{
    var evt = e || window.event;
    var obj = evt.target || evt.srcElement;

    for(r=0; r<links.length; r++)
    {
        if(obj == links[r]["object"])
        {
            links[r]["defaultcolor"] = tmp.clone();
            links[r]["currentcolor"] = links[r]["hovercolor"].clone();
            links[r]["object"].style.backgroundColor = rgb2hex(links[r]["hovercolor"]);
        }
    }

    if(interval == 0)
        interval = window.setInterval(linkFade,  30);
}

function linkFade()
{
    var runners = 0;
    for(o=0; o<links.length; o++)
    {
        var aim		= links[o]["object"];
        var defcol	= links[o]["defaultcolor"];
        var hovcol	= links[o]["hovercolor"];
        var actcol	= links[o]["currentcolor"];

        if( defcol[0]+defcol[1]+defcol[2] != actcol[0]+actcol[1]+actcol[2] )
        {
            runners++;
            /*
             var r_dif = Math.ceil((defcol[0]-hovcol[0])/20);
             var g_dif = Math.ceil((defcol[1]-hovcol[1])/20);
             var b_dif = Math.ceil((defcol[2]-hovcol[2])/20);

             actcol[0] =  actcol[0]-defcol[0] < r_dif ? defcol[0] : parseInt(actcol[0])+r_dif;
             actcol[1] =  actcol[1]-defcol[1] < g_dif ? defcol[1] : parseInt(actcol[1])+g_dif;
             actcol[2] =  actcol[2]-defcol[2] < b_dif ? defcol[2] : parseInt(actcol[2])+b_dif;
             */
            actcol[0] = actcol[0]-10 < 25 ? 25 : actcol[0]-10;
            actcol[1] = actcol[1]-10 < 25 ? 25 : actcol[1]-10;
            actcol[2] = actcol[2]-10 < 25 ? 25 : actcol[2]-10;

            //document.getElementById("debug").innerHTML += "r: "+actcol[0]+" g: "+actcol[1]+" b:"+actcol[2]+" | hex: "+rgb2hex(actcol);

            aim.style.backgroundColor = rgb2hex(actcol);
            links[o]["currentcolor"] = actcol;
        }
    }

    if(runners == 0)
    {
        window.clearInterval(interval);
        interval=0;
    }
}

function getPseudoRule(parent, element)
{
    var mysheet = document.styleSheets[0];
    var myrule  = mysheet.cssRules || mysheet.rules;

    for (n = 0; n < myrule.length; n++)
        if (myrule[n].selectorText.toLowerCase() == "#"+ parent +" "+ element)
            return myrule[n].style.backgroundColor;
        else if (myrule[n].selectorText.toLowerCase() == element)
            return myrule[n].style.backgroundColor;

    return "";
}

function hex2rgb(hex)
{
    var triplet = hex.toLowerCase().replace(/#/, '');
    var rgbArr  = new Array();

    if(triplet.length == 6)
    {
        rgbArr[0] = parseInt(triplet.substr(0,2), 16)
        rgbArr[1] = parseInt(triplet.substr(2,2), 16)
        rgbArr[2] = parseInt(triplet.substr(4,2), 16)

        return rgbArr;
    }
    else if(triplet.length == 3)
    {
        rgbArr[0] = parseInt((triplet.substr(0,1) + triplet.substr(0,1)), 16);
        rgbArr[1] = parseInt((triplet.substr(1,1) + triplet.substr(1,1)), 16);
        rgbArr[2] = parseInt((triplet.substr(2,2) + triplet.substr(2,2)), 16);

        return rgbArr;
    }
    else
    {
        throw triplet + ' is not a valid color triplet.';
    }
}

/*
 function fadeToHex(goalHex, steps){
 var nowHex = myCO.getRGB();
 var nowRGB = hex2rgb(nowHex);
 var goalRGB = hex2rgb(goalHex);
 var stepRGB = {};
 stepRGB.r = (goalRGB.r-nowRGB.r)/steps;
 stepRGB.g = (goalRGB.g-nowRGB.g)/steps;
 stepRGB.b = (goalRGB.b-nowRGB.b)/steps;
 var inc = 0
 onEnterFrame = function(){
 if(inc<steps){
 var newR = (Math.round(nowRGB.r+=stepRGB.r));
 var newG = (Math.round(nowRGB.g+=stepRGB.g));
 var newB = (Math.round(nowRGB.b+=stepRGB.b));
 var newHex = rgbToHex(newR, newG, newB);
 myCO.setRGB(newHex);
 inc++;
 }else{
 myCO.setRGB(goalHex);
 onEnterFrame = null;
 }
 }
 }
 */

function rgb2hex(rgb)
{
    var hexcolors = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f")
    var r, r1, r2, g, g1, g2, b, b1, b2;

    r1 = Math.floor(rgb[0] / 16);
    r2 = rgb[0] - r1*16;

    g1 = Math.floor(rgb[1] / 16);
    g2 = rgb[1] - g1*16;

    b1 = Math.floor(rgb[2] / 16);
    b2 = rgb[2] - b1*16;

    r = hexcolors[r1] + hexcolors[r2];
    g = hexcolors[g1] + hexcolors[g2];
    b = hexcolors[b1] + hexcolors[b2];

    return "#"+r+g+b;
}

Object.prototype.clone = function(deep) {
    var objectClone = new this.constructor();
    for (var property in this)
        if (!deep)
            objectClone[property] = this[property];
        else if (typeof this[property] == 'object')
            objectClone[property] = this[property].clone(deep);
        else
            objectClone[property] = this[property];
    return objectClone;
}

initEventListener();
