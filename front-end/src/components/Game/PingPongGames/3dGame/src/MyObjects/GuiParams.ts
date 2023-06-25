import * as dat from 'dat.gui'
import {params} from '../Utils/Params'

export class GuiParams {

    isExist = new Map()
    gui = new dat.GUI()


    constructor() {
        this.setUp()
    }

    setUp() {
        this.gui.add(params, 'enableOrbit');
        this.gui.addColor(params, 'color');
    }


    //let pos = this.game.guiParams.getVal("psss", {x:0, y:2, z:0}, -2, 4, 0.001)
    getVal(name : string, dic : Object, min = 0, max = 100, step = 1) {
        if (!name)
            return

        if (!this.isExist.has(name)){
            const newFolder = this.gui.addFolder(name);
            newFolder.open()
            for (let item in dic) {
                let a : keyof Object = item as keyof Object
                newFolder.add(dic, a, min, max).step(step)
            }
            this.isExist.set(name, dic)
        }
        return (this.isExist.get(name))
    }
}