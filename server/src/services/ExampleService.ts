import { Service } from "typedi";

@Service()
export default class ExampleService {
    printMessage() {
        console.log('I am alive!');
    }
}