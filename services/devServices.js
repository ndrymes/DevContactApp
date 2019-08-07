const Developer= require('../model/developer')
class devServices {
    addDeveloper(data){
     return Developer.create(data)
    }
}
module.exports=devServices