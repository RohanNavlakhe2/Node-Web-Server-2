//This file demonstrates the usage if hbs (Handlebars) templates engine to server dynammic content

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const provideLatLng = require('./utils/geocode')
const provideForcast = require('./utils/weather')
const app = express()

//Heroku provides the port value in this variable
//We provide 3000 if we're running on our local machine becoz
// in this case we won't have any value in process.env.PORT variable
const port = process.env.PORT || 3000
const log = console.log


const publicDirPath = path.join(__dirname,'../public')
const templatesPath = path.join(__dirname,'../templates/views')
const hbsPartialsPath = path.join(__dirname,'../templates/partials')

//set template engine
app.set('view engine','hbs')
//set 'templates' directory in place of default 'views' directory to contain our .hbs files
app.set('views',templatesPath)

//set hbs partials path
hbs.registerPartials(hbsPartialsPath)

//serve public dir (this contains the static files like css,js,images)
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{title:"Weather",footerText:"weatherstack.com"})
})

app.get('/contact',(req,res) => {
    res.render('contact',{mobile:"9993033712",title: "Contact us",footerText: "Contact page footer"})
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(address){
        provideLatLng(encodeURIComponent(address),(err,{lat,lng,place} = {})=>{
            if(err)
                return res.send({error:err})
            provideForcast(lat,lng,(err,data)=>{
                if(err)
                    return res.send({error:err})
                data.place = place
                return res.send(data)
            })
        })
    }else
      res.send({error:'address is mandatory'})
})

app.get('/contact/*',(req,res)=>{
    res.render('404',{error:"User contact not avbl"})

})

app.get('*',(req,res)=>{
    res.render('404',{error:"Page not found"})

})

app.listen(port,()=>{
    log("server started at "+port)
})