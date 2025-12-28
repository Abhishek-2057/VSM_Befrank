import { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";


const CountUp = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const increment = end / (duration / 16); // ~60fps
          
          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(Math.ceil(start));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          animate();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};



// Card for a single statistic, styled to match the image
const StatCard = ({ number, text }) => {
  return (
    // Using a very light gray background, specific dimensions, and larger rounding
    // bg-gray-50 rounded-2xl p-6 text-center shadow-sm
    <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-2xs   flex flex-col justify-center items-center">
      <h3 className="text-5xl font-bold text-[#2692d1] mb-2 flex items-center">
        <CountUp end={parseInt(number)} />
        <Plus className="w-8 h-8 font-black text-[#2692d1]" strokeWidth={5} />
      </h3>
      <p className="text-gray-600 text-lg leading-tight">{text}</p>
    </div>
  );
};

// The main statistics section component, styled to match the image
const StatisticsSection = () => {
  const stats = [
    { id: 1, number: "100", text: "Sessions within VSM" },
    { id: 2, number: "120", text: "School Chale Hum Sessions" },
    { id: 5, number: "150", text: "Facilitators" },
    { id: 3, number: "1000", text: "Current Students & Alumni Covered" },
    { id: 4, number: "13000", text: "School Children Reached" },
    { id: 6, number: "10", text: "Districts" },
  ];

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* ✅ TOP CENTER HEADING */}
        <div className="inline-block mb-5">
            <h2 className="text-[#f48321] font-bold text-xl sm:text-2xl md:text-3xl text-center">
              Be Frank in Numbers
            </h2>
            <div className="bg-[#2692d1] h-[4px] rounded-sm w-[100px] mt-1"></div>
        </div>

        <p className=" mb-5">At Be Frank, numbers aren’t just statistics—they tell the story of our growing impact. Whether it's the number of schools we've partnered with or the students we've reached, these figures reflect the trust communities place in us and the real change being made on the ground</p>

        {/* ✅ RESPONSIVE INLINE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              number={stat.number}
              text={stat.text}
            />
          ))}
        </div>

      </div>
    </section>
  );
};


export default StatisticsSection;