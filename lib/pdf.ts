import { PDFDocument } from 'pdf-lib';

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords: string[];
  creator?: string;
  producer?: string;
  creationDate?: Date | null;
  modDate?: Date | null;
}

export async function loadPdfAndExtractMeta(arrayBuffer: ArrayBuffer): Promise<PDFMetadata> {
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });

    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    const keywordsStr = pdfDoc.getKeywords();
    const creator = pdfDoc.getCreator();
    const producer = pdfDoc.getProducer();

    let creationDate: Date | null = null;
    try {
      creationDate = pdfDoc.getCreationDate() || null;
    } catch {
      creationDate = null;
    }

    let modDate: Date | null = null;
    try {
      modDate = pdfDoc.getModificationDate() || null;
    } catch {
      modDate = null;
    }

    const keywords = keywordsStr ? keywordsStr.split(',').map(k => k.trim()).filter(k => k) : [];

    return {
      title: title || '',
      author: author || '',
      subject: subject || '',
      keywords,
      creator: creator || '',
      producer: producer || '',
      creationDate,
      modDate,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('encrypted')) {
      throw new Error('ENCRYPTED');
    }
    throw error;
  }
}

export async function applyMetadata(
  arrayBuffer: ArrayBuffer,
  meta: PDFMetadata
): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });

    if (meta.title !== undefined) {
      pdfDoc.setTitle(meta.title);
    }
    if (meta.author !== undefined) {
      pdfDoc.setAuthor(meta.author);
    }
    if (meta.subject !== undefined) {
      pdfDoc.setSubject(meta.subject);
    }
    if (meta.keywords && meta.keywords.length > 0) {
      pdfDoc.setKeywords(meta.keywords);
    }
    if (meta.creator !== undefined) {
      pdfDoc.setCreator(meta.creator);
    }
    if (meta.producer !== undefined) {
      pdfDoc.setProducer(meta.producer);
    }
    if (meta.creationDate) {
      pdfDoc.setCreationDate(meta.creationDate);
    }
    if (meta.modDate) {
      pdfDoc.setModificationDate(meta.modDate);
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    if (error instanceof Error && error.message.includes('encrypted')) {
      throw new Error('ENCRYPTED');
    }
    throw error;
  }
}