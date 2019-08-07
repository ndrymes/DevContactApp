const Developer= require('../model/developer')
class devServices {
    addDeveloper(data){
     return Developer.create(data)
    }
    async readDeveloper(){
        const allContact= await Developer.find()
        return allContact
    }
    async readDeveloperByTitle(title){
        const contact = await Developer.find({title})
        return contact
        
        
    }
}
module.exports=devServices