const { Plugin } = require('powercord/entities');
const fs = require('fs');

/*const scripts = document.getElementsByTagName("scripts");
const src = scripts[scripts.length-1].src;*/

module.exports = class Robdab extends Plugin {
  startPlugin () {
    //const src = document.getElementsByTagName("scripts")[document.getElementsByTagName("scripts").length-1].src;


    //command to save a macro
    powercord.api.commands.registerCommand({
      command: "macro-save",
      aliases: ["savemacro"],
      description: "Save a message macro",
      usage: "{c} <Macro Name> <Message>",
      executor: (args) => ({
          send: false,
          result: ""+save(args[0], messageExtractor(args)),
      }),
    });

    //command to use a macro
    powercord.api.commands.registerCommand({
      command: "macro",
      description: "Send a message macro",
      usage: "{c} <Macro Name>",
      executor: (args) => ({
          send: true,
          result: ""+read(args[0]),
      }),
    });
  }
  
  pluginWillUnload () {
    powercord.api.commands.unregisterCommand("macro-save");
  }
};



function save(macroName, macroMessage){
  //Save a string of text to macros\macroName.txt
  
  //try to edit, and have catch to give user error message
  //return "Test Name: `"+macroName+"` Test Message: `"+macroMessage+"`";

  //writes to .txt file
  let data = macroMessage;
  fs.writeFile('C:/Users/sb748/powercord/src/Powercord/plugins/macro-messages/macros/'+macroName+'.txt', data, (err) => {
    //TODO: Get path instead of manually doing it. yeah
    if (err) throw err;
  })

  return "Macro `"+macroName+"` has been saved!";
}

function read(macroName){
  //Read a string of text from macros\macroName.txt
  fs.readFile('C:/Users/sb748/powercord/src/Powercord/plugins/macro-messages/macros/'+macroName+'.txt', (err, data) => {
    return data;
  })
  return data;
}

function deleteMacro(macroName){
  //Delete macros\macroName.txt
}

function rename(macroName, newMacroName){
  //copy macros\macroName.txt to macros\newMacroName.txt
  deleteMacro(macroName);
}

function list(){
  //list all macros
}

 function messageExtractor(args){
  //returns all but the 0th item in an array as a string of text
  let newMessage = args.slice(1);
  newMessage = newMessage.join(' ');
  return newMessage;
}

var currentScriptPath = function () {

  var scripts = document.querySelectorAll( 'script[src]' );
  var currentScript = scripts[ scripts.length - 1 ].src;
  var currentScriptChunks = currentScript.split( '/' );
  var currentScriptFile = currentScriptChunks[ currentScriptChunks.length - 1 ];

  return currentScript.replace( currentScriptFile, '' );
}