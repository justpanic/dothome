
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position : {
        x:0,
        y:0
    },
    image : battleBackgroundImage
})

let playerOn
let monster
let renderedSprites
let battleAnimationId 
let queue

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogBox').style.display = 'none'
    document.querySelector('#enemyHealthBarDiv2').style.width = '100%'
    document.querySelector('#playerHealthBarDiv2').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    playerOn = new Monster(monsters.playerOn)
    monster = new Monster(monsters.monster)
    renderedSprites = [monster, playerOn]
    queue = []
    playerOn.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    // 버튼 이벤트
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e)=>{
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            playerOn.attack({
                attack : selectedAttack,
                recipient : monster, 
                renderedSprites
            })
    
            if(monster.health <= 0) {
                // 몬스터 패배 시 사라짐.
                queue.push(() => {
                    monster.faint()
                })            
                queue.push(() => {
                    // 전투 화면 패이드 아웃 후 기본화면으로.
                    gsap.to('#overlappingDiv', {
                        opacity : 1,
                        onComplete : () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            // 인터페이스 Div표시 비활성화
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity : 0
                            })
                            // 전투 종료처리
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
            }
    
            // 몬스터 공격 턴
            const randomAttack = monster.attacks[Math.floor(Math.random() * monster.attacks.length)]
            queue.push(() =>{
                monster.attack({
                    attack : randomAttack,   
                    recipient : playerOn, 
                    renderedSprites
                })
    
                if(playerOn.health <= 0) {
                    queue.push(() => {
                        playerOn.faint()
                    })
                    queue.push(() => {
                        // 전투 화면 패이드 아웃 후 기본화면으로.
                        gsap.to('#overlappingDiv', {
                            opacity : 1,
                            onComplete : () => {
                                cancelAnimationFrame(battleAnimationId)
                                animate()
                                // 인터페이스 Div표시 비활성화
                                document.querySelector('#userInterface').style.display = 'none'
                                gsap.to('#overlappingDiv', {
                                    opacity : 0
                                })
                                // 전투 종료처리
                                battle.initiated = false
                                audio.Map.play()
                            }
                        })
                    })
                }
            })        
        })
    
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackType').innerHTML = selectedAttack.type
            document.querySelector('#attackType').style.color = selectedAttack.color
        })
    })
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

animate()
//initBattle() 
//animateBattle()


document.querySelector('#dialogBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }    
})