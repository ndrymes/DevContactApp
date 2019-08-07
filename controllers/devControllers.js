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
          try {
              const newContact= await dev.addDeveloper(params)
              if (!newContact) {
                  res.status(400).send({
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
      }
  
  module.exports = devController