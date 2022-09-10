import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cora-helper';
  entitiesData: any[] = [];
  lsiData: any[] = [];
  value: string = '';
  entitiesTotal: number = 0;
  lsiTotal: number = 0;

  add(val: string) {
    this.value = val.trim();

    for (const data of this.entitiesData) {
      data[2] = 0;
    }

    for (const data of this.lsiData) {
      data[2] = 0;
    }

    this.value = this.value.trim();

    if (this.value.split(' ').length > 2) {
      if (this.entitiesData.length) {
        for (const data of this.entitiesData) {
          console.log(data[0]);
          // if (this.value.includes(data[0])) {
          data[2] = this.value.split(data[0]).length - 1;
          // }
        }
      }

      if (this.lsiData.length) {
        for (const data of this.lsiData) {
          // if (this.value.includes(data[0])) {
          data[2] = this.value.split(data[0]).length - 1;
          // }
        }
      }
    }

    this.entitiesTotal = 0;
    this.lsiTotal = 0;

    for (const data of this.entitiesData) {
      this.entitiesTotal += data[2];
    }

    for (const data of this.lsiData) {
      this.lsiData += data[2];
    }
  }

  changeListener(files: any, type: string) {
    if (files && files.files.length > 0) {
      let file: any = files.files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csvData: string = reader.result as string;
        let csvRecordsArray = csvData.split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        let data = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
        console.log(data);

        if (type == 'lsi') {
          this.lsiData = data;
          for (const data of this.lsiData) {
            data[2] = 0;
          }
        } else {
          this.entitiesData = data;
          for (const data of this.entitiesData) {
            data[2] = 0;
          }
        }
      };

      reader.onerror = function () {
        alert('error is occured while reading file!');
      };
    } else {
      alert('import valid csv file');
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 0; i < csvRecordsArray.length; ++i) {
      let csvRecord = csvRecordsArray[i].split(',');

      if (csvRecord.length == headerLength) {
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
}
