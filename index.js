import fs, { readdirSync } from "fs"
import path from "path"
import { utility } from "./utility.js";
import { types } from "util";

// console.log(utility);

let inputArr = process.argv.slice(2);

const command = inputArr[0];

switch(command){
  case "tree":
    treeFn(inputArr[1])
    break;
  case "organize": 
   organizeFn(inputArr[1])
   break
  case "help" :
    helpFn()
    break
}

function treeFn(dirPath){
console.log("your tree folder is organized" , dirPath);
}






function organizeFn(dirPath){
  //we'll get dir path in command
  let destPath
  if(dirPath === undefined){
    console.log("kindly enter a valid directory");
    return 
  }else{

    let doesExist = fs.existsSync(dirPath)
    if(doesExist){
       destPath = path.join(dirPath , "oraganized_files")

      if(doesExist === false){
        
        fs.mkdirSync(destPath)
        // console.log("already organized");
      }
    }else{
      console.log("kindly enter correct path");
      return 
    }

  }
  //filtering the files acc to their extensions
  //a folder wll get created after sorting with fs.createfile ig
  //then move the files into the respective folder
  organzieHelper(dirPath, destPath)

}

function organzieHelper(src , dest){
  //1. will take src folder and map all the files
  const childNames = readdirSync(src)
  console.log(childNames);

  for(let i= 0 ;  i < childNames.length; i++){
    let childAdress = path.join(src, childNames[i])
    let isFile = fs.lstatSync(childAdress).isFile()
    if(isFile){
      let category = getCategory(childNames[i])
      console.log(childNames[i], "belongs to this category -->>", category);
      // console.log(childNames[i], "belongs to this ext -->>", childAdress );
    }
  }
  //2. filter out every file and create new folder for a particular type of file 
  //3. move the common files into their respective folder
}

function getCategory(name){
  let ext = path.extname(name)
  ext = ext.slice(1)

  const types = utility.types

  for(let type in types){
    let currTypesArr = types[type]
    for(let i=0; i<currTypesArr.length; i++){
      if(ext === currTypesArr[i]){
        return type
      } 
    }
  }

  return "others"
}






function helpFn(){
 console.log(`
  List of help commands: 
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node mian.js help
  
  `);
}
