class ColorLib
{

	static #_pattern = {
		'rgb': /^rgb(a?)\( ?\d{1,3} ?, ?\d{1,3} ?, ?\d{1,3}(, ?[0-9\.]+)? ?\)$/i,
		'hsl': /^hsl(a?)\( ?\d{1,3} ?, ?\d{1,3}% ?, ?\d{1,3}%(, ?[0-9\.]+)? ?\)$/i,
		'hex': /^((#[0-9a-f]{3})|(#[0-9a-f]{6}))$/i
	}

	static #_tabHex = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,
		'b':11,'c':12,'d':13,'e':14,'f':15,'A':10,'B':11,'C':12,'D':13,'E':14,'F':15
	}

	static #_hueToRgb( m1, m2, hue)
	{
		if (hue < 0) hue += 1;
		if (hue > 1) hue -= 1;
	
		let result;
		if (hue < 1 / 6) {
		  	result = m1 + (m2 - m1) * hue * 6;
		} else if (hue < 1 / 2) {
		  	result = m2;
		} else if (hue < 2 / 3) {
		  	result = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
		} else {
		  	result = m1;
		}
	
		return Math.round(result * 255);
	  }

	static #_parseHex(numb){
		let ret = '';
		let getid = a=>{
			for(let i in ColorLib.#_tabHex){
				if(ColorLib.#_tabHex[i]===a) return i
			}
		}

		while(numb>=16){
			let res = numb %16 ;
			numb = (numb-res)/16 ;
			ret = getid(res) + ret
		}

		let final = getid(parseInt(numb)) + ret

		return final.length<2? '0'+final : final
	}

	static #_testAndGetRgb(color,colorObj)
	{
		if(color.length==1 ){
			color=color[0]
			
			color = color.replace(/ +/g,'')

			if(ColorLib.#_pattern['rgb'].test(color)){
				color=color.split(/\(|\)/)[1].split(',')
				color.forEach(dir=>{if(dir>255){
					throw ' les composantes RGB doivent êtres des entiers compris entre 0 et 255'
				}})
				
				colorObj.red=color[0]
				colorObj.green=color[1]
				colorObj.blue=color[2]
			}else{
				throw ' les composantes RGB doivent êtres des entiers compris entre 0 et 255'
			}
		}else if(color.length==3){
			color.forEach(dir=>{if(/\D+/.test(dir) || dir>255){
					throw ' les composantes RGB doivent êtres des entiers compris entre 0 et 255'
			}})
			
			colorObj.red=color[0]
			colorObj.green=color[1]
			colorObj.blue=color[2]
		}else{
			throw ' les composantes RGB doivent êtres des entiers compris entre 0 et 255'
		}
	}

	static hexToRgb(color)
	{
		if(!ColorLib.#_pattern['hex'].test(color)) throw ' format incorect, les couleur hex doivent êtres dans le format #RGB ou #RRGGBB';

		let red, green, blue ;
		color=color.replace(/^#/, "");
		if(color.length==3){
			color=color.split('');
			let hr=color[0];
			let hg=color[1];
			let hb=color[2];
			
			red=ColorLib.#_tabHex[hr]*17;
			green=ColorLib.#_tabHex[hg]*17;
			blue=ColorLib.#_tabHex[hb]*17;
			
		}else if(color.length ==6){
			let col=[];
			color.replace(/\w{2}/g, (m)=>{ col.push(m) });
			
			let hr=col[0].split('');
			let hg=col[1].split('');
			let hb=col[2].split('');
			
			red= ColorLib.#_tabHex[hr[0]]*16+ColorLib.#_tabHex[hr[1]];
			green= ColorLib.#_tabHex[hg[0]]*16+ColorLib.#_tabHex[hg[1]];
			blue= ColorLib.#_tabHex[hb[0]]*16+ColorLib.#_tabHex[hb[1]];
		}
		
		return `rgb(${red},${green},${blue})`;
	}

	static rgbToHsl(...colors)
	{
		let color = {};
		
		ColorLib.#_testAndGetRgb(colors,color);

		let r = color.red / 255, g = color.green / 255, b = color.blue / 255;
		let max = Math.max(r, g, b); 
		let min = Math.min(r, g, b);
		let delta = max-min ;
		let h ,s ,l
		if (max == min) {
			h = 0;
		} else if (max == r) {
			h = (60 * (g - b) / delta) % 360;
		} else if (max == g) {
			h = (120 + 60 * (b - r) / delta) % 360;
		} else if (max == b) {
			h = (240 + 60 * (r - g) / delta) % 360;
		}
		
		h = h<0? 360+h:h;

		l = 50 * (max + min)

		if (max == min) {
			s = 0;
		} else if (l < 50) {
			s = 100 * delta / (max + min);
		} else {
			s = 100 * delta / (2 - max - min);
		}

		return {
			objectComponent : {
				hue   : Math.round(h) ,
				saturation 	: Math.round(s) ,
				lightness  	: Math.round(l)
			},
			real:{
				hue   : h ,
				saturation 	: s ,
				lightness  	: l
			},
			stringColor: `hsl(${Math.round(h)},${Math.round(s)}%,${Math.round(l)}%)`
		}
		/*
			
		 */
	}
	
	static hslToRgb(hue, saturation, lightness)
	{
		
		hue = hue.toString().replace(/[^\.\d]/g,'');
		saturation = saturation.toString().replace(/[^\.\d]/g,'');
		lightness = lightness.toString().replace(/[^\.\d]/g,'');
		
		if(hue >359 || hue < 0){ 
			throw 'la tiente doit être un entier compris entre 0 et 359';
		}
		if(saturation >100 || saturation < 0){
			throw 'la saturation doit être un entier compris entre 0 et 100';
		}
		if(lightness >100 || lightness < 0){ 
			throw 'la legerté doit être un entier compris entre 0 et 100';
		}

		var h = hue / 360;
		var s = saturation / 100;
		var l = lightness / 100;

		var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
		var m1 = l * 2 - m2;
		var red = ColorLib.#_hueToRgb(m1, m2, h + 1 / 3);
		var green = ColorLib.#_hueToRgb(m1, m2, h);
		var blue = ColorLib.#_hueToRgb(m1, m2, h - 1 / 3);
		
		return `rgb(${red},${green},${blue})`;
		
	}

	static rgbToHex(...color)
	{
		let colors ={}
		ColorLib.#_testAndGetRgb(color,colors)
		
		let RR=ColorLib.#_parseHex(colors.red)
		let GG=ColorLib.#_parseHex(colors.green)
		let BB=ColorLib.#_parseHex(colors.blue)
	
		return `#${RR}${GG}${BB}`
	}

	static #_getBetween(min,max,value)
	{
		return value<min? min : value>max? max : value
	}

	static #_getColorType(color)
	{
		let type
		for(let i in ColorLib.#_pattern){
			if(ColorLib.#_pattern[i].test(color)){
				type = i;
				break;
			}
		}
		if(type ==null){
			throw ' veillez vérifier le format de la couleur '+
			'les format acceptés sont le RGB et le HEX'
		}
		return type
	}

	static #_getChangeable(color,type){
		
		if(type === "rgb"){
			let  param , rcolor={}
			
			switch(ColorLib.#_getColorType(color)){
				case 'rgb' : color = color; break
				case 'hsl' : 
					let phsl = color.split(/\(|\)/)[1].split(',')
					color = ColorLib.hslToRgb(phsl[0],phsl[1],phsl[2]) ; 
					break
				case 'hex' : color = ColorLib.hexToRgb(color) ; break
			}
			param = color.split(/\(|\)/)[1].split(',')
			
			rcolor.red = parseInt(param[0])
			rcolor.green = parseInt(param[1])
			rcolor.blue = parseInt(param[2])
			
			return rcolor
		}else if(type === 'hsl'){
			let rcolor={}
			switch(ColorLib.#_getColorType(color)){
				case 'hsl' : 
					color=color.split(/\(|\)/)[1].split(',')
					rcolor.hue = parseInt(color[0])
					rcolor.saturation = parseInt(color[1])
					rcolor.lightness = parseInt(color[2] )
					break
				case 'rgb' : rcolor = ColorLib.rgbToHsl(color).real ; break
				case 'hex' : rcolor = ColorLib.rgbToHsl(ColorLib.hexToRgb(color)).real ; break
			}
			return rcolor
		}
	}

	static #_stringColor(color,type,rtype)   
	{
		
		if(type === 'rgb'){
			let rcolor = `rgb(${color.red},${color.green},${color.blue})`
			
			switch(rtype){
				case 'rgb' : rcolor = rcolor; break
				case 'hsl' : rcolor = ColorLib.rgbToHsl(rcolor).stringColor ; break
				case 'hex' : rcolor = ColorLib.rgbToHex(rcolor) ; break
			}
			return rcolor
		}else if(type === 'hsl'){
			let rcolor = `hsl(${color.hue},${color.saturation}%,${color.lightness}%)`
			switch(rtype){
				case 'hsl' : rcolor = rcolor; break
				case 'rgb' : 
					rcolor = ColorLib.hslToRgb(color.hue,color.saturation,color.lightness) ; break
				case 'hex' : 
					let rgbcolor = ColorLib.hslToRgb(color.hue,color.saturation,color.lightness)
					rcolor = ColorLib.rgbToHex(rgbcolor); break
			}
			return rcolor
		}
	}

	static adjust(color,args)
	{
		let hasRgb , hasHsl , type = ColorLib.#_getColorType(color)

		hasRgb = (args.red !== undefined || args.green !== undefined || args.blue !== undefined );
		hasHsl = (args.hue !== undefined || args.saturation !== undefined || args.lightness !== undefined );
		if(hasHsl && hasRgb){
			throw ' veillez ne modifier qu\' un et un seul'+
			' type de propriété à la fois, ne pas modifier les rgb avec les hsl'
		}

		if(hasRgb){
			color = ColorLib.#_getChangeable(color,'rgb');
			for(let i in args){
				color[i] = ColorLib.#_getBetween(0,255,color[i]+args[i]); 
			}
			color = ColorLib.#_stringColor(color,'rgb',type)
		}
		else if(hasHsl){
			color=ColorLib.#_getChangeable(color,'hsl');
			for(let i in args){
				color[i] = ColorLib.#_getBetween(0,(i==='hue'? 359 : 100),color[i]+args[i]); 
			}
			color = ColorLib.#_stringColor(color,'hsl',type)
		}

		return color
	}

	static change(color,args)
	{
		let hasRgb , hasHsl , type = ColorLib.#_getColorType(color)

		hasRgb = (args.red !== undefined || args.green !== undefined || args.blue !== undefined );
		hasHsl = (args.hue !== undefined || args.saturation !== undefined || args.lightness !== undefined );
		if(hasHsl && hasRgb){
			throw ' veillez ne modifier qu\' un et un seul'+
			' type de propriété à la fois, ne pas modifier les rgb avec les hsl'
		}

		if(hasRgb){
			color = ColorLib.#_getChangeable(color,'rgb');
			for(let i in args){
				color[i] = ColorLib.#_getBetween(0,255,args[i]); 
			}
			color = ColorLib.#_stringColor(color,'rgb',type)
		}
		else if(hasHsl){
			color=ColorLib.#_getChangeable(color,'hsl');
			for(let i in args){
				color[i] = ColorLib.#_getBetween(0,(i==='hue'? 359 : 100),args[i]); 
			}
			color = ColorLib.#_stringColor(color,'hsl',type)
		}
		return color
	}

	static scale(color,args)
	{
		let type = ColorLib.#_getColorType(color) , hasRgb , hasHsl 

		hasRgb = (args.red !== undefined || args.green !== undefined || args.blue !== undefined );
		hasHsl = (args.hue !== undefined || args.saturation !== undefined || args.lightness !== undefined );
		if(hasHsl && hasRgb){
			throw ' veillez ne modifier qu\' un et un seul'+
			' type de propriété à la fois, ne pas modifier les rgb avec les hsl'
		} 

		if(hasRgb){
			let rcolor = ColorLib.#_getChangeable(color,'rgb');
			for(let i in args){
				rcolor[i] = ColorLib.#_getBetween(0,255,Math.round(rcolor[i]+rcolor[i]*args[i]/100)); 
			}
			color = ColorLib.change(color,rcolor)
		}
		else if(hasHsl){
			let rcolor=ColorLib.#_getChangeable(color,'hsl');
			for(let i in args){
				rcolor[i] = ColorLib.#_getBetween(0,(i==='hue'? 359 : 100),Math.round(rcolor[i]+rcolor[i]*args[i]/100)); 
			}
			color = ColorLib.change(color,rcolor)
		}

		return color
	}

	static get(color,prop)
	{
		let colorRGB = ColorLib.#_getChangeable(color,'rgb') 
		let colorHSL = ColorLib.#_getChangeable(color,'hsl') 

		if(prop==='rgb') return colorRGB
		if(prop==='hsl') return colorHSL

		
		return colorHSL[prop]?? colorRGB[prop]?? null
	}
	
	/**
	 * permet d'assombrir une couleur
	 * 
	 * @param String color la couleur cible
	 * @param Int amounts le pourcentage d'assombrissement
	 * @returns String la couleur assombrie
	 */
	static darken(color, amounts)
	{
	
		let pct = -1*parseFloat(amounts.toString().replace(/%/, ''))
		
		return ColorLib.adjust(color, {lightness : pct})
	
	}

	/**
	 * permet d'eclairer une couleur
	 * 
	 * @param String color la couleur cible
	 * @param Int amounts le pourcentage d'eclairage
	 * @returns String la couleur eclairée
	 */
	static lighten(color, amounts){
		
		let pct = parseFloat(amounts.toString().replace(/%/, ''))
		
		return ColorLib.adjust(color, {lightness : pct})
		
	}
	
	/**
	 * permet de desaturer une couleur
	 * 
	 * @param String color la couleur cible
	 * @param Int amounts le pourcentage dessaturage
	 * @returns String la couleur dessaturée
	 */
	static desaturate(color, amounts)
	{
	
		let pct = -1*parseInt(amounts.toString().replace(/%/, ''))
	
		return ColorLib.adjust(color, {saturation : pct})
	
	}

	/**
	 * permet de saturer une couleur
	 * 
	 * @param String color la couleur cible
	 * @param Int amounts le pourcentage dessaturage
	 * @returns String la couleur saturée
	 */
	static saturate(color, amounts)
	{
	
		let pct = parseInt(amounts.toString().replace(/%/, ''))
	
		return ColorLib.adjust(color, {saturation : pct})
	
	}

	static grayScale(color)
	{
		return ColorLib.change(color,{saturation:0})
	}

	static inverse(color)
	{
		let type = ColorLib.#_getColorType(color)
		color = ColorLib.#_getChangeable(color,'rgb');
		for(let i in color){
			color[i]=ColorLib.#_getBetween(0,255,255-color[i]) 
		}
		return ColorLib.#_stringColor(color,'rgb',type )
	}
}