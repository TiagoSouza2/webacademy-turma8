const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */

const alts = {
  'pic1.jpg' : 'Hinata Hyuuga adolescente',
  'pic2.jpg' : 'Neji Hyuuga criança',
  'pic3.jpg' : 'Himawari Uzumaki criança',
  'pic4.jpg' : 'Tsunade Senju criança',
  'pic5.jpg' : 'Hinata Hyuuga criança'
}

/* Looping through images */

images.forEach((imageName) => {
    const newImage = document.createElement('img');
    const imagePath = `images/${imageName}`;  
    
    newImage.setAttribute('src', imagePath);
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', imagePath);
    });
    
    thumbBar.appendChild(newImage);
  });

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    const currentClass = btn.getAttribute('class');

    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } 
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});