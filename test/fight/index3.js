const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width, canvas.height)
const gravity = 0.7

const background = new Sprite({
    position : {
        x:0,
        y:0
    },
    imageSrc : './img/background.png'
})
const shop = new Sprite({
    position : {
        x:600,
        y:127
    },
    imageSrc : './img/shop_anim.png',
    scale : 2.75,
    frameMax : 6
})
const player = new Fighter({
    position : { x:0, y:0 },
    velocity : { x:0, y:0 },    
    imageSrc : './img/knight_idle.png',
    frameMax : 12,
    scale : 2,
    offset : {
        x: 0,
        y: 65
    },
    sprites : {
        idle : {
            imageSrc : './img/knight_idle.png',
            frameMax : 12
        },
        run : {
            imageSrc : './img/knight_run.png',
            frameMax : 8
        },
        jump : {
            imageSrc : './img/knight_jump2.png',
            frameMax : 4
        },
        fall : {
            imageSrc : './img/knight_fall.png',
            frameMax : 4
        },
        attack1 : {
            imageSrc : './img/knight_walk_attack.png',
            frameMax : 6
        },
        takeHit : {
            imageSrc : './img/knight_hurt.png',
            frameMax : 4
        },
        death : {
            imageSrc : './img/knight_death.png',
            frameMax : 5
        }
    },
    attackBox : {
        offset : {
            x:75,
            y:30
        },
        width : 120,
        height : 100
    }    
})

const enemy = new Fighter({
    position : { x:400, y:0 },
    velocity : { x:0, y:0 },
    color : 'blue',
    offset : { x: 0, y: 65 },
    imageSrc : './img/rogue_idle.png',
    frameMax : 6,
    scale : 2,
    sprites : {
        idle : {
            imageSrc : './img/rogue_idle.png',
            frameMax : 6
        },
        run : {
            imageSrc : './img/rogue_idle.png',
            frameMax : 6
        },
        jump : {
            imageSrc : './img/rogue_idle.png',
            frameMax : 6
        },
        fall : {
            imageSrc : './img/rogue_idle.png',
            frameMax : 6
        },
        attack1 : {
            imageSrc : './img/rogue_attack.png',
            frameMax : 6
        },
        takeHit : {
            imageSrc : './img/rogue_hurt.png',
            frameMax : 4
        },
        death : {
            imageSrc : './img/rogue_death.png',
            frameMax : 5
        }
    },
    attackBox : {
        offset : {
            x:100,
            y:75
        },
        width : 100,
        height : 70
    }     
})


const keys = {
    a : { pressed : false },
    d : { pressed : false },
    w : { pressed : false },
    ArrowRight : { pressed : false },
    ArrowLeft : { pressed : false },
    ArrowUp : { pressed : false }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255,0.1)'
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0    

    // player Movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    } 
        
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    } 


    // 겹침 (공격판정)
    if (
        rectangularCollision({
            rectangular1 : player,
            rectangular2 : enemy
        }) &&
        player.isAttacking && player.frameCurrent === 2
    ) {
        enemy.takeHit()
        player.isAttacking = false        
        //document.querySelector('#enemyHP').style.width = enemy.health + '%'
        gsap.to('#enemyHP', {
            width : enemy.health + '%'
        })

    }

    if (player.isAttacking && player.frameCurrent===2){
        player.isAttacking =false
    }

    // 겹침 (공격범위 - 2)
    if (
        rectangularCollision({
            rectangular1 : enemy,
            rectangular2 : player
        }) &&
        enemy.isAttacking && (enemy.frameCurrent===2 || enemy.frameCurrent===5)
    ) {
        player.takeHit()
        enemy.isAttacking = false        
        //document.querySelector('#playerHP').style.width = player.health + '%'
        gsap.to('#playerHP', {
            width : player.health + '%'
        })
    }

    if (enemy.isAttacking && (enemy.frameCurrent===2 || enemy.frameCurrent===5)){
        enemy.isAttacking = false
    }

    // k.o.
    if (enemy.health <= 0 || player.health <=0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if(!player.dead){
        switch (event.key) {
            case 'd' :
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a' :
                keys.a.pressed = true
                player.lastKey = 'a'
                break    
            case 'w' :
                player.velocity.y = -20
                player.lastKey = 'w'
                break
            case ' ' :  
                player.attack()
                break              
        }
    }

    if(!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight' :
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft' :
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break    
            case 'ArrowUp' :
                enemy.velocity.y = -20
                enemy.lastKey = 'ArrowUp'
                break  
            case 'ArrowDown' :
                enemy.attack()
                break    
        }
    }    
})

window.addEventListener('keyup', (event) => {
    // player keys
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
        case 'w' :
            keys.w.pressed = false
            break           
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp' :
            keys.ArrowUp.pressed = false
            break
    }
})