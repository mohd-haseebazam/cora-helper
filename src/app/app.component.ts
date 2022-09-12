import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
// import { ngHtmlParser } from 'angular-html-parser'
// const ngHtmlParser = require('angular-html-parser');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cora-helper';
  entitiesData: any[] = [];
  lsiData: any[] = [];
  tagTarget: any[] = [];
  entitiesHeader: any[] = [];
  lsiHeader: any[] = [];
  tagTargetHeader: any[] = [];
  value: string = '';
  entitiesTotal: number = 0;
  lsiTotal: number = 0;

  add(val: string) {
    this.value = val.trim();
    for (const data of this.entitiesData) {
      data.count = 0;
    }

    for (const data of this.lsiData) {
      data.count = 0;
    }

    for (const data of this.tagTarget) {
      data.QTYcount = 0;
      data.ENTITIEScount = 0;
      data.LSIcount = 0;
    }

    this.value = this.value.trim().toLowerCase();

    if (this.entitiesData.length) {
      for (const data of this.entitiesData) {
        data.count = this.value.split(data[0]).length - 1;
      }
    }

    if (this.lsiData.length) {
      for (const data of this.lsiData) {
        data.count = this.value.split(data[0]).length - 1;
      }
    }

    if (this.tagTarget.length) {
      for (const tag of this.tagTarget) {
        let str = this.value.split(tag[0].toLowerCase());
        if (str.length >= 2) {
          let count = this.count_substr(this.value, tag[0].toLowerCase());
          if (count % 2 != 0) {
            alert(`Please complete the tag '${tag[0].toLowerCase()}'`);
          } else {
            tag.QTYcount = count / 2;

            let substr = this.value.substring(
              this.value.indexOf(tag[0].toLowerCase()),
              this.value.lastIndexOf(tag[0].toLowerCase())
            );
          
            if(this.entitiesData.length) {
              for (const data of this.entitiesData) {
                tag.ENTITIEScount += substr.split(data[0]).length - 1;
              }
            }

            if(this.lsiData.length) {
              for (const data of this.lsiData) {
                tag.LSIcount = substr.split(data[0]).length - 1;
              }
            }
          }
        }
      }
    }

    this.entitiesTotal = 0;
    this.lsiTotal = 0;

    for (const data of this.entitiesData) {
      this.entitiesTotal += data.count;
    }

    for (const data of this.lsiData) {
      this.lsiData += data.count;
    }
  }

  count_substr(str: string, searchValue: string) {
    let count = 0,
      i = 0;
    while (true) {
      const r = str.indexOf(searchValue, i);
      if (r !== -1) [count, i] = [count + 1, r + 1];
      else return count;
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

        switch (type) {
          case 'entities':
            this.entitiesData = data;
            console.log(this.entitiesData);
            this.entitiesHeader = headersRow;
            for (const data of this.entitiesData) {
              data.count = 0;
            }

            break;

          case 'lsi':
            this.lsiData = data;
            console.log(this.lsiData);
            this.lsiHeader = headersRow;
            for (const data of this.lsiData) {
              data.count = 0;
            }

            break;

          case 'tagTarget':
            this.tagTarget = data;
            console.log(this.tagTarget)
            this.tagTargetHeader = headersRow;
            for (const data of this.tagTarget) {
              data.QTYcount = 0;
              data.ENTITIEScount = 0;
              data.LSIcount = 0;
            }
            break;
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

    for (let i = 1; i < csvRecordsArray.length; ++i) {
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
