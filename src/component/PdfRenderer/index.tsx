import './style.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';

import PdfToRender from '../../component/PdfRenderer/PdfToRender';
import PdfDownloadButtons from '../../component/PdfRenderer/PdfToRender/PdfDownloadButtons';
import GlobalCrossButton from '../../component/Resuables/GlobalCrossButton';
import usePdfStore from '../../store/pdfStore';

const PdfRenderer: React.FC = () => {
  const { handleClosePdfPage, nextPdf, prevPdf } = usePdfStore();
  return (
    <div className="w-full fixed z-50 inset-0 bg-black-1 bg-opacity-80 overflow-hidden">
      <Layout className="bg-transparent">
        {/* Render pdftoolkit */}
        <Header className="z-50 bg-black-1 bg-opacity-50 lg:bg-transparent flex justify-between items-center w-full px-8 py-10">
          <GlobalCrossButton onClick={handleClosePdfPage} />
          <div className="flex items-center space-x-5">
            <PdfDownloadButtons />
          </div>
        </Header>
        {/* Render the pdfs */}
        <Content className="absolute inset-0 overflow-auto hide-scrollbar">
          <div onClick={handleClosePdfPage}>
            <PdfToRender />
          </div>
          <div className="fixed z-50 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <Button
              className="bg-grey-1 text-white-1 border-none flex justify-center items-center"
              shape="circle"
              onClick={prevPdf}
              icon={<LeftOutlined rev={''} />}
            />
            <Button
              className="bg-grey-1 text-white-1 border-none flex justify-center items-center"
              shape="circle"
              onClick={nextPdf}
              icon={<RightOutlined rev={''} />}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default PdfRenderer;
