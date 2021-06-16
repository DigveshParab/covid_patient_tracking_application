const { json } = require('express')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const requests = require('requests')
const views_path = path.join(__dirname,'/templates/views')


//fetching data



app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.set('view engine','ejs')
app.set('views',views_path)

app.get('/',(req,res)=>{
    res.render('searchbar')
})

// app.get('/',(req,res)=>{
//     requests('https://api.covidtracking.com/v1/states/current.json')
//     .on('data',  (chunk) => {
//         const data = JSON.parse(chunk)
//         const arraydata = [...data]
//         const singled = arraydata.find((itm)=>itm.state === "AL")
//         const{state,positive,negative,recovered,death,totalTestResults,hospitalized}=singled
//         // console.log(state,positive,negative,recovered,death,totalTestResults,hospitalized);
//         // res.json(arraydata)
//         res.render('index',{state,positive,negative,recovered,death,totalTestResults,hospitalized})
        
//     })
//     .on('end',  (err) => {
//       if (err) return console.log('connection closed due to errors', err);
     
//       console.log('end');
//     })
    
// })

app.post('/search',(req,res)=>{
    const searched = req.body.search
    requests('https://api.covidtracking.com/v1/states/current.json')
    .on('data',  (chunk) => {
        const data = JSON.parse(chunk)
        const arraydata = [...data]
        const singled = arraydata.find((itm)=>itm.state === searched)
        const{state,positive,negative,recovered,death,totalTestResults,hospitalized,lastUpdateEt}=singled
        // console.log(state,positive,negative,recovered,death,totalTestResults,hospitalized);
        // res.json(arraydata)
        res.render('index',{state,positive,negative,recovered,death,totalTestResults,hospitalized,date:lastUpdateEt})
        
    })
    .on('end',  (err) => {
      if (err) return console.log('connection closed due to errors', err);
     
      console.log('end');
    })
})


app.listen(port,()=>{
    console.log(`listening at ${port}`);
})