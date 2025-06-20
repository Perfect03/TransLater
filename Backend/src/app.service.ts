import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
    getProjects() {
        return [{id: 1, name: 'kdlolymp'}, {id: 2, name: 'tekme'}]
    }
}
