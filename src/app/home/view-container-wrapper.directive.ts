import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
    selector: '[viewContainerRef]',
})
export class ViewContainerWrapper {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
