function colisao({ retangulo1, retangulo2 }) {
    return (
        retangulo1.attackBox.position.x + retangulo1.attackBox.width >=
        retangulo2.position.x &&
        retangulo1.attackBox.position.x <=
        retangulo2.position.x + retangulo2.width &&
        retangulo1.attackBox.position.y + retangulo1.attackBox.height >=
        retangulo2.position.y &&
        retangulo1.attackBox.position.y <= retangulo2.position.y + retangulo2.height
    )


}
function checarVencedor({player, enemy, timerId}){
    clearTimeout(timerId)
    document.getElementById('result').style.display = 'flex'
    if(player.health === enemy.health){
        document.getElementById('result').innerHTML = 'EMPATE!'

    } else if( player.health > enemy.health){
        document.getElementById('result').innerHTML = 'JOGADOR 1 GANHOU!'

    } else if(player.health < enemy.health){
        document.getElementById('result').innerHTML = 'JOGADOR 2 GANHOU!'

    }
    
}

let timer = 30;
let timerId;
function passaTempo(){
    
    if(timer > 0){
        timerId = setTimeout(passaTempo, 1000)
        timer--
        document.getElementById('tempo').innerHTML = timer
    }
    if(timer === 0 ){
        checarVencedor({player, enemy, timerId})
    }
}

let trocar = false
function restart(){
  trocar = true;
  timer = 30;
  player.dead = false;
  enemy.dead = false;
  player.health = 100;
  enemy.health = 100;
  player.position.x = 200
  player.position.y = 0;
  enemy.position.x = 800;
  enemy.position.y = 0;
  document.getElementById('result').style.display = 'none';
  document.getElementById('player2Health').style.width = '100%'
  document.getElementById('player1Health').style.width = '100%'
  passaTempo();
  trocar = false

}