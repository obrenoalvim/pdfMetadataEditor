import { PDFDocument, PDFName, PDFHexString } from 'pdf-lib';

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
    // updateMetadata defaults to true in pdf-lib, which unconditionally
    // overwrites Producer to "pdf-lib (...)" and ModDate to now as soon as
    // the document is loaded - disable it so reads reflect the real file.
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: false,
      updateMetadata: false,
    });

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

interface RawInfoDict {
  set: (key: unknown, value: unknown) => void;
  delete: (key: unknown) => void;
}

// getInfoDict() is marked private in pdf-lib's types but is the same method
// its own setTitle()/setKeywords()/etc. call at runtime.
function getRawInfoDict(pdfDoc: PDFDocument): RawInfoDict {
  return (pdfDoc as unknown as { getInfoDict(): RawInfoDict }).getInfoDict();
}

export async function applyMetadata(
  arrayBuffer: ArrayBuffer,
  meta: PDFMetadata
): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: false,
      updateMetadata: false,
    });

    if (meta.title !== undefined) {
      pdfDoc.setTitle(meta.title);
    }
    if (meta.author !== undefined) {
      pdfDoc.setAuthor(meta.author);
    }
    if (meta.subject !== undefined) {
      pdfDoc.setSubject(meta.subject);
    }
    if (meta.keywords) {
      // pdf-lib's setKeywords() joins with spaces, which collides with the
      // comma-separated format loadPdfAndExtractMeta() reads back, so write
      // the Keywords entry directly with a comma delimiter to round-trip.
      getRawInfoDict(pdfDoc).set(
        PDFName.of('Keywords'),
        PDFHexString.fromText(meta.keywords.join(', '))
      );
    }
    if (meta.creator !== undefined) {
      pdfDoc.setCreator(meta.creator);
    }
    if (meta.producer !== undefined) {
      pdfDoc.setProducer(meta.producer);
    }
    if (meta.creationDate) {
      pdfDoc.setCreationDate(meta.creationDate);
    } else if (meta.creationDate === null) {
      getRawInfoDict(pdfDoc).delete(PDFName.of('CreationDate'));
    }
    if (meta.modDate) {
      pdfDoc.setModificationDate(meta.modDate);
    } else if (meta.modDate === null) {
      getRawInfoDict(pdfDoc).delete(PDFName.of('ModDate'));
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