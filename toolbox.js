import {rgb24,bgRgb24}  from "https://deno.land/std@0.130.0/fmt/colors.ts";

const rgb = {
  "background": bgRgb24,
  "text": rgb24
};

let coder = new TextEncoder();

class Scan{
  constructor(config){
    config = Object.assign({},config);
    config.animation = config?.animation ? config.animation : "dots";
    config.count = config?.count ? parseInt(config.count) : 0;
    config.delay = config?.delay ? parseInt(config.delay) : 0;
    config.total = config?.total ? parseInt(config.total) : 0;
    config.throttle = config?.throttle ? config.throttle : "default";
    if(!config.animation || typeof config.animation != "string")throw new TypeError("animation must be a string");
    if(isNaN(config.count))throw new TypeError("count must be a number");
    if(isNaN(config.delay))throw new TypeError("delay must be a number");
    if(isNaN(config.total))throw new TypeError("total must be a number");
    if(!config.throttle || typeof config.throttle != "string")throw new TypeError("throttle must be a string");
    this.animation = config.animation;
    this.count = config.count;
    this.delay = config.delay;
    this.total = config.total;
    this.throttle = config.throttle;
  }
  animate = {
    "dots": ()=>".".repeat(this.count % 4),
    "outof": ()=>`${this.count}/${this.total}`
  };
  complete(message){
    Deno.stdout.write(coder.encode(`\x1b[2K${message} ${rgb.text("(complete)",{"r":0,"g":255,"b":0})}\n\r`));
    return;
  }
  run(message,cb){
    if(this.count >= this.total)return cb(this.complete(message));
    this.count += this.#throttle[this.throttle]();
    Deno.stdout.write(coder.encode(`\x1b[2C\x1b[2K${message}${this.animation != "dots" ? " " : ""}${this.animate[this.animation]()}\r`));
    setTimeout(()=>this.run(message,cb),Toolbox.randomNumber(this.delay));
  }
  #throttle = {
    "default": ()=>1,
    "ports": ()=>Toolbox.randomNumber(this.count > (this.total / (2 * 2)) ? 256 : this.count > (this.total / (2 * 4)) ? 128 : this.count > (this.total / (2 * 8)) ? 64 : this.count > (this.total / (2 * 16)) ? 32 : 16)
  };
}

export class Toolbox{
  static randomNumber(min=0,max=0){
    let n1 = parseInt(min);
    let n2 = parseInt(max);
    if(isNaN(n1) || isNaN(n2))throw new TypeError("Invalid number");
    min = Math.min(n1,n2);
    max = Math.max(n1,n2);
    return Math.floor(Math.random() * ((max - min) + 1) + min);
  }
  static async checkForUpdates(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 3)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Checking for updates`,()=>{
        resolve();
      });
    });
  }
  static async coverTracks(){
    let success = this.randomNumber(2 ** 10);
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 4,2 ** 6)
    });
    return new Promise((resolve,reject)=>{
      scan.run("Covering up tracks",()=>{
        resolve();
      });
    });
  }
  static async establishingConnection(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 3)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Establishing connection`,()=>{
        resolve();
      });
    });
  }
  static async fetchUpdates(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 1,2 ** 4)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Fetching updates`,()=>{
        resolve();
      });
    });
  }
  static async installRAT(){
    let success = this.randomNumber(2 ** 10);
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 4,2 ** 6)
    });
    return new Promise((resolve,reject)=>{
      let message = "Attempting to install R.A.T.";
      scan.run(message,()=>{
        if(success % 4 == 0)console.log(`\x1b[F\x1b[2K${message} ${rgb.text("(failed)",{"r":255,"g":0,"b":0})}`);
        resolve();
      });
    });
  }
  static async obtainIPAddress(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 3)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Obtaining IP address`,()=>{
        resolve();
      });
    });
  }
  static async scanForExploits(ports){
    let active = this.randomNumber(ports / 2);
    let exploits = this.randomNumber(2 ** 10);
    let scan = new Scan({
      "animation": "outof",
      "delay": ports * (2 ** 6),
      "total": ports
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Checking ${ports} active ports for vulnerabilities`,()=>{
        resolve(active);
      });
    });
  }
  static async scanForOpenPorts(){
    let ports = 2 ** 16 - 1
    let active = this.randomNumber(ports / (2 ** 11));
    let scan = new Scan({
      "animation": "outof",
      "total": ports,
      "throttle": "ports"
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Scanning ports`,()=>{
        resolve(active);
      });
    });
  }
  static async terminateConnection(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 3)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Terminating connection`,()=>{
        resolve();
      });
    });
  }
  static async updateDatabase(){
    let scan = new Scan({
      "animation": "dots",
      "delay": 2 ** 10,
      "total": this.randomNumber(2 ** 1,2 ** 4)
    });
    return new Promise((resolve,reject)=>{
      scan.run(`Updating database`,()=>{
        resolve();
      });
    });
  }
}