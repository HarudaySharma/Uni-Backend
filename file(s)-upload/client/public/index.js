const fileInput = document.getElementsByName('gallery');
const gallery = document.getElementById('gallery');

console.log('script loaded');
function populateGallery(data) {
    if(!Array.isArray(data))
        return;
    data.forEach((filename) => {
        const img = document.createElement('img');
        img.src = `http://localhost:42010/${filename}`;
        img.alt = 'gallery';
        img.height = '240px';
        img.width = '240px';
        gallery.append(img);
    })
}


document.getElementById('show-gallery')
    .addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if(fileInput[0])
                formData.append('gallery', fileInput[0].files);
            console.log(formData);
            const res = await fetch('http://localhost:42010/api/gallery')
            if(!res.ok){
                console.log(res);
            }
            const data = await res.json();
            console.log(data);
            populateGallery(data);
        }
        catch(err) {
            console.error(err);
        }
    }) 
