import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Pipe({
  name: 'trimOutletName',
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(title: string, outletName: string): unknown {
    return title.replace(` - ${outletName}`, '');
  }
}
