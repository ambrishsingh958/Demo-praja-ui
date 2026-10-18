import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Users,
  Award,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VacanciesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { vacancies, appliedVacancies, applyVacancy } = useApp();

  const handleApplyClick = (vacancyId: string) => {
    // Directly track interaction on frontend and award points without backend form
    applyVacancy(vacancyId, 'Applied via Direct Google Form');
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Top Navigation & Opportunities Counter */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-1 text-xs font-bold text-[#155638] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
        <span className="text-xs text-[#738078] font-medium">
          {vacancies.length} Opportunities
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#155638] flex items-center justify-center font-bold border border-emerald-100">
            <Briefcase className="w-5 h-5 text-[#155638]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#19251E]">
              Civic & Volunteer Opportunities
            </h1>
            <p className="text-xs text-[#738078]">
              Volunteer, intern, or lead community initiatives in your ward.
            </p>
          </div>
        </div>

        {/* Google Form Notice Badge */}
        <div className="flex items-center gap-2 bg-[#F0F7F3] border border-[#D7E8DD] rounded-2xl px-3 py-2 text-xs text-[#155638]">
          <FileSpreadsheet className="w-4 h-4 text-[#155638] shrink-0" />
          <span className="text-[11.5px] leading-tight font-medium">
            <strong>Direct Google Form Application:</strong> Clicking <strong>Apply Now</strong> directly opens the official Google Form application. No backend needed.
          </span>
        </div>
      </div>

      {/* Vacancies List */}
      <div className="space-y-3">
        {vacancies.map((vac) => {
          const isApplied = appliedVacancies.includes(vac.id);
          const formUrl =
            vac.googleFormUrl ||
            'https://docs.google.com/forms/d/e/1FAIpQLSc_CivicVolunteerApplication/viewform';

          return (
            <div
              key={vac.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-3 hover:border-[#155638]/40 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#155638] bg-[#E4F5E9] px-2 py-0.5 rounded-full inline-block mb-1">
                    {vac.type}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#19251E]">
                    {vac.role}
                  </h3>
                  <p className="text-xs font-semibold text-[#738078]">
                    {vac.organization}
                  </p>
                </div>

                {vac.stipend && (
                  <span className="text-[11px] font-bold text-[#155638] bg-[#F7F9F7] px-2.5 py-1 rounded-xl border border-[#E7ECE8] shrink-0">
                    {vac.stipend}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#19251E] leading-relaxed">
                {vac.description}
              </p>

              {/* Requirements */}
              <div className="space-y-1 bg-[#F7F9F7] p-2.5 rounded-2xl border border-[#E7ECE8]">
                <span className="text-[10px] font-bold text-[#738078] uppercase tracking-wider block">
                  Key Requirements:
                </span>
                {vac.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#19251E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#155638]" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Spots & Reward Indicator */}
              <div className="flex items-center justify-between text-[11px] text-[#738078]">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#155638]" />
                  <span>{vac.spotsRemaining} spots available in Ward 112</span>
                </div>
                <div className="flex items-center gap-1 text-[#155638] font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>+25 Points on Application</span>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E7ECE8] text-xs">
                <div className="flex items-center gap-3 text-[#738078]">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#155638]" />
                    {vac.location}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    Deadline: {vac.deadline}
                  </span>
                </div>

                {isApplied ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#155638] bg-[#E4F5E9] px-2.5 py-1.5 rounded-xl border border-[#237A50]/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Form Opened
                    </span>
                    <a
                      href={formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#155638]/20 text-[#155638] hover:bg-[#E4F5E9] text-xs font-semibold transition-colors cursor-pointer"
                      title="Reopen Google Form"
                    >
                      <span>Reopen Form</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleApplyClick(vac.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#155638] hover:bg-[#237A50] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                    aria-label={`Apply Now for ${vac.role} via Google Form`}
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
