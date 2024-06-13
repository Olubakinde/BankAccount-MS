import html from "./main.component.html";
import css from "./main.component.css";
import { EzComponent } from "@gsilber/webez";
import { DisplayComponent } from "./Display/Display.component";

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    private display: DisplayComponent = new DisplayComponent();

    constructor() {
        super(html, css);
        this.addComponent(this.display, "display");
    }
}
