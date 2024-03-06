// pdf.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EnteModel } from "../ML/FCL_ENTE";
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  CrearPDF(Ent: EnteModel) 
  {
    const documentDefinition = 
    {
      content: [
        { text: "Apellido Paterno: " + Ent.Ape_Ente1 , fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        
      ],
    };

    pdfMake.createPdf(documentDefinition).download();
  }
  PDFCaptura(ImagenBiteada: string) 
  {
    const documentDefinition = {
      content: [
        { text: 'INFORME CLIENTES', fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        { image: ImagenBiteada, width: 500 },
        
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
