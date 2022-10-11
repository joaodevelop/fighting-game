const canvas = document.querySelector('Canvas');
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'imgs/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: 'imgs/shop.png',
    scale: 2.75,
    framesMax: 6
});

const player = new Fighter({
    position: {
      x: 200,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 0
    },
    imageSrc: 'imgs/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 157
    },
    sprites: {
        idle: {
            imageSrc: 'imgs/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: 'imgs/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'imgs/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: 'imgs/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: 'imgs/samuraiMack/Attack1.png',
            framesMax: 6
        },
            
        takeHit: {
            imageSrc: 'imgs/samuraiMack/Take hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: 'imgs/samuraiMack/Death.png',
            framesMax: 6

        }
    },
    attackBox: {
        offset : {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    }
  })
const enemy = new Fighter({
    position: {
        x: 800,
        y: 100

    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    lado: {
        x: -50,
        y: 0
    },
    imageSrc: 'imgs/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    lado:{
        x: 200,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: 'imgs/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: 'imgs/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'imgs/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: 'imgs/kenji/Fall.png',
            framesMax: 2
            
        },
        attack1: {
            imageSrc: 'imgs/kenji/Attack1.png',
            framesMax: 4

        },  
        takeHit: {
            imageSrc: 'imgs/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: 'imgs/kenji/Death.png',
            framesMax: 7

        }
    },
    attackBox: {
        offset : {
            x: -160,
            y: 50
        },
        width: 150,
        height: 50
    }
})

console.log(player);

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    }
  }

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    shop.update();
    c.fillStyle =  'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update()

    //player movement
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    } else{
        player.switchSprite('idle')

    }
    //animação de pular player
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
      } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
      }
    //enemy movement
    
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }
    //jump
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
      } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
      }

    //detectar colisao
    if( colisao({retangulo1: player, retangulo2: enemy}) && player.isAttacking && player.frameCurrent === 4){
        enemy.takeHit()
        player.isAttacking = false;
        //document.getElementById('player2Health').style.width = enemy.health + '%';
        gsap.to('#player2health', {
          width: enemy.health + '%'
        })
        
        
    }

 //ATAQUE ERRADO
    if(player.isAttacking && player.frameCurrent === 4 ){
        player.isAttacking = false
    }

    //colisao player 2
    if( colisao({retangulo1: enemy, retangulo2: player}) && enemy.isAttacking && enemy.frameCurrent === 2){
        player.takeHit()
        enemy.isAttacking = false
        //document.getElementById('player1Health').style.width = player.health + '%';
        gsap.to('#player1Health', {
          width: player.health + '%'
        })

    }
 //ATAQUE ERRADO
    if(enemy.isAttacking && enemy.frameCurrent === 2 ){
        enemy.isAttacking = false
    }

    //GAME OVER based on HP
    if(enemy.health <= 0 || player.health <= 0){
        checarVencedor({player, enemy, timerId})

    }

}

passaTempo();

animate();

window.addEventListener('keydown', (event) => {
    if(!player.dead){
      switch (event.key) {
        case 'd':
          keys.d.pressed = true
          player.lastKey = 'd'

          break
        case 'a':
          keys.a.pressed = true
          player.lastKey = 'a'
          break
        case 'w':
          if(player.position.y >=330){
            player.velocity.y = -20


          }
          break

        case ' ':
          player.attack()
          break
      
    }
  }
    if(!enemy.dead){
      switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          enemy.lastKey = 'ArrowRight'
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          enemy.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
          if(enemy.position.y >= 330){
            enemy.velocity.y = -20

          }
          break

        case 'ArrowDown':
          enemy.attack()
  
          break
      }

    } 
  })
  
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }
  
    // enemy keys
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
})