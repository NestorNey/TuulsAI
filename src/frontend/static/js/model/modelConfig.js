modelsType = document.querySelectorAll('.barSelector .type')

modelsType.forEach(type => {
    type.addEventListener('click', e =>{
        modelsType.forEach(type => {
            type.classList.remove('selected')
            document.getElementById(type.textContent).style.display = 'none'
        })
        type.classList.toggle('selected')
        document.getElementById(type.textContent).style.display = 'flex'
    })
});