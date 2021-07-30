var $jscomp = $jscomp||{};
$jscomp.scope = {};
$jscomp.findInternal = function(a,b,c){
	a instanceof String&&(a = String(a));
	for(var d = a.length,e = 0;e<d;e++){
		var f = a[e];
		if(b.call(c,f,e,a)){
		 	return {i:e,v:f}
		}
	}
	return {i:-1,v:void 0}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;

$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties? Object.defineProperty : function(a,b,c){
	a != Array.prototype && a != Object.prototype&&(a[b] = c.value)
};
$jscomp.getGlobal = function(a){
	return "undefined" != typeof window && window === a? a : "undefined" != typeof global && null != global? global : a
};
$jscomp.global = $jscomp.getGlobal(this);

$jscomp.polyfill = function(a,b,c,d){
	if(b){
		c = $jscomp.global;
		a = a.split(".");
		for(d = 0;d<a.length-1;d++){
			var e = a[d];
			e in c||(c[e] = {});
			c = c[e]
		}
		a = a[a.length-1];
		d = c[a];
		b = b(d);
		b != d && null != b && $jscomp.defineProperty(c,a,{
			configurable:!0,
			writable:!0,
			value:b
		})
	}
};
$jscomp.polyfill("Array.prototype.find",function(a){
	return a ? a : function(a,c){
		return $jscomp.findInternal(this,a,c).v
	}
},"es6","es3");
function setActiveCarouselItem(a){
	$(a).find(".carousel-item:first").addClass("active")
}
function initTestimonialsCarousel(a){
	a = $(a);
	var b = a.attr("ID") + "-carousel";
	a.find(".carousel").attr("id",b);
	a.find(".carousel-controls a").attr("href","#"+b);
	a.find(".carousel-indicators li").attr("data-target","#"+b);
	setActiveCarouselItem(a)
}
var isBuilder = $("html").hasClass("is-builder");
if(isBuilder){
	$(document).on("add.cards",function(a){
		$(a.target).hasClass("testimonials-slider") && initTestimonialsCarousel(a.target)
	}).on("changeParameter.cards",function(a,b,c){
		"testimonialsSlides" === b && 0 == $(a.target).find(".carousel-item.active").length && setActiveCarouselItem(a.target)
	});
}else{
	"undefined" === typeof window.initTestimonialsPlugin && (window.initTestimonialsPlugin = !0,$(".testimonials-slider").each(function(){
		initTestimonialsCarousel(this)
	}));
}


