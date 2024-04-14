'use client';
import React from 'react';

const reports = [
  {
    title: 'Investment options',
    summary:
      'We have various investmenet programs to boost the growth of brackifi...',
    date: '3rd June, 2024',
  },
  {
    title: 'Investment options',
    summary:
      'We have various investmenet programs to boost the growth of brackifi...',
    date: '3rd June, 2024',
  },
  {
    title: 'Investment options',
    summary:
      'We have various investmenet programs to boost the growth of brackifi...',
    date: '3rd June, 2024',
  },
  {
    title: 'Investment options',
    summary:
      'We have various investmenet programs to boost the growth of brackifi...',
    date: '3rd June, 2024',
  },
  {
    title: 'Investment options',
    summary:
      'We have various investmenet programs to boost the growth of brackifi...',
    date: '3rd June, 2024',
  },
];

const DocumentLibraryAndReport = () => {
  return (
    <div className="w-[45%] h-[40rem] bg-color-secondary-1 rounded-lg shadow-lg flex flex-col">
      <p className="p-[1rem] shadow-md text-[1.8rem] font-semibold text-color-primary-1 uppercase">
        Document Library And Reports
      </p>
      <div className="w-full flex flex-col  overflow-y-auto flex-1 mt-[1rem]">
        {reports.map((report, i) => (
          <div
            key={i}
            className="w-full flex p-[1rem] mb-[1rem] last:mb-0 items-center"
          >
            <div className="w-[10rem] h-[10rem] bg-color-secondary-2 rounded-md"></div>
            <div className="mx-[1rem] flex-1">
              <p className="text-color-primary-1 text-[1.7rem] font-semibold">
                {report.title}
              </p>
              <p className="text-color-tertiary-1">{report.summary}</p>
              <p className="text-[1.4rem] text-color-secondary-2">
                {report.date}
              </p>
            </div>
            <button className="w-auto bg-color-primary-1 text-color-white p-[1rem] rounded-md border border-color-primary-1 hover:text-color-primary-1 hover:bg-color-transparent font-semibold transition-all duration-100 ease-in ">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentLibraryAndReport;
