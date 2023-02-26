const monsters = {
    playerOn : {        
        position : {
            x: 200,
            y: 250
        },
        image : {
            src : './img/playerRight.png'
        },
        frames : {
            max : 4,
            hold : 30
        },
        animate : true,
        name : 'Player',
        attacks : [attacks.Punch, attacks.FireBall]        
    },
    monster : {
        position : {
            x: 600,
            y: 220
        },
        image : {
            src : './img/Pink_Monster.png'
        },
        frames : {
            max : 4,
            hold : 30
        },
        animate : true,
        isEnemy : true,
        name : 'Monster',
        attacks : [attacks.Punch, attacks.FireBall]
    } 
}