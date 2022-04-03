import {Theme} from "https://raw.githubusercontent.com/Casper0x413/Casper/main/theme.js";

let victims = await fetch("https://raw.githubusercontent.com/Casper0x413/Casper/main/victims.json");
victims = await victims.json();

victims = victims.map(victim=>{
  victim.keywords = victim.keywords.map(keyword=>keyword.toLowerCase());
  victim.theme = Theme.style(victim.alias,victim.theme);
  return victim;
});

class Casper{
  static greet(){
    console.log(`Casper v${this.version}\n`);
  }
  static hack(victim){
    if(!victim || typeof victim != "string")return console.log("[HACK] failed");
    victim = this.search(victim);
    victim = !victim?.alias ? {
      "alias": victim,
      "keywords": [],
      "theme": Theme.style(victim,{"background": "#00ff00", "text": "#000000"})
    } : victim;
    console.log(victim.theme);
  }
  static search(alias){
    if(!alias || typeof alias != "string")return;
    let pending = null;
    for(let victim of victims){
      if(!victim?.alias)continue;
      if(alias.toLowerCase() == victim.alias.toLowerCase() || victim.keywords.includes(alias.toLowerCase())){
        pending = victim;
        break;
      }
    }
    return pending || alias;
  }
  static version = "1.0.0";
}

Casper.greet();

victims.forEach(victim=>{
  Casper.hack(victim.alias);
});