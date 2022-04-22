# Installation
This is how to install and run the script
1. Install [Deno](https://deno.land/) before proceeding further installation.
2. You must clone this repository
3. In the terminal run ```deno install -A mod.js``` inside the cloned directory
4. Run the script using ```casper``` inside the terminal

# Updating
## Manual
In the terminal run ```deno cache --reload mod.js``` inside the cloned directory.

***PRO***
- Allows you to control when everything should be cached for faster load times

***CON***
- Must be manually done anytime the script needs updating

## Automatic
Navigate to the ```.deno``` directory and look for files labeled ```Casper``` and ```Casper.cmd```. Open both files and add ```"--reload"``` right after ```"run"```. Both scripts should start off with ```deno "run" "--reload" "--allow-all"``` followed by the path to the script.

***PRO***
- Allows you to stay up-to-date anytime the script is ran

***CON***
- Provides slower load times

## Casper Commands
- ```exit```
- ```quit```
- ```victims```