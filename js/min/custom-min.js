$(document).ready(function(){function t(t,o){return Math.floor(Math.random()*o)+t}function o(){$(".gortion").each(function(){var t=$(this).hasClass("assigned");t||($(this).addClass("assigned"),$(this).html("<a class='grey' href='#'></a>"))})}var a=150,e=[];$("h1").each(function(){var t=$(this).html(),o=t.replace(/\s+/g,"-").toLowerCase();$(this).attr("id",o),e.push([t,o])});var r=$(window).outerHeight(),s=$(window).outerWidth();if(s>=460){var h=$("header").outerHeight(),n=r-h;verticalBoxes=Math.floor(n/a),horizontalBoxes=Math.floor(s/a),totalBoxes=horizontalBoxes*verticalBoxes,$("#gort").width(horizontalBoxes*a).height(verticalBoxes*a);var l="<div class='gortion'></div>",d=e.length,g=totalBoxes-d;for(i=0;totalBoxes>i;i++)$("#gort").append(l);var c=["green","orange","blue","purple","yellow","red"];for(i=0;i<e.length;){var f=t(1,totalBoxes),u=t(0,6),v="<a class='"+c[u]+"' href='#"+e[i][1]+"'>"+e[i][0]+"</a>";$("#gort .gortion:nth-child("+f+")").hasClass("assigned")||($("#gort .gortion:nth-child("+f+")").addClass("assigned"),$("#gort .gortion:nth-child("+f+")").html(v),i++,i==e.length&&o())}}$(document).on("click","#gort a",function(t){t.preventDefault();var o=$(this).attr("href");$("html, body").animate({scrollTop:$(o).offset().top-60},500)})});