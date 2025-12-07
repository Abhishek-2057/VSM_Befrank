
import React from "react";


import imageEN from "../assets/onepager/VSM_one_pager_English_tile.jpeg";
import imageMR from "../assets/onepager/VSM_one_pager_Marathi_tile.jpeg";


import pdfEN from "../assets/onepager/Be_Frank_one_pager_brochure.pdf";
import pdfMR from "../assets/onepager/Be_Frank_Marathi_one_pager.pdf";

const Onepager = () => {
  const items = [
    {
      title: "VSM One Pager (English)",
      img: imageEN,
      pdfHref: pdfEN,
    },
    {
      title: "VSM One Pager (Marathi)",
      img: imageMR,
      pdfHref: pdfMR,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="inline-block mb-8">
        <h2 className="text-[#2692d1] font-bold text-2xl sm:text-3xl">
          VSM One Pager
        </h2>
        <div className="bg-[#f48321] h-[3px] w-20 mt-2 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <a
              href={it.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all group-hover:shadow-md">
                <img
                  src={it.img}
                  alt={`${it.title} preview`}
                  className="w-full h-auto object-cover"
                />
              </div>

              <p className="mt-3 text-sm sm:text-base text-gray-700">
                {it.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Onepager;
