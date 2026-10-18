import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  Upload,
  Sparkles,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CivicCategory, IssuePriority } from '../types';

export const CreateReportScreen: React.FC = () => {
  const navigate = useNavigate();
  const { createReport, user } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CivicCategory>('Roads');
  const [description, setDescription] = useState('');
  const [locality, setLocality] = useState(`${user.neighborhood} · ${user.wardNumber}`);
  const [priority, setPriority] = useState<IssuePriority>('High');
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  // Pre-baked smart descriptions by category for the "Generate description with AI" feature
  const aiSampleDescriptions: Record<CivicCategory, { title: string; desc: string }> = {
    Roads: {
      title: 'Deep Trench Cave-in Causing Vehicle Skidding near Main Signal',
      desc: 'Significant asphalt collapse of approx 2ft depth resulting from unsealed telecommunications trenching. Two-wheeler riders face severe accident hazards, especially during nighttime. Immediate barricading and cold-mix resurfacing required.',
    },
    Water: {
      title: 'High Pressure Potable Water Pipeline Leak Submerging Sidewalk',
      desc: 'Continuous stream of clean drinking water gushing from damaged sub-surface junction valve onto pedestrian footpath. Thousands of liters wasting while adjacent residential blocks report critical pressure drop.',
    },
    Sanitation: {
      title: 'Overflowing Municipal Dumpster and Illegal Secondary Dumping',
      desc: 'Collection bins have remained unemptied for 48 hours, causing spillover across the road edge. Stray animal scavenging and severe odor impacting local residents and school children. Prompt clearance and bin sanitization requested.',
    },
    Streetlights: {
      title: 'Multiple Non-Functioning LED Streetlights Creating Dangerous Dark Spot',
      desc: 'Three consecutive streetlights between Cross 4 and Cross 6 have been non-operational for 3 nights. Footpath is completely in the dark, posing major safety risks for female commuters and elder walkers returning from transit.',
    },
    'Public Safety': {
      title: 'Exposed Live High-Voltage Cable Loom on Pedestrian Crosswalk',
      desc: 'Unlatched utility transformer box with frayed electrical insulation dangling at shoulder height along school walking route. Requires emergency power isolation and heavy-duty locking shroud before monsoon drizzle.',
    },
    Parks: {
      title: 'Broken Children Swing Hardware & Uprooted Tree Limb in Public Park',
      desc: 'Metal support chain snapped on two toddler swings creating sharp jagged iron edges. In addition, an overgrown dried bough is dangling overhead near the walking loop. Urgent maintenance and safety pruning needed.',
    },
    Community: {
      title: 'Footpath Obstruction by Commercial Construction Rubble',
      desc: 'Commercial building contractor has piled 4 tons of gravel and sand directly across the public sidewalk, forcing pedestrians into oncoming heavy road traffic. Enforcement notice required under municipal public street regulations.',
    },
  };

  const samplePhotoPresets = [
    {
      label: 'Damaged Road',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Trench Cave-in',
      url: 'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Water Leak',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Garbage Spill',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Dark Street',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Work Crew',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImagesList((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddPreset = (url: string) => {
    if (!imagesList.includes(url)) {
      setImagesList((prev) => [...prev, url]);
    }
  };

  const handleRemovePhoto = (idxToRemove: number) => {
    setImagesList((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleGenerateAIDescription = () => {
    const sample = aiSampleDescriptions[category];
    if (!title) {
      setTitle(sample.title);
    }
    setDescription(sample.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newId = createReport({
        title: title.trim(),
        category,
        description: description.trim(),
        locality: locality.trim(),
        priority,
        imageUrl: imagesList[0] || undefined,
        images: imagesList.length > 0 ? imagesList : undefined,
      });

      setIsSubmitting(false);
      setSubmittedReportId(newId);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Screen Title & Subtitle */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#E4F5E9] text-[#155638] flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4 text-[#155638]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#19251E]">
              Report a Civic Issue
            </h1>
            <p className="text-xs text-[#738078]">
              Your voice alerts ward engineers and rallies neighborhood support.
            </p>
          </div>
        </div>
      </div>

      {/* Main Report Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-[#E7ECE8] shadow-xs space-y-4">
        {/* 1. Photo Upload Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#19251E] block">
              Evidence Photos {imagesList.length > 0 && `(${imagesList.length} attached)`}
            </label>
            {imagesList.length > 0 && (
              <span className="text-[10px] text-[#155638] font-bold">
                ✓ Slides enabled on feed
              </span>
            )}
          </div>

          {imagesList.length > 0 ? (
            <div className="space-y-3">
              {/* Photo thumbnails grid */}
              <div className="grid grid-cols-3 gap-2">
                {imagesList.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden border border-[#E7ECE8] bg-slate-100 group"
                  >
                    <img
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-bold">
                      #{idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add more button */}
                <label className="aspect-video border-2 border-dashed border-[#E7ECE8] hover:border-[#155638] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#F7F9F7] text-center p-2">
                  <Camera className="w-4 h-4 text-[#155638] mb-1" />
                  <span className="text-[10px] font-bold text-[#155638]">
                    + Add More
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Presets to quickly append additional angles */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-[#738078] uppercase tracking-wider block mb-1">
                  Add more angles / presets:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {samplePhotoPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => handleAddPreset(preset.url)}
                      className="text-center p-1.5 rounded-xl border border-[#E7ECE8] hover:border-[#155638] bg-[#F7F9F7] text-[10px] text-[#19251E] font-medium truncate active:scale-95 transition-all"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="border-2 border-dashed border-[#E7ECE8] hover:border-[#155638] rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#F7F9F7] text-center">
                <div className="w-10 h-10 rounded-full bg-[#E4F5E9] text-[#155638] flex items-center justify-center mb-2">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#19251E]">
                  Tap to upload issue photos (Multiple supported)
                </span>
                <span className="text-[10px] text-[#738078] mt-0.5">
                  Select one or multiple JPG/PNG images
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Quick sample photo selector for quick demo testing */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-[#738078] uppercase tracking-wider block mb-1">
                  Or pick demo photo to start:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {samplePhotoPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => handleAddPreset(preset.url)}
                      className="text-center p-1.5 rounded-xl border border-[#E7ECE8] hover:border-[#155638] bg-[#F7F9F7] text-[10px] text-[#19251E] font-medium truncate active:scale-95 transition-all"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Category Selector */}
        <div>
          <label className="text-xs font-bold text-[#19251E] block mb-1.5">
            Category
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                'Roads',
                'Water',
                'Sanitation',
                'Streetlights',
                'Public Safety',
                'Parks',
              ] as CivicCategory[]
            ).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`p-2.5 rounded-xl text-xs font-semibold border transition-all truncate text-center ${
                  category === cat
                    ? 'bg-[#155638] text-white border-[#155638] shadow-xs'
                    : 'bg-[#F7F9F7] text-[#19251E] border-[#E7ECE8] hover:border-[#155638]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Issue Title */}
        <div>
          <label className="text-xs font-bold text-[#19251E] block mb-1">
            Issue Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Deep pothole on 100ft road near 12th main"
            className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#155638] focus:bg-white text-[#19251E]"
          />
        </div>

        {/* 4. Problem Description + AI Generator button */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-[#19251E]">
              Problem Description
            </label>
            <button
              type="button"
              onClick={handleGenerateAIDescription}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#155638] hover:text-[#237A50] bg-[#E4F5E9] px-2 py-0.5 rounded-lg transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#155638]" />
              <span>Draft with AI</span>
            </button>
          </div>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue, hazards, or urgency so ward teams can act swiftly..."
            className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl p-3 focus:outline-none focus:border-[#155638] focus:bg-white text-[#19251E] leading-relaxed"
          />
        </div>

        {/* 5. Locality / Area Text Input */}
        <div>
          <label className="text-xs font-bold text-[#19251E] block mb-1">
            Locality / Ward Landmark
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155638]" />
            <input
              type="text"
              required
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g. 100ft Road, Indiranagar Ward 112"
              className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#155638] focus:bg-white text-[#19251E]"
            />
          </div>
        </div>

        {/* 6. Severity / Priority Selector */}
        <div>
          <label className="text-xs font-bold text-[#19251E] block mb-1.5">
            Severity Level
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['Low', 'Medium', 'High', 'Urgent'] as IssuePriority[]).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setPriority(lvl)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  priority === lvl
                    ? lvl === 'Urgent'
                      ? 'bg-rose-700 text-white border-rose-700'
                      : 'bg-[#155638] text-white border-[#155638]'
                    : 'bg-[#F7F9F7] text-[#738078] border-[#E7ECE8] hover:border-[#155638]/40'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Helper Note */}
        <div className="p-3 rounded-2xl bg-[#E4F5E9]/50 border border-[#237A50]/20 flex items-start gap-2 text-[11px] text-[#155638]">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#155638]" />
          <p className="leading-snug">
            Submitting a verified civic issue earns you <strong>+50 reward points</strong> and routes automatically to the Ward 112 Engineering Control Room.
          </p>
        </div>

        {/* Submit Report Button */}
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !description.trim()}
          className="w-full py-3.5 rounded-2xl bg-[#155638] hover:bg-[#237A50] text-white font-extrabold text-sm shadow-lg shadow-[#155638]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Routing Report to Ward Desk...</span>
            </div>
          ) : (
            <>
              <span>Submit Civic Report</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Success Modal / State */}
      {submittedReportId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#E4F5E9] text-[#155638] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#155638]">
                Report Logged Successfully
              </span>
              <h3 className="text-lg font-bold text-[#19251E] mt-0.5">
                Ward Dispatch Triggered!
              </h3>
              <p className="text-xs text-[#738078] mt-1">
                Your report has been assigned reference ID:
              </p>
              <div className="inline-block mt-2 px-3 py-1 bg-[#F7F9F7] rounded-xl border border-[#E7ECE8] font-mono text-xs font-bold text-[#155638]">
                #{submittedReportId.toUpperCase()}
              </div>
            </div>

            {/* Reward Points Celebration Chip */}
            <div className="p-3 bg-gradient-to-r from-[#155638] to-[#237A50] text-white rounded-2xl flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-[#F2A65A]" />
              <div className="text-left">
                <span className="text-[10px] text-[#E4F5E9] block leading-none font-semibold">
                  Reward Points Earned
                </span>
                <span className="text-sm font-extrabold text-[#F2A65A]">
                  +50 Civic Points
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#738078]">
              Your issue is now live on the citizen feed for neighborhood upvoting and municipal review.
            </p>

            <button
              onClick={() => {
                setSubmittedReportId(null);
                navigate('/home');
              }}
              className="w-full py-3 bg-[#155638] text-white text-xs font-bold rounded-xl hover:bg-[#237A50] transition-colors"
            >
              Go to Civic Feed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
