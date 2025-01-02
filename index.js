const RoboCar = ['./image/blue.png', './image/white.png', './image/black.png'];
const CarAdjustment = [0,20, 50, 30, 60,80];
const SetTiming = [500,1000,2000,3000, 4000];
const stater_page  = document.getElementById('stater_page')
const AnimeCar = document.getElementById('AnimeCar');
const stater_button = document.getElementById('staterbutton')
let UserCar = document.getElementById('Road');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let Level_Check = 4;
let second_check=0;




const GameFunctions = {
    CarPrev:function(){
        console.log('cliked')
    let currentRight = parseFloat(UserCar.style.right) || 17;
    currentRight += 10;
    console.log(currentRight)
    UserCar.style.right = currentRight + '%';
    },
    CarNext:function()
    {
        let currentRight = parseFloat(UserCar.style.right) || 17;
    currentRight -= 10;
    console.log(currentRight)
    UserCar.style.right = currentRight + '%';
    },
    Checkout:function(object, car)
    {
        const objRect = object.getBoundingClientRect();
        const carRect = car.getBoundingClientRect();
    
        const overlap =
            objRect.left < carRect.right &&
            objRect.right > carRect.left &&
            objRect.top < carRect.bottom &&
            objRect.bottom > carRect.top;
    
        if (overlap) {
            console.log('Collision Detected!');
            window.location.reload();
        }
    },

    
    AnimeMove:function(Anime)
    {
        const AnimeMOveInterval = setInterval(() => {

            let cuuretTop = parseFloat(Anime.style.top) || 0
            this.Checkout(Anime,UserCar);
            cuuretTop += 1;
            if (cuuretTop >= 90) {
                clearInterval(AnimeMOveInterval);
                Anime.remove()
            }
            Anime.style.top = cuuretTop + '%';
            
        }, 50)
    },
    AnimeRobotCar:function()
    {
        const TimeInterval = setInterval(() => {
            second_check++;
            console.log(Level_Check)
            if(second_check==5)
            {
                Level_Check =3;
            }
            else if(second_check==7)
            {
                Level_Check=2;
            }
            else if(second_check==13)
            {
                Level_Check=1;
            }
            else if(second_check==15)
            {
               Level_Check=0;
            }
            let RoboCarDiv = document.createElement('div')
            let RoboCarImg = document.createElement('img')
            let RandomImage = Math.floor((Math.random() * (3)));
            let RandomPosition = Math.floor(Math.random() * (6));
            RoboCarDiv.style.width = 15 + '%'
            RoboCarImg.setAttribute('src', RoboCar[RandomImage]);
            RoboCarImg.style.width = 100 + '%';
            RoboCarImg.style.height = 100 + '%';
            RoboCarImg.style.objectFit = 'cover';
            RoboCarDiv.style.position = 'absolute';
            RoboCarDiv.style.left = CarAdjustment[RandomPosition] + '%';
            RoboCarDiv.style.top = 0 + '%';
            RoboCarDiv.appendChild(RoboCarImg);
            document.body.appendChild(RoboCarDiv)
            this.AnimeMove(RoboCarDiv)
        }, 
    1800    
    )
    },

}


prev.addEventListener('click', GameFunctions.CarPrev);
next.addEventListener('click', GameFunctions.CarNext);

stater_button.addEventListener('click' , ()=>{
    stater_page.style.display = 'none'
    
    
    GameFunctions.AnimeRobotCar();
    })

