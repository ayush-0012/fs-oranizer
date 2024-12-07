import fs, { readdirSync } from "fs"
import path from "path"
import { utility } from "./utility.js";
import { types } from "util";
import { createDiffieHellmanGroup } from "crypto";

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

  let destPath
  if(dirPath === undefined){
    console.log("kindly enter a valid directory");
    return 
  }else{

    let doesExist = fs.existsSync(dirPath)
    if(doesExist){
       destPath = path.join(dirPath , "organized_files")

       if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      
    }else{
      console.log("kindly enter correct path");
      return 
    }

  }

  organzieHelper(dirPath, destPath)

}

function organzieHelper(src , dest){
  const childNames = readdirSync(src)
  // console.log(childNames);

  for(let i= 0 ;  i < childNames.length; i++){
    let childAdress = path.join(src, childNames[i])
    let isFile = fs.lstatSync(childAdress).isFile()
    if(isFile){
      let category = getCategory(childNames[i])
      // console.log(childNames[i], "belongs to this category -->>", category);
      sendFiles(childAdress, dest, category )
    }
  }

}

function sendFiles(srcFilePath, dest, category){
  let catergoryPath = path.join(dest, category)
  console.log(catergoryPath);

  
  if(fs.existsSync(catergoryPath) === false){
    
    fs.mkdirSync(catergoryPath)
  }
  let fileName = path.basename(srcFilePath)
  let destFilePath = path.join(catergoryPath, fileName)
  fs.copyFileSync(srcFilePath, destFilePath)
  fs.unlinkSync(srcFilePath)
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
