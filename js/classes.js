class Sprite{
    constructor({    position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        lado = { x: 0, y: 0 } })
        {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5 //aumentar o numero para diminuir a velocidade
        this.lado = lado

    }
    design() {
        c.drawImage(
            this.image,
            //mudança de frame da imagem de acordo com width
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            //pega o tamanho de cada frame
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x - this.lado.x, 
            this.position.y - this.lado.y,
            //poe a imagem na escala de acordo com o multiplicador escolhido para cada sprite 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
             
             )
       
    }

    animateFrames(){
         //processo de Animação por FRAME
         this.framesElapsed++
         //a cada 10 frames há troca uma vez que só numeros divisiveis por 8 vao ter o % = 0
         if(this.framesElapsed % this.framesHold === 0){
             if(this.frameCurrent < this.framesMax -1/* -1 para imagens unicas nao animarem*/) {
                 this.frameCurrent++;
             } else{
                 this.frameCurrent = 0;
             }
         }

    }
    update(){
        this.design();
        this.animateFrames();
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        lado = {
            x: 215,
            y:157
        },
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined
          
        }
     }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            lado

        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
          position: {
            x: this.position.x,
            y: this.position.y
          },
            lado: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false

        //Deixando disponivel os dois tipos de imagem (IDLE AND RUN) para alternar
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc

        }

    }
    /*design() {
        c.fillStyle =  this.color
        c.fillRect(this.position.x, this.position.y, this.width, 150);
        
        //attackBox
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
       
    }*/
    //criando metódo que altera o sprite caso as teclas de movimento sejam apertadas.

    update(){
        this.design();
        if(this.dead === false) this.animateFrames();


    // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.lado.x
        this.attackBox.position.y = this.position.y + this.attackBox.lado.y

    
        /* Desenha caixa do ataque
         c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
     )*/

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
          } else this.velocity.y += gravity
        }
        attack() {
            this.switchSprite('attack1')
            this.isAttacking = true
        }
        takeHit(){
            this.health -= 10;
            if(this.health <= 0 ){
                this.switchSprite('death')
            } else this.switchSprite('takeHit')
     
        }
        switchSprite(sprite){

            if(this.image === this.sprites.death.image && trocar === false){
                if(this.frameCurrent === this.sprites.death.framesMax - 1)
                this.dead = true;
            return

            }

            //atacando por cima de todas as outras animações.
            if(this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax -1)
               {
    
                return
               }
            //tomando hit por cima de todas as animações
            if(this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.framesMax -1){
                return
            } 
    
            switch(sprite){
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.frameCurrent = 0
                    }
                    
                    break
                case 'run':
                    if(this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image
                        this.framesMax = this.sprites.run.framesMax
                        this.frameCurrent = 0
                    }
    
                    break
                case 'jump':
                    if(this.image !== this.sprites.jump.image){
                        this.image = this.sprites.jump.image
                        this.framesMax = this.sprites.jump.framesMax
                        this.frameCurrent = 0
                    }
                    break
                case 'fall':
                    if(this.image !== this.sprites.fall.image){
                        this.image = this.sprites.fall.image
                        this.framesMax = this.sprites.fall.framesMax
                        this.frameCurrent = 0
                    }
                    break
                case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image = this.sprites.attack1.image
                        this.framesMax = this.sprites.attack1.framesMax
                        this.frameCurrent = 0
                    }
                    break
                case 'takeHit':
                    if(this.image !== this.sprites.takeHit.image){
                        this.image = this.sprites.takeHit.image
                        this.framesMax = this.sprites.takeHit.framesMax
                        this.frameCurrent = 0
                    }
                    break
                case 'death':
                    if (this.image !== this.sprites.death.image) {
                        this.image = this.sprites.death.image
                        this.framesMax = this.sprites.death.framesMax
                        this.framesCurrent = 0
                    }
                    break
    
            }
    
        }
}

