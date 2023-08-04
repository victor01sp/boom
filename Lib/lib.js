//Generar numero Aleatorio
const rand = (min, max = false) => {

    if(!parseInt(max)){
        max = min
        min = 0
    } 

    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

//Crear HTML
const createHTML =(...params)=>{

    const Element = {
        parent  : {},
        html    : params[0]
    }

    if(params.length == 2){
        Element.parent  = params[0]
        Element.html    = params[1]
    }
    
    let element = document.createElement('div')
    element.innerHTML = Element.html
    element = element.children[0]

    if(Element.parent.element) Element.parent = Element.parent.element
    if(Element.parent.classID) Element.parent = document.querySelector(Element.parent.classID)
    if(Element.parent instanceof HTMLElement) Element.parent.append(element)

    return element
}

//Crear Alert modal
class AlertModal {
    constructor(element, limit = 3){
        this.ElementParent = element
        this.ElementTemp = document.createDocumentFragment()
        this.Element = createHTML(`<div class="div_AKMyj"></div>`)
        this.limit = limit
    }

    add(data = {}){ 
 
        if(this.ElementParent instanceof HTMLElement) this.ElementParent.append(this.Element)
        else this.ElementTemp.append(this.Element)

        const element = createHTML(`
            <div style="background:${ data.color ?? 'pink' }" class="div_FFZQY">
                <p>${ data.message ?? '' }</p>
                <button><i class="fa-solid fa-xmark"></i></button>
            </div>
        `)

        const removeItem =()=>{
            element.remove()
            if(this.Element.children.length == 0){
                this.ElementTemp.append(this.Element)
            }
        }

        if(this.Element.children.length >= this.limit){
            this.Element.children[0].remove()
        }

        if(!data.keep){ setTimeout(removeItem, (data.time ?? 3000)) }
        element.querySelector('button').addEventListener('click', removeItem)

        this.Element.append(element)
    }

    clean(){
        this.Element.textContent = ''
    }
}
