const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

var logToFile = (textToLog)=>{
  fs.appendFile('server.log',textToLog+'\n',(err)=>{
    if(err){
      console.log('ERROR: unable to append to server.log !')
    }
  })
}

app.set('view engine','hbs')
app.use(express.static(__dirname + '/public'))
app.use((req,res,next)=>{
  var now = new Date().toString()
  var logMessage = `${now} :  ${req.method} ${req.url}`
  console.log(logMessage)
  logToFile(logMessage)
  next()
})
// app.use((req,res,next)=>{
//   res.render('maintenatnce.hbs')
// })
//

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})




app.get('/',(req,res)=>{
  res.render(('home.hbs'),{
    pageTitle: 'Home page',
    welcomeMessage : 'Welcome to nodejs',
    currentYear : new Date().getFullYear(),
    storyTeller : 'This is the basic website'
  })
})

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  })
})


app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'Projects page',
    projectsWelcome : 'Welcome to my projects',
    currentYear: new Date().getFullYear()
  })
})

app.listen(port,()=>{
  var logMessage = `server is up on port ${port}`
  console.log(logMessage)
  logToFile(logMessage)
})
