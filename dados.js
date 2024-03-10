const cube = document.querySelector('.cube');
const time = 6;
const diceAudio = new Audio('./sound/Ruleta.mp3'); // Replace with your audio path

cube.addEventListener('click', () => {
    cube.style.transition = '';
    cube.style.transform = `translateY(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;/**cambio de 300 a 400 */
    setTimeout(() => {
        cube.style.transition = `transform ${time}s`;
        const randomValue = Math.floor((Math.random() * 6) + 1);
        console.log(`randomValue: ${randomValue}` );
        
        switch(randomValue) {
            case 1:             
                cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`; /**cambio de 400 a 300 */
                break;
            case 2:
                cube.style.transform = `translateY(200px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 3:
                cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 4:
                cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                break;
            case 5:
                cube.style.transform = `translateY(200px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 6:
                cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                break;
        }
            
        diceAudio.play(); // Play the sound even for non-dice faces (optional)
        
          
    }, time * 10);


});