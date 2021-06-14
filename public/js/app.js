console.log('client app.js')



const form = document.querySelector('form')
const locationField = document.querySelector('input')
const h3 = document.querySelector('h3')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    h3.innerText = 'Loading...'

    const url = `http://localhost:3000/weather?address=${locationField.value}`
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            let output = ''
           if(data.error)
               output = data.error
            else
                output = `Temprature - ${data.temprature}`
            h3.innerText = output
        })
    })

})