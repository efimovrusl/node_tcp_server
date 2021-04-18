class Card {
    // parentEl
    // element
    name
    str
    hp
    cost
    img
    dom_element
    is_transparent
    id

    constructor(dom_element, id = -1, name = "unknown", str = '?', hp = '?', cost = '?', 
        img = "assets/img/cards/secret_card.jpg") {
        this.name = name;
        this.str = str;
        this.hp = hp;
        this.cost = cost;
        this.img = img;
        this.dom_element = dom_element;
        this.is_transparent = (this.name == null)
        this.id = id
        this.dom_element.onclick = () => {
            socket.emit('use_card', this.id)
            socket.once('use_result', result => {
                if (result.id == this.id && result.result == true) {
                    this.move()
                    this.hide(300)
                }
            })
        }
        this.hide()
        this.update()
    }

    set(card) {
        // console.log(`Set card #${this.id} to ${card.url}`)
        if (this.img != card.url) this.show()
        this.name = card.name
        this.img = card.url
        this.str = card.str
        this.hp = card.hp
        this.cost = card.cost
        this.update()
    }

    update() {
        if (this.is_transparent) {
            this.hide()
        } else {
            this.show()
        }
        this.dom_element.querySelector('#cardImgRaw').src = this.img
        this.dom_element.querySelector('#str').innerText = this.str
        this.dom_element.querySelector('#hp').innerText = this.hp
        this.dom_element.querySelector('#cost').innerText = this.cost
    }

    show() {
        this.is_transparent = false
        if (this.dom_element) this.dom_element.classList.remove("transparent")
    }

    hide(timeout = 0) {
        this.is_transparent = true
        setTimeout(() => { if (this.dom_element) this.dom_element?.classList.add("transparent") }, timeout)
    }

    move() {
        if (this.dom_element) {
            this.dom_element?.classList.add("active")
            setTimeout(() => { this.dom_element?.classList.remove("active") }, 600)
        }
    }

}