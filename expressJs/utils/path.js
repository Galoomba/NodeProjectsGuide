//make a path util for easy navigate 
const path =require('path')
//get the root project directory 
const rootDir=path.dirname(process.mainModule.filename)


/**
 * return the project root dir url 
 */
module.exports.rootDir=rootDir

/**
 * return the views dir url 
 */
module.exports.viewsDir=path.join(rootDir,'views')

/**
 * return the public dir url 
 */
module.exports.publicDir=path.join(rootDir,'public')

/**
 * Concat the the path of the desired dir  
 * using the Path join.apply() 
 * NOTE:no need to require the path anymore in other files
 * @param  {...string} paths the paths it supposed to concat 
 * @returns {string} the desired path
 */
module.exports.pathJoin=(...paths)=>{
    //used join.apply to concat the args array
    return path.join.apply(null,paths)
    //Another way is no not use the apply cain method and use spread opreator 
   // return path.join(...paths)
}