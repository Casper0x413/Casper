import {rgb24,bgRgb24}  from "https://deno.land/std@0.130.0/fmt/colors.ts";
import {Theme} from "https://raw.githubusercontent.com/Casper0x413/Casper/main/theme.js";
import {Toolbox} from "https://raw.githubusercontent.com/Casper0x413/Casper/main/toolbox.js";

const rgb = {
  "background": bgRgb24,
  "text": rgb24
};

let victims = await fetch("https://raw.githubusercontent.com/Casper0x413/Casper/main/victims.json");
victims = await victims.json();

victims = victims.map(victim=>{
  victim.keywords = victim.keywords.map(keyword=>keyword.toLowerCase());
  victim.theme = Theme.style(victim.alias,victim.theme);
  return victim;
});

class Casper{
  static async error(message){
    console.log(`\x1b[F\x1b[2K${message} ${rgb.text("(error)",{"r":255,"g":0,"b":0})}`);
    await Toolbox.terminateConnection();
  }
  static async greet(){
    console.clear();
    console.log(`Casper v${this.version}`);
  }
  static async hack(victim){
    if(!victim || typeof victim != "string")Deno.exit();
    victim = this.search(victim);
    let isCasper = victim?.alias && victim.alias == "Casper0x413";
    victim = !victim?.alias ? {
      "alias": victim,
      "keywords": [],
      "theme": (()=>{
        let rgb = Theme.randomRGB();
        return Theme.style(victim,rgb);
      })()
    } : victim;
    this.greet();
    console.log(`${this.prompt} ${victim.theme}`);
    await Toolbox.obtainIPAddress();
    await Toolbox.establishingConnection();
    if(isCasper)return this.error("Hacking the creator is forbidden");
    let activePorts = await Toolbox.scanForOpenPorts();
    if(!activePorts)return this.error("Could not hack network");
    let activeExploits = await Toolbox.scanForExploits(activePorts);
    if(!activeExploits)return this.error("Could not hack network");
    await Toolbox.installRAT();
    await Toolbox.coverTracks();
    await Toolbox.terminateConnection();
  }
  static async init(){
    let uid = Date.now();
    this.greet();
    console.log("");
    await Toolbox.checkForUpdates();
    let updated_at = localStorage.getItem("updated_at");
    if(!updated_at || (Date.now() - updated_at) > (1000 * (60 ** 2) * 24)){
      await Toolbox.fetchUpdates();
      await Toolbox.updateDatabase();
      this.updateVersion();
    }
    setTimeout(()=>{
      this.greet();
      this.input();
    },2 ** 10);
  }
  static async input(){
    let victim = prompt(this.prompt);
    if(!victim)return this.input();
    switch(victim.toLowerCase()){
      case "exit":
      case "quit":
        Deno.exit();
        break;
      case "victims":
        this.victims();
        break;
      default:
        await this.hack(victim);
        break;
    }
    this.input();
  }
  static prompt = rgb.text("\nTarget >",{"r":0,"g":255,"b":0});
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
  static updateVersion(){
    let date = new Date();
    let version = this.version.split(".").map(v=>parseInt(v));
    let [major,minor,patch] = version;
    let update = Toolbox.randomNumber(Toolbox.randomNumber(2 ** 10) % 8) + 1;
    major += date.getDate() % 2 == 0 && date.getDay() % 2 == 0 ? 1 : 0;
    minor = version[0] == major ? ((date.getMinutes() % 2 == 0 || date.getSeconds() % 2 == 0) ? minor + update : minor) : 0;
    patch = version[0] == major && version[1] == minor ? patch + update : 0;
    this.version = `${major}.${minor}.${patch}`;
    localStorage.setItem("version",this.version);
    localStorage.setItem("updated_at",Date.now());
  }
  static version = localStorage.getItem("version") || "1.0.0";
  static victims(){
    victims.forEach(victim=>{
      console.log(victim.theme);
    });
  }
}

Casper.init();