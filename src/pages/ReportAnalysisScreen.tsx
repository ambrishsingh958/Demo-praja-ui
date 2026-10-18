import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportAnalysisScreen: React.FC = () => {
  const navigate = useNavigate();
  const { posts, user, setSelectedPostForDetail } = useApp();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Reported' | 'In Progress' | 'Resolved'>('All');

  // User's own reports (matching user.id or created by user)
  const myReports = posts.filter(
    (p) => p.reporter.id === user.id || p.reporter.name === user.name
  );

  const filteredReports = myReports.filter((p) => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  const reportedCount = myReports.filter((p) => p.status === 'Reported').length;
  const inProgressCount = myReports.filter((p) => p.status === 'In Progress' || p.status === 'Under Review').length;
  const resolvedCount = myReports.filter((p) => p.status === 'Resolved').length;

  const categoryStats = [
    { name: 'Roads', count: 7, pct: 38, color: 'bg-amber-500' },
    { name: 'Sanitation', count: 5, pct: 28, color: 'bg-emerald-500' },
    { name: 'Water', count: 3, pct: 17, color: 'bg-blue-500' },
    { name: 'Streetlights', count: 2, pct: 11, color: 'bg-yellow-500' },
    { name: 'Parks', count: 1, pct: 6, color: 'bg-teal-500' },
  ];

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-1 text-xs font-bold text-[#155638] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
        <span className="text-xs text-[#738078] font-medium">
          Ward 112 Analytics
        </span>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
            <BarChart3 className="w-4 h-4 text-blue-700" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#19251E]">
              Report & Civic Analysis
            </h1>
            <p className="text-xs text-[#738078]">
              Track your logged issues and ward resolution velocity.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-[#E7ECE8] shadow-xs text-center">
          <span className="text-[10px] text-[#738078] font-bold uppercase block">
            Logged
          </span>
          <span className="text-xl font-extrabold text-[#19251E] tabular-nums mt-0.5 block">
            {myReports.length}
          </span>
          <span className="text-[10px] text-[#738078]">total issues</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-[#E7ECE8] shadow-xs text-center">
          <span className="text-[10px] text-amber-800 font-bold uppercase block">
            In Action
          </span>
          <span className="text-xl font-extrabold text-amber-700 tabular-nums mt-0.5 block">
            {inProgressCount}
          </span>
          <span className="text-[10px] text-[#738078]">under repair</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-[#E7ECE8] shadow-xs text-center">
          <span className="text-[10px] text-[#155638] font-bold uppercase block">
            Resolved
          </span>
          <span className="text-xl font-extrabold text-[#155638] tabular-nums mt-0.5 block">
            {resolvedCount}
          </span>
          <span className="text-[10px] text-[#237A50]">78% rate</span>
        </div>
      </div>

      {/* Category Breakdown Bar Chart */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#155638]" />
            Your Reports by Category
          </span>
          <span className="text-[11px] text-[#738078]">18 total</span>
        </div>

        <div className="space-y-2.5">
          {categoryStats.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#19251E]">{item.name}</span>
                <span className="text-[#738078] tabular-nums text-[11px]">
                  {item.count} ({item.pct}%)
                </span>
              </div>
              <div className="h-2 bg-[#F7F9F7] rounded-full overflow-hidden border border-[#E7ECE8]">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Resolution Benchmark */}
        <div className="mt-2 pt-3 border-t border-[#E7ECE8] flex items-center justify-between text-[11px] text-[#738078]">
          <span>Ward Average Resolution Time:</span>
          <span className="font-bold text-[#155638]">38 Hours</span>
        </div>
      </div>

      {/* Filter Tabs for User's Reports */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#19251E]">
            Your Submitted Reports
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-white rounded-xl border border-[#E7ECE8]">
            {(['All', 'Reported', 'In Progress', 'Resolved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  statusFilter === status
                    ? 'bg-[#155638] text-white shadow-xs'
                    : 'text-[#738078] hover:text-[#19251E]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center border border-[#E7ECE8] text-[#738078]">
            <p className="text-xs font-bold text-[#19251E]">
              No reports in &ldquo;{statusFilter}&rdquo; status
            </p>
            <p className="text-[11px] mt-1">
              Use the central + button to log a new neighborhood concern!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedPostForDetail(report)}
                className="bg-white rounded-2xl p-3.5 border border-[#E7ECE8] hover:border-[#155638]/40 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold uppercase text-[#155638] bg-[#E4F5E9] px-2 py-0.5 rounded-full">
                      {report.category}
                    </span>
                    <span className="text-[10px] text-[#738078] font-mono">
                      #{report.id.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#19251E] truncate">
                    {report.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[#738078]">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#155638]" />
                      {report.reporter.wardOrArea}
                    </span>
                    <span>·</span>
                    <span>{report.formattedTime}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      report.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : report.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {report.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#738078]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
