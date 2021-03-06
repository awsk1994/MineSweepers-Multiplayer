import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectPipe'
})
export class ObjectPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == null) {
      return value;
    }

    // create instance vars to store keys and final output
    let keyArr: any[] = Object.keys(value),
      dataArr = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
      dataArr.push({ 'key': key, 'value': value[key] });
    });

    // return the resulting array
    return dataArr;
  }
}

@Pipe({
  name: 'minToMsPipe'
})
export class MinToMsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == null || value.indexOf(':') == -1) {
      return value;
    }

    let dateArr = value.split(':');
    if (dateArr.length > 2) {
      return value;
    }

    console.log("length: " + dateArr.length);

    let minutes = dateArr[0];
    let seconds = dateArr[1];

    return (minutes * 60 * 1000) + (seconds * 1000);
  }
}

@Pipe({
  name: 'lengthLimit'
})
export class LengthLimit implements PipeTransform {
  transform(value: string, length: number): any {
    if (value == null || value == '') {
      return value;
    }
    if (value.length < length) {
      return value;
    } else {
      if (length - 2 > 0)
        return value.substring(0, (length - 2)) + '..';
      else
        return value;
    }
  }
}

@Pipe({
  name: 'takeFirstCharacter'
})
export class TakeFirstCharacter implements PipeTransform {
  transform(value: string, length: number): any {
    if (value == null || value == '') {
      return value;
    }
    return value.substring(0,1);
  }
}

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(arr: Array<any>, prop: any, reverse: boolean): any {
    if (arr === undefined) return
    const m = reverse ? -1 : 1
    return arr.sort((a: any, b: any): number => {
      const x = a[prop]
      const y = b[prop]
      return (x === y) ? 0 : (x < y) ? -1*m : 1*m
    })
  }
}