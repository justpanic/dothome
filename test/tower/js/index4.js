const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1280
canvas.height = 768
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

const placementTiles = []
placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            // add building placement tile
            placementTiles.push(
                new PlacementTile({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            )
        }
    })
})


const image = new Image()
image.onload = () => {
    animate()
}
image.src = "./img/tower2.png"

const enemies = []
function spawnEnemies(spawnCount) {
    for (let i = 1; i < spawnCount + 1; i++) {
        const xOffset = i * 150
        enemies.push(
            new Enemy({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
            })
        )
    }
}



const buildings = []
let activeTile = undefined
let enemyCount = 3
let hearts = 10
let coins = 100
const explosions = []
spawnEnemies(enemyCount)

function animate() {
    const animationId = requestAnimationFrame(animate)
    c.drawImage(image, 0, 0)

    // 타켓 이미지 업데이트, 사라짐, 사망설정
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()

        if (enemy.position.x > canvas.width) {
            hearts -= 1
            enemies.splice(i, 1)
            document.querySelector('#hearts').innerHTML = hearts

            if (hearts === 0) {
                console.log('game over')
                cancelAnimationFrame(animationId)
                document.querySelector('#gameOver').style.display = 'flex'
            }
        }
    }


    for (let i = explosions.length - 1; i >= 0; i--){
        const explosion = explosions[i]
        explosion.draw()
        explosion.update()
        if(explosion.frames.current >= explosion.frames.max - 1){
            explosions.splice(i, 1)
        }
        console.log(explosions)
    }


    // 타겟 모두 제거 시 다시 스폰
    if (enemies.length === 0) {
        enemyCount += 2
        spawnEnemies(enemyCount)
    }

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    buildings.forEach((building) => {
        building.update()
        building.target = null
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.center.x
            const yDifference = enemy.center.y - building.center.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]

        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]
            projectile.update()
            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            // 거리가 투사체 지름+타겟지름과 같아지면(접촉시) 
            if (distance < projectile.enemy.radius + projectile.radius) {
                // 타겟 체력 감소 및 체력 0 이하 시 제거 
                projectile.enemy.health -= 20
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1)
                        coins += 25
                        document.querySelector('#coins').innerHTML = coins
                    }
                }
                explosions.push(new Sprite({
                    position: { x: projectile.position.x, y: projectile.position.y },
                    imageSrc: './img/explosion.png',
                    frames: { max: 4 },
                    offset: { x: 0, y: 0 }
                }))
                // 투사체 사라짐
                building.projectiles.splice(i, 1)
            }
        }
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    // 포탑 활성화할 수 있는 지역에 클릭할 경우
    if (activeTile && activeTile.isOccupied && coins - 50 >= 0) {
        coins -= 50
        document.querySelector('#coins').innerHTML = coins
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }))
    }
    activeTile.isOccupied = true
    buildings.sort((a, b) => {
        return a.position.y - b.position.y
    })
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (
            mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size
        ) {
            activeTile = tile
            break
        }
    }
})
