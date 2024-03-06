import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as docxtemplater from 'docxtemplater';
//import {  } from "../../assets/templates";
@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  generateWord(data: any): Promise<Blob> {
    const templatePath = 'assets/templates/Plantilla.docx';

    return this.http.get(templatePath, { responseType: 'arraybuffer' })
      .toPromise()
      .then((content: ArrayBuffer) => {
        const doc = new docxtemplater();
        doc.loadZip(content);
        doc.setData(data);
        doc.render();
        return doc.getZip().generate({ type: 'blob' });
      });
  }
}
