import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { BarChart3, Calendar, Mail, TrendingUp } from "lucide-react";
import Loader from "../../component/Loader";

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/api/events/dashboard/stats");
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20 p-6 sm:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2692d1] to-[#f48321] bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">
          Real-time insights and activity summary
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          icon={Calendar}
          title="Total Events"
          value={stats?.totalEvents ?? 0}
        />
        <DashboardCard
          icon={TrendingUp}
          title="School Be Frank"
          value={stats?.eventByCategory?.SchoolBeFrank ?? 0}
        />
        <DashboardCard
          icon={BarChart3}
          title="Be Frank For Vsmers"
          value={stats?.eventByCategory?.BeFrankForVsmers ?? 0}
        />
        <DashboardCard
          icon={Mail}
          title="Total Contacts"
          value={stats?.totalContacts ?? 0}
        />
      </div>

      {/* Contact Reason Distribution */}
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BarChart3 className="text-[#2692d1]" />
          Contact Reason Distribution
        </h2>

        {stats?.contactByReason?.length > 0 ? (
          <div className="space-y-4">
            {stats.contactByReason.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 hover:bg-blue-50/50 transition-colors"
              >
                <span className="font-medium text-gray-700">{item._id}</span>

                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#2692d1]/10 text-[#2692d1]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No contact data available.</p>
        )}
      </div>
    </div>
  );
};

/* ------------------ Card Component ------------------ */

const DashboardCard = ({ icon: Icon, title, value }) => (
  <div className="group bg-white/90 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-[#2692d1]/20 to-[#f48321]/20 group-hover:scale-110 transition-transform">
        <Icon className="text-[#2692d1]" size={26} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 tracking-wide">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-slate-800 mt-1">{value}</p>
      </div>
    </div>
  </div>
);
