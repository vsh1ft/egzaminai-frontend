import { Injectable } from '@angular/core'

@Injectable()
export class ComponentRegistryService {

    private components = new Map<string, any>()

    set(name: string, component: any) {
        this.components.set(name, component)
    }

    get(name: string): any {
        return this.components.get(name)
    }

}
