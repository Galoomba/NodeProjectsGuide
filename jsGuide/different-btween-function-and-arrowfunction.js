/**
 * The difference btweem the function and the arrow function is the scope
 * the arrow function doesn't have a scope for itself
 */

let enemy = "dummy"

const kilwa = function (enemy) {
    this.enemy = enemy
    
    return {
        enemy:"sa",
        //here the this.enemy will refere to the line above where we changed the enemy value
        printKilwaEnemy : function () {
            //will print sa
            console.log(this.enemy)
        }
    }
}


const gon = enemy => {
    this.enemy = enemy

    return {
        enemy: "dsasa",
        //but here it's still focuse on here parent scope the the changing in the value won't 
        //effect the printed result 
        printGonEnemy: () => {
            // will print ginzo 
            console.log(this.enemy)
        }
    }
}


kilwa("silver").printKilwaEnemy()
gon("ginzo").printGonEnemy()