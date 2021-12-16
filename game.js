class Main {
  constructor() {
    this.map = new Map()
    this.game = document.getElementById('game')
    this.header = document.querySelector('header')
    this.h1 = document.querySelector('h1')
    this.button = document.createElement('button')
    this.direction = ''
    this.win = false
    this.init()
    this.event()
  }

  init() {
    this.map.set("O", [])
    this.map.set("X", [])
  }

  event() {
    let player = 'O'

    this.game.addEventListener('click', event => {
      if(event.target.textContent !== '' || this.win)
        return

      event.target.textContent = player

      if(this.validates(player, event.target.id))
        return
        
      player = player === 'O' ? 'X' : 'O'
    })

    this.button.addEventListener('click', event => {
      this.restart()
    })
  }

  validates(player, id) {
    this.map.get(player).push(id)

    const moves = this.map.get(player).map(id => id.split('#')[0])

    if(moves.includes('0-0') && moves.includes('1-1') && moves.includes('2-2')) 
      return this.drawWin('0-0', '1-1', '2-2', 'inclined-right', player)

    if(moves.includes('2-0') && moves.includes('1-1') && moves.includes('0-2')) 
      return this.drawWin('2-0', '1-1', '0-2', 'inclined-left', player)

    if(moves.includes('0-0') && moves.includes('1-0') && moves.includes('2-0')) 
      return this.drawWin('0-0', '1-0', '2-0', 'horizontal', player)

    if(moves.includes('0-1') && moves.includes('1-1') && moves.includes('2-1')) 
      return this.drawWin('0-1', '1-1', '2-1', 'horizontal', player)

    if(moves.includes('0-2') && moves.includes('1-2') && moves.includes('2-2')) 
      return this.drawWin('0-2', '1-2', '2-2', 'horizontal', player)

    if(moves.includes('0-0') && moves.includes('0-1') && moves.includes('0-2')) 
      return this.drawWin('0-0', '0-1', '0-2', 'vertical', player)

    if(moves.includes('1-0') && moves.includes('1-1') && moves.includes('1-2')) 
      return this.drawWin('1-0', '1-1', '1-2', 'vertical', player)

    if(moves.includes('2-0') && moves.includes('2-1') && moves.includes('2-2'))
      return this.drawWin('2-0', '2-1', '2-2', 'vertical', player)

    if(player === 'O' && moves.length === 5) {
      this.h1.textContent = 'Empate'
      this.button.textContent = 'Reiniciar'
      this.header.appendChild(this.button)

      return true
    }
  }

  drawWin(p1, p2, p3, direction, player) {
    const a = document.getElementById(p1)
    const b = document.getElementById(p2)
    const c = document.getElementById(p3)

    a.classList.add(direction)
    b.classList.add(direction)
    c.classList.add(direction)
    
    this.h1.textContent = `O player ${player} venceu!`
    this.button.textContent = 'Reiniciar'
    this.header.appendChild(this.button)

    this.direction = direction

    return this.win = true
  }


  restart() {
    const spans = this.game.querySelectorAll('span')

    spans.forEach(span => {
      span.textContent = ''
      
      if(span.classList.contains(this.direction))
        span.classList.remove(this.direction)
    })

    this.header.removeChild(this.button)
    this.h1.textContent = ' 🎮 Jogo da Velha'

    this.direction = ''
    this.win = false
    this.map = new Map()
    this.init()
  }
}

new Main