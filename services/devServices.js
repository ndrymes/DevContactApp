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
    async updateDeveloper(_id,data){
        const newContact= await Developer.findByIdAndUpdate({_id},{$set:data})
    return newContact;
    }

    async deleteOneContact(_id){
        const contact = await Developer.findByIdAndDelete(_id)
        return contact
    }
}
module.exports=devServices