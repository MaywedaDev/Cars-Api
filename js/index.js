
const fileUploader = document.getElementById("file-upload")
const fileGetter = document.getElementById('fileGetter')

fileUploader.addEventListener('click', () => {
    console.log('Clicked');

    fileGetter.click()
})

fileGetter.addEventListener('change', (e) => {


    if(!e.target.files || e.target.files.length == 0){
        return;
    }
    const img = document.createElement("img")
    const url = URL.createObjectURL(e.target.files[0])

    img.src = url

    while(fileUploader.firstChild){
        fileUploader.firstChild.remove()
    }

    fileUploader.appendChild(img)
    
})


