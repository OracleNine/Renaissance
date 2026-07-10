import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wikiHomeUrl',
})
export class WikiHomeUrlPipe implements PipeTransform {
  transform(value: string): string {
    return "/wiki/" + value + "/home"
  }
}
