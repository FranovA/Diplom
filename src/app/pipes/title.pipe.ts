import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let titles = [];
    for (const key in value)
    {
      titles.push(value[key]['title'])
    }
    return titles;
  }

}
