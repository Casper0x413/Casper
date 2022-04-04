import * as colors  from "https://deno.land/std@0.130.0/fmt/colors.ts";

export class Theme{
  static hexToRGB(hex){
    hex = this.validHex(hex);
    if(!hex)return;
    let r = `${hex[0]}${hex[1]}`;
    let g = `${hex[2]}${hex[3]}`;
    let b = `${hex[4]}${hex[5]}`;
    r = parseInt(`0x${r}`);
    g = parseInt(`0x${g}`);
    b = parseInt(`0x${b}`);
    return {r,g,b};
  }
  static randomStaticRGB(...range){
    let randomNumber = this.randomNumberFromRange(...range);
    return {
      "r": randomNumber,
      "g": randomNumber,
      "b": randomNumber
    }
  }
  static randomNumberFromRange(min=0,max=0){
    let n1 = parseInt(min);
    let n2 = parseInt(max);
    if(isNaN(n1) || isNaN(n2))throw new TypeError("Invalid number");
    min = Math.min(n1,n2);
    max = Math.max(n1,n2);
    return Math.floor(Math.random() * ((max - min) + 1) + min);
  }
  static randomRGB(){
    let theme = {}
    theme.background =  this.randomDynamicRGB(255);
    let dark = this.randomNumberFromRange(0,128);
    let light = this.randomNumberFromRange(128,255);
    let total = theme.background.r + theme.background.b + theme.background.b;
    let score = 0;
    for(let color in theme.background)score += theme.background[color] > 128 ? theme.background[color] : 0;
    theme.text = {
      "r": 100 * (score / total) < 50 ? light : dark,
      "g": 100 * (score / total) < 50 ? light : dark,
      "b": 100 * (score / total) < 50 ? light : dark
    }
    return theme;
  }
  static randomDynamicRGB(...range){
    return {
      "r": this.randomNumberFromRange(...range),
      "g": this.randomNumberFromRange(...range),
      "b": this.randomNumberFromRange(...range)
    }
  }
  static style(text,theme){
    // make compatible with both hex and rgb
    if(!text || typeof text != "string")return;
    let txt = "";
    for(let c = 0; c < text.length; c++){
      let char = text[c];
      let bg = theme?.background instanceof Array ? theme.background[c % theme.background.length] : theme?.background;
      let tx = theme?.text instanceof Array ? theme.text[c % theme.text.length] : theme?.text;
      if(this.validHex(bg))bg = this.hexToRGB(bg);
      if(this.validHex(tx))tx = this.hexToRGB(tx);
      if(this.validRGB(bg))char = colors.bgRgb24(char,bg);
      if(this.validRGB(tx))char = colors.rgb24(char,tx);
      txt += char;
    }
    return txt;
  }
  static validHex(hex){
    hex = new RegExp(/^\#?[a-f0-9]{6}$/ig).exec(hex);
    if(!hex)return;
    return hex[0].replace("#","");
  }
  static validRGB(rgb){
    if(!rgb || typeof rgb != "object")return;
    let {r,g,b} = rgb;
    if(r < 0 || r > 255)return;
    if(g < 0 || g > 255)return;
    if(b < 0 || b > 255)return;
    return rgb;
  }
}