/*
Copyright (c) 2014 dissimulate at codepen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

var canvas=document.getElementById("canvas"); var cxt=canvas.getContext("2d"); function Dot(){     this.alive=true;this.x=Math.round(Math.random()*canvas.width);     this.y=Math.round(Math.random()*canvas.height);     this.diameter=Math.random()*10.8;     this.ColorData={Red:Math.round(Math.random()*255),Green:Math.round(Math.random()*255),Blue:Math.round(Math.random()*255)};     this.alpha=0.1;     this.color="rgba("+this.ColorData.Red+", "+this.ColorData.Green+","+this.ColorData.Blue+","+this.alpha+")";     this.velocity={x:Math.round(Math.random()<0.5?-1:1)*Math.random()*0.7,y:Math.round(Math.random()<0.5?-1:1)*Math.random()*0.7} } Dot.prototype={     Draw:function(){         cxt.fillStyle=this.color;cxt.beginPath();         cxt.arc(this.x,this.y,this.diameter,0,Math.PI*2,false);cxt.fill()     },     Update:function(){         if(this.alpha<0.8){             this.alpha+=0.01;             this.color="rgba("+this.ColorData.Red+", "+this.ColorData.Green+","+this.ColorData.Blue+","+this.alpha+")"         }         this.x+=this.velocity.x;         this.y+=this.velocity.y;         if(this.x>canvas.width+5||this.x<0-5||this.y>canvas.height+5||this.y<0-5){this.alive=false}     } }; var Event={     rArray:[],     Init:function(){         canvas.width=window.innerWidth;         canvas.height=window.innerHeight;         for(var x=0;x<150;x++){             this.rArray.push(new Dot())         }         this.Update()     },     Draw:function(){         cxt.clearRect(0,0,canvas.width,canvas.height);         this.rArray.forEach(function(dot){dot.Draw()})     },     Update:function(){         if(Event.rArray.length<150){             for(var x=Event.rArray.length;x<150;x++){Event.rArray.push(new Dot())}         }         Event.rArray.forEach(function(dot){dot.Update()});         Event.rArray=Event.rArray.filter(function(dot){return dot.alive});         Event.Draw();         requestAnimationFrame(Event.Update)     } }; window.onresize=function(){Event.rArray=[]; canvas.width=window.innerWidth; canvas.height=window.innerHeight}; Event.Init();
