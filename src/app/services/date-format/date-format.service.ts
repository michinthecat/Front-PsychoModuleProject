import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatService {
  formatDate(dateString: string): string {
    const day = dateString.slice(8, 10);
    const month = dateString.slice(5, 7);
    const year = dateString.slice(0, 4);
    const hourMinute = dateString.slice(11, 16);

    return `${day}/${month}/${year} ${hourMinute}`;
  }
}
