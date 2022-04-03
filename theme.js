import * as colors  from "https://deno.land/std@0.130.0/fmt/colors.ts";

export class Theme{
  static hexToRGB(hex){
    hex = this.validateHex(hex);
    let r = `${hex[0]}${hex[1]}`;
    let g = `${hex[2]}${hex[3]}`;
    let b = `${hex[4]}${hex[5]}`;
    r = parseInt(`0x${r}`);
    g = parseInt(`0x${g}`);
    b = parseInt(`0x${b}`);
    return {r,g,b};
  }
  static style(text,theme){
    if(!text || typeof text != "string")return;
    let txt = "";
    for(let c = 0; c < text.length; c++){
      let char = text[c];
      let thm = {
        "background": theme?.background instanceof Array ? theme.background[c % theme.background.length] : theme.background,
        "text": theme?.text instanceof Array ? theme.text[c % theme.text.length] : theme.text,
      };
      if(thm.background)char = colors.bgRgb24(char,this.hexToRGB(thm.background));
      if(thm.text)char = colors.rgb24(char,this.hexToRGB(thm.text));
      txt += char;
    }
    return txt;
  }
  static validateHex(hex){
    hex = new RegExp(/^\#?[a-f0-9]{6}$/ig).exec(hex);
    if(!hex)throw new SyntaxError("Invalid hex code");
    return hex[0].replace("#","");
  }
}