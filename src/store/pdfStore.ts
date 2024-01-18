import { create } from 'zustand';

import { invoicePdfName, salaryCertificatePdfName } from '../constants/GlobalConstants';
import { PdfFileNameConfig } from '../types';

interface usePdfStoreProps {
  showPdfPage: boolean;
  handleOpenPdfPage: () => void;
  handleClosePdfPage: () => void;
  pdfNameList: string[];
  setPdfCarouselConfig: ({
    activeFileName,
    attributeName,
  }: {
    activeFileName: string;
    attributeName?: string;
  }) => PdfFileNameConfig[];
  currentPdf: string;
  setCurrentPdf: (pdfName: string) => void;
  nextPdf: () => void;
  prevPdf: () => void;
}

const usePdfStore = create<usePdfStoreProps>((set, get) => ({
  showPdfPage: false,
  handleOpenPdfPage() {
    set({ showPdfPage: true });
  },
  handleClosePdfPage() {
    set({ currentPdf: '' });
    set({ showPdfPage: false });
  },
  pdfNameList: [salaryCertificatePdfName, invoicePdfName],
  setPdfCarouselConfig: () => [],
  currentPdf: '',
  setCurrentPdf: (pdfName) => {
    set({ currentPdf: pdfName });
  },
  nextPdf() {
    const { currentPdf, pdfNameList, setCurrentPdf } = get();

    if (currentPdf.length === 0) {
      return;
    }

    let indexOfCurrentPdf = pdfNameList.indexOf(currentPdf);

    if (indexOfCurrentPdf === pdfNameList.length - 1) {
      indexOfCurrentPdf = 0;
    } else {
      indexOfCurrentPdf += 1;
    }

    setCurrentPdf(pdfNameList[indexOfCurrentPdf]);
  },
  prevPdf() {
    const { currentPdf, pdfNameList, setCurrentPdf } = get();

    if (currentPdf.length === 0) {
      return;
    }

    let indexOfCurrentPdf = pdfNameList.indexOf(currentPdf);

    if (indexOfCurrentPdf === 0) {
      indexOfCurrentPdf = pdfNameList.length - 1;
    } else {
      indexOfCurrentPdf -= 1;
    }

    setCurrentPdf(pdfNameList[indexOfCurrentPdf]);
  },
}));

export default usePdfStore;
