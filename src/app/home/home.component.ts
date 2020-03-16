import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { ComponentRegistryService } from '../service/registry/component-registry.service'
import { ExamListComponent } from '../exam-list/exam-list.component'
import { ViewContainerWrapper } from './view-container-wrapper.directive'

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


    @ViewChild(ViewContainerWrapper, {static: true}) wrapper: ViewContainerWrapper

    constructor(private resolver: ComponentFactoryResolver,
                private registryService: ComponentRegistryService) {
    }


    ngOnInit(): void {
        const factory = this.resolver.resolveComponentFactory(ExamListComponent)
        this.wrapper.viewContainerRef.createComponent(factory)
    }


    swapComponent(componentName: string) {
        this.wrapper.viewContainerRef.clear()
        const factory = this.resolver.resolveComponentFactory(this.registryService.get(componentName))
        this.wrapper.viewContainerRef.createComponent(factory)
    }

}
