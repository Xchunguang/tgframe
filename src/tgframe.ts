import { Control, CreateUtil, THREE, ItemManager, UIComp } from 'threeglib'
const { TextToast,TextButton,Icon } = UIComp
const canvas = (window as any).canvas
const wx: any = (window as any).wx
interface ButtonConfig {
    background: string | undefined;
    borderColor: string | undefined;
    borderWidth: number;
    activeBackground: string | undefined;
    activeBorderColor: string | undefined;
    disableColor: string;
    borderRadius: number;
    disable: boolean;
    onclick: Function | undefined;
}
export class Main {
    control: Control
    itemManager: ItemManager
    constructor() {
        let width = window.innerWidth
        let height = window.innerHeight
        let colorNum = 0xd4dde4
        let color = new THREE.Color(colorNum)
        let stage = {
            scene: CreateUtil.createScene(CreateUtil.createFog(0xcce0ff, 500, 10000), colorNum),
            camera: CreateUtil.createPerspectiveCamera(30, width / height, 1, 2000)
        }
        let hudStage = {
            scene: CreateUtil.createScene(),
            camera: CreateUtil.createHudCamera(-width / 2, width / 2, height / 2, -height / 2, -100, 100)
        }
        this.control = new Control(canvas, stage, hudStage)
        this.itemManager = new ItemManager(this.control)

        let toast = new TextToast(this.control, wx.createCanvas)
        toast.show('hello', 10)

        let config: ButtonConfig = {
            background: 'white',
            borderColor: 'red',
            borderWidth: 10,
            borderRadius: 10,
            activeBackground: '', 
            activeBorderColor: '',
            disableColor: '',
            disable: false,
            onclick: ()=>console.log('btn click')
        }
        let button = new TextButton('按钮', 'black', 10, wx.createCanvas(), new THREE.Vector3(0, 0, 0), 200, 100, config)
        this.itemManager.addHudItem(button)

        let icon = null;
        let image = new Image();
        image.src = 'img/1.jpg';
        let imageButton = null;
        let imageId = "1";
        let self = this
        image.onload = function(){
            let radio = 2
            icon = new Icon(image, [{id: imageId, width: 300, height: 300, left: 0,top: 0}], wx.createCanvas);

            let item = icon.createIcon(imageId, new THREE.Vector3(0,0,0), radio)
            if(item !== undefined){
                self.itemManager.addHudItem(item)
            }
        }

        this.animate()
    }
    animate(): void {
        requestAnimationFrame(this.animate.bind(this))
        this.control.update()
    }
}