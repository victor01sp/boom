import Game from "./class/Game.js"

export default ()=>{

    if(!localStorage.getItem('nivel')) localStorage.setItem('nivel', 4)
    const GameMina = new Game(localStorage.getItem('nivel'))
    const alertModal = new AlertModal(document.getElementById('root'), 3)

    const ContentNivel   = document.querySelector('.div_v51KM span')
    const ContentButtons = document.querySelector('.div_YiQUb')
    const ContentButton  = document.querySelector('.div_421bP')
 
    const renderButton =()=>{ 
        GameMina.choose = rand(1, GameMina.nivel)
        
        ContentNivel.textContent = 'Nivel - ' + GameMina.nivel 
        ContentButtons.style = `--cols:${ GameMina.limite }; --w:${ GameMina.limite * 85 }px` 
        ContentButtons.innerHTML = [ ...Array(GameMina.nivel).keys() ].map(i => {
            return `
                <button class="button_Y71IO" data-id="${ ++i }">
                    <i class="${ i === GameMina.choose ? 'fa-solid fa-bomb' : 'fa-solid fa-clover' }"></i> 
                    <span>${ i }</span>
                </button>
            `
        }).join('')
    }

    ContentButtons.addEventListener('click', e => {
        const button = e.target.closest('.button_Y71IO')
        if(GameMina.gameOver) return
        if(button){
            
            button.classList.add('choose')
            const cant = ContentButtons.querySelectorAll('button.choose')

            if( GameMina.choose == button.dataset.id ){
                button.style.color = "#E79B9B"
                GameMina.gameOver = true

                alertModal.add({
                    message : 'Game Over',
                    color   : '#E79B9B',
                    keep: true
                })
 
            } else if(cant.length + 1 == GameMina.nivel) {
                const button = ContentButtons.querySelector('button:not(.choose)')
                button.classList.add('choose')
                button.style.color = "#82C9AC"
                GameMina.gameOver = true

                alertModal.add({
                    message : 'Felicidades',
                    color   : '#82C9AC',
                    keep: true
                })
            }
        }
    })

    ContentButton.addEventListener('click', e => {
        const button = e.target.closest('button')

        if(button){
            const action = button.dataset.action
            if(action == 'repeat') {
                GameMina.gameOver = false
                alertModal.clean()
                renderButton()
            } 
            if(action == 'before') {
                GameMina.gameOver = false
                GameMina.nivel--
                localStorage.setItem('nivel', GameMina.nivel)
                alertModal.clean()
                renderButton()
            }
            if(action == 'after') {
                GameMina.gameOver = false
                GameMina.nivel++
                localStorage.setItem('nivel', GameMina.nivel)
                alertModal.clean()
                renderButton()
            }
        }
    })

    
    

    // alertModal.show({
    //     message : 'este es un segundo mensaje de aviso',
    // })
 
    renderButton()
}
