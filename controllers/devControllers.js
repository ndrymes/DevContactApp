const devServices= require('../services/devServices')
const dev=new devServices()

  class devController {
      async addContact(req,res){
          const {title,name,email,cellphone}=req.body
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
              const token = await newContact.generateAuthtoken()
              return res.status(201).send({
                error: false,
                code: 200,
                message: 'Contact  added Succesfully',
                data: newContact,
                token
            })
          } catch (error) {
            console.log('This error occured', error),
              res.status(400).send({
                    error:true,
                    message:"internal server error",
                    errormessage:error
                })
              }
          }

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
             console.log('errromessage',error);
             
            }
          }

          async readContactByCategories(req,res){
            const {title}= req.body
            const params = {title}
            const contact = await dev.readDeveloperByTitle(params.title)
            if (contact.length===0) {
                 return res.status(404).send({
                     code:404,
                     error:true,
                     message:"no contact found"
                 })
            }
            res.send(contact)
        }
      }
  
  module.exports = devController