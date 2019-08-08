const devServices= require('../services/devservices')
const dev=new devServices()

  class devController {
      //addContact helps to insert contact n the database by taking contacts from the postman/any  and calling the devServices class
      //The Devservice class calls a method addDeveloper which primarily calls the database with the params given it.
      async addContact(req,res){
          const {name,email,cellphone}=req.body
          let {title}= req.body
        
    
          const params= {
              title,
              name,
              email,
              cellphone
          }
          if (isNaN(params.cellphone)) {
              return res.status(400).send({error:"please only insert a number into cellphone path"})
          }
          try {
              const newContact= await dev.addDeveloper(params)
              if (!newContact) {
                 return res.status(400).send({
                      code:400,
                      error:true,
                      message:"Cannot add Contact, please make sure you entered the require details{name,emails} ",
                      data:newContact
                  })
              }
              //generateAuthtoken is a mongoose method that was used under the model with a mongoose
              const token = await newContact.generateAuthtoken()
              return res.status(201).send({
                error: false,
                code: 200,
                message: 'Contact  added Succesfully',
                data: newContact,
                token
            })
          } catch (error) {
              res.status(500).send({
                    error:true,
                    message:"internal server error",
                    errormessage:error
                })
              }
          }
          //readContact helps to read all contact in the database by taking contacts from the postman/any  and calling the devServices class
      //The Devservice class calls a method readDeveloper which primarily calls the database.

          async readContact(req,res){
            try {
              const allContact= await dev.readDeveloper()
                if(!allContact){
                    res.status(404).send({
                        code:404,
                        message:'file not found',
                        error:true
                    })
                }
                res.status(200).send({
                    code:200,
                    data:allContact,
                    error:false,
                    message:"All contact found"
                })
            } catch (error) {
                res.status(500).send({
                    error:true,
                    code:500,
                    errormessage:error
                })
            }
          }

         // readContact helps to read  contact by categories the database by taking the title of the job as params.
          //The Devservice class calls a method readDeveloperByTitle which primarily calls the database with the params given it.
          async readContactByCategories(req,res){
            let {title}= req.body
            title= title.trim()
            const params = {title}
            
            
            // if (params.title!=='frontend developer'|| params.title!='backend developer'|| params.title!='devops engineer') {
            //     return res.status(400).send({
            //         code:400,
            //         error:"Bad request",
            //         message:"We probably dont have such employee position,or just check your input for correct spelling "
            //     })
            // }
            const contact = await dev.readDeveloperByTitle(params.title)
            try {
                if (contact.length===0) {
                    return res.status(404).send({
                        code:404,
                        error:true,
                        message:"no contact found,check your input for proper spacing,e.g('frontend developer')"
                    })
               }
            } catch (error) {
                res.status(500).send({
                    error:true,
                    code:500,
                    errormessage:error
                })
            }
        
            res.send(contact)
        }

     //updateDevContacts helps to update contact in the database by taking contacts from the postman/any other and calling the devServices class
      //The Devservice class calls a method updateDeveloper which primarily calls the database with the params given it.
       async updateDevContacts(req,res){
           const _id = req.params.id
           const {title,email,cellphone,name} = req.body
           const allowedUpdates ={
               title,
               email,
               cellphone,
               name
           }
           try {
            const updatedContact=await dev.updateDeveloper(_id,allowedUpdates)
            if(!updatedContact){
                return res.status(404).send({
                    code:404,
                    message:'file not found',
                    error:true,
                })
            }
            res.status(201).send({
             code:200,
             error:false,
             message:"Contact updated sucessfully",
             data:updatedContact

            })
           } catch (error) {
               res.status(500).send({
                   code:500,
                   error:false,
                   message:'Server error',
                   errormessage:error
               })
           }
    }

//deleteOneContact helps to delete contact from the database by taking the ObjectID as param from the postman/any other
//  and calling the devServices class
//The Devservice class calls a method readDeveloper which primarily calls the database with the params given it.
    async deleteOneContact(req,res){
        const _id= req.params.id
        try {
            const contact =await  dev.deleteOneContact(_id)
            if (!contact) {
                return res.status(404).send({
                    code:404,
                    error:true,
                    message:"no contact found,"
                })
            }
            res.status(200).send({
                code:200,
                error:false,
                message:"Contact deleted sucessfully",
                data:contact
        })
    }catch (error) {
            res.status(500).send({
                code:500,
                error:false,
                message:'internal Server error',
                errormessage:error
            })
        }
    }
    
   }

  
module.exports = devController