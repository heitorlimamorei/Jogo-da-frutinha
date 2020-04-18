function createGame() {
            const state ={
            players: {},
            fruits: {},
            screen: {
                width: 10,
                height: 10
            }
             }
             function start () {
                 const frequency = 2000

                 setInterval(addFruit, frequency)
             }
             function addPlayer(command) {
                 const playerId = command.playerId
                 const playerX = command.playerX
                 const playerY = command.playerY

                state.players[playerId] = {
                    x:playerX,
                    y:playerY
                } 
             }

             function removePlayer (command) {
                 const playerId = command.playerId

                 delete state.players[playerId]
             }
             
             function addFruit(command) {
                 const fruitId =command ? command.fruitId:Math.floor(Math.random() * 10000000 )
                 const fruitX =  command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
                 const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

                state.fruits[fruitId] = {
                    x:fruitX,
                    y:fruitY
                } 
               
             }

             function removeFruit(command) {
                 const fruitId = command.fruitId

                 delete state.fruits[fruitId]
             }
         

             function movePlayer (command) {
                console.log(` game.moveplayer() -> Moving ${command.playerId } with ${command.keyPressed}`)

                const acceptedMoves = {
                   ArrowUp(player) {
                       if(player.y -1 >= 0) {
                           player.y = player.y -1
                           return
                       }
                   },
                   ArrowRight(player) {
                       if(player.x  + 1 <state.screen.width ) {
                           player.x = player.x + 1 
                       }
                   },
                   ArrowDown(player) {
                       if (player.y + 1 < state.screen.height) {
                           player.y = player.y +1
                       }
                   },
                   ArrowLeft(player) {
                       if (player.x - 1 >= 0) {
                           player.x = player.x - 1
                       }
                   },
                   w(player) {
                       if (player.y -1 >= 0) {
                        player.y = player.y -1
                       }
                   },
                   d(player) {
                       if(player.x + 1 <state.screen.width) {
                           player.x = player.x + 1
                       }
                   },
                   s(player) {
                       if(player.x +  1 <state.screen.height) {
                           player.y = player.y + 1 
                       }
                   },
                   a(player) {
                       if(player.x - 1 >= 0) {
                          player.x = player.x - 1
                       }
                   }
                }
                  
               const keyPressed = command.keyPressed
               const playerId = command.playerId
               const player = state.players[playerId]
               const moveFunction = acceptedMoves[keyPressed]
               if ( player && moveFunction) {
                   moveFunction(player)
                   checkForFruitColision(playerId)
               }


             }

             function checkForFruitColision(playerId) {
                 
                     const player = state.players[playerId]

                     for (const fruitId in state.fruits) {
                         const fruit = state.fruits[fruitId]
                         console.log(`checking ${playerId} and ${fruitId}`)
                         if(player.x === fruit.x && player.y === fruit.y ) {
                             console.log(`COLLISON between ${playerId} and ${fruitId}`)
                             removeFruit({fruitId: fruitId})
                         }
                     }
                 }
             

             return {
                 addPlayer,
                 removePlayer,
                 movePlayer,
                 addFruit,
                 removeFruit,
                 state,
                 start

             }
 
         }