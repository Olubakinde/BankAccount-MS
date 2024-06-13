import { describe, expect, test, beforeAll } from "@jest/globals";
import { DisplayComponent } from "./Display.component";
import { bootstrap } from "@gsilber/webez";

describe("DisplayComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DisplayComponent>(DisplayComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DisplayComponent);
        });
    });
});
