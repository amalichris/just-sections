## Environment

This template is structured for a Next.js project with the App Router:

- File paths use /components/... and /app/page.tsx
- Components use the "use client" directive
- Imports use the @/components/... path alias
- Tailwind CSS for styling
- framer-motion for animations
- lucide-react for icons

If you support this exact structure, apply the files below as written.

If your builder uses a different structure (e.g. /src directory, Pages
Router, or Vite + React), adapt the file paths and entry point — but
keep every component file's CODE 100% IDENTICAL to what's provided
below. Do not rewrite, refactor, or reinterpret any component.

The only adaptations allowed are:

- File paths (e.g. /src/components/... instead of /components/...)
- Entry point file (e.g. src/App.tsx instead of app/page.tsx)
- Removing "use client" directives if your builder doesn't use Next.js
- Replacing the @/components/... alias with the correct relative path
- Replacing Next.js-specific imports (e.g. next/image, next/link) with
  standard equivalents (<img>, <a>) — only if your builder doesn't
  support Next.js
- Installing any missing dependencies via your builder's package manager
  before applying the files

Everything else — JSX, hooks, component names, default exports, props,
className values, animations, styling, logic — stays exactly as written.
The output must run without any errors.

If your builder cannot support React + JSX at all, stop and tell the user
before proceeding.

## Add Template: AI Marketing Landing Page - Kelo

### File 1 of 8: /components/templates/ai-marketing-landing-page-kelo/Hero.tsx

"use client";

import React, { useEffect, useRef } from "react";
import {
LayoutDashboard,
FolderRoot,
Activity,
CheckSquare,
Users,
MessageSquare,
Tag,
Calendar,
Settings,
HelpCircle,
Search,
Bell,
Download,
MoreHorizontal,
ArrowUpRight,
Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// ============================================================================
// SIDEBAR ITEM
// ============================================================================
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
return (
<button
className={"w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all " + (active ? "bg-white/10 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/5")} >
{icon}
{label}
</button>
);
}

// ============================================================================
// LEGEND ITEM
// ============================================================================
function LegendItem({ color, label, value }: { color: string; label: string; value: string }) {
return (
<div className="flex items-center justify-between text-xs">
<div className="flex items-center gap-2">
<div className={"w-2 h-2 rounded-full " + color} />
<span className="text-white/60">{label}</span>
</div>
<span className="font-medium">{value}</span>
</div>
);
}

// ============================================================================
// DASHBOARD
// ============================================================================
function Dashboard() {
const containerVariants: Variants = {
hidden: { opacity: 0, y: 40 },
show: {
opacity: 1,
y: 0,
transition: {
duration: 0.8,
delay: 0.4,
ease: "easeOut" as const,
staggerChildren: 0.1,
delayChildren: 0.6
}
}
};

const itemVariants: Variants = {
hidden: { opacity: 0, y: 20 },
show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

return (
<motion.div
variants={containerVariants}
initial="hidden"
animate="show"
className="w-full max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row text-white/90" >
{/_ Sidebar _/}
<aside className="w-64 border-r border-white/10 flex-col p-6 hidden lg:flex shrink-0">
<motion.div variants={itemVariants} className="flex items-center mb-10 px-2">
<img
            src="https://cdn.jiro.build/Kelo/Kelo%20White.svg"
            alt="Kelo Logo"
            className="h-6 w-auto"
            referrerPolicy="no-referrer"
          />
</motion.div>

        <nav className="flex-1 space-y-1">
          {[
            { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
            { icon: <FolderRoot size={18} />, label: "Project" },
            { icon: <Activity size={18} />, label: "Activity" },
            { icon: <CheckSquare size={18} />, label: "My task" },
            { icon: <Users size={18} />, label: "Teams" },
            { icon: <MessageSquare size={18} />, label: "Message" },
            { icon: <Tag size={18} />, label: "Deals" },
            { icon: <Calendar size={18} />, label: "Calendar" },
            { icon: <Settings size={18} />, label: "Settings" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SidebarItem icon={item.icon} label={item.label} active={item.active} />
            </motion.div>
          ))}
        </nav>

        <motion.div variants={itemVariants} className="pt-6 border-t border-white/10 space-y-1 mt-auto">
          <SidebarItem icon={<HelpCircle size={18} />} label="Help Center" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </motion.div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <motion.header variants={itemVariants} className="h-16 border-b border-white/10 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white/60 hover:text-white transition-colors">
              <Download size={20} />
            </button>
            <button className="text-white/60 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border-2 border-black" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Esther Howard</p>
                <p className="text-xs text-white/40">esther@email.com</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-6">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <div className="flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                <Calendar size={16} className="text-white/40" />
                <span>Mar 25, 2025</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors"
              >
                <Sparkles size={16} />
                AI Support
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Total Revenue Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/60 text-sm font-medium">Total revenue</h3>
                </div>
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-3xl font-bold">$46,526.08</span>
                  <span className="text-xs text-white/40 mb-1">Revenue last month $49,236.00</span>
                  <div className="ml-auto flex items-center gap-1 text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} />
                    +55.06%
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-indigo-500"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="h-full bg-orange-400 ml-1"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "10%" }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="h-full bg-pink-400 ml-1"
                  />
                </div>
                <div className="flex justify-between mt-4 text-xs">
                  <span className="text-white/40">Next target to achieve</span>
                  <span className="font-semibold">$55,236.29</span>
                </div>
              </motion.div>

              {/* Monthly Sales Chart */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-semibold">Monthly sales</h3>
                  <div className="flex bg-white/5 p-1 rounded-lg">
                    <button className="px-3 py-1 text-xs text-white/40">Weekly</button>
                    <button className="px-3 py-1 text-xs bg-white/10 rounded-md shadow-sm">Monthly</button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-h-[320px]">
                  <div className="flex-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5, ease: "easeInOut" as const }}
                        d="M0,150 L160,140 L320,160 L480,100 L640,120 L800,80"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.circle
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3 }}
                        cx={480} cy={100} r={4} fill="#f97316"
                      />
                      <motion.line
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 3 }}
                        x1={480} y1={100} x2={480} y2={200} stroke="#f97316" strokeDasharray="4"
                      />
                    </svg>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.2 }}
                      className="absolute top-4 left-[60%] -translate-x-1/2 bg-white text-black px-3 py-2 rounded-lg text-xs font-bold shadow-xl"
                    >
                      <p className="text-[10px] text-black/40 font-normal">Revenue</p>
                      $45,000
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-6 text-[10px] text-white/40 px-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Sales Overview */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <h3 className="font-semibold mb-6">Sales overview</h3>
                <div className="flex items-end justify-between mb-8">
                  <span className="text-2xl font-bold">$18,000</span>
                  <span className="text-blue-400 text-xs flex items-center gap-1">+28.09% <ArrowUpRight size={12} /></span>
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                  {[40, 60, 30, 80, 50, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-white/5 rounded-t-sm relative overflow-hidden" style={{ height: String(h) + "%" }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ duration: 0.8, delay: 1.5 + (i * 0.1) }}
                          className="absolute bottom-0 w-full bg-indigo-500/40"
                        />
                      </div>
                      <span className="text-[10px] text-white/40">{[4, 8, 16, 32, 64, 128][i]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <LegendItem color="bg-indigo-500" label="Total proposal" value="140K" />
                  <LegendItem color="bg-blue-500" label="Total qualified" value="150K" />
                  <LegendItem color="bg-orange-500" label="Closed won" value="120K" />
                </div>
              </motion.div>

              {/* Returning Visits */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Returning visits</h3>
                  <MoreHorizontal size={16} className="text-white/40" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/60">July</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1, delay: 2 }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/60">October</span>
                      <span>36%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "36%" }}
                        transition={{ duration: 1, delay: 2.2 }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                  </div>
                  <button className="w-full py-2 border border-white/10 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors">
                    See All Visits
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>

);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AiMarketingHeroKelo({ className }: { className?: string }) {
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
if (videoRef.current) {
videoRef.current.playbackRate = 0.6;
}
}, []);

return (
<>
<section className={"min-h-[110vh] flex flex-col bg-black relative " + (className || "")}>
{/_ Video Background _/}
<video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
<source src="https://cdn.jiro.build/Kelo/Hero%202%20Video.mp4" type="video/mp4" />
</video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />

        {/* Navigation Bar — centering wrapper holds translate, motion handles only the entrance animation */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <div className="relative flex items-center justify-between p-[10px] rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              {/* Left: Logo */}
              <div className="flex items-center pl-3">
                <img
                  src="https://cdn.jiro.build/Kelo/Kelo%20White.svg"
                  alt="Kelo Logo"
                  className="h-[24px] w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Center: Nav Links — absolutely centered relative to pill */}
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                {["Features", "Solutions", "Pricing", "About"].map((item) => (
                  <a
                    key={item}
                    href={"#" + item.toLowerCase()}
                    className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Right: Buttons */}
              <div className="flex items-center gap-3">
                <button className="text-[15px] font-medium text-white/70 hover:text-white transition-colors px-3 py-2">
                  Log in
                </button>
                <button className="rounded-full px-5 py-2 text-[15px] font-semibold bg-white text-black hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                  Get Started
                </button>
              </div>
            </div>
          </motion.nav>
        </div>

        {/* Hero Content */}
        <div className="relative flex-1 flex flex-col items-center text-center px-6 pt-[180px] pb-16 z-10">
          <div className="flex flex-col items-center w-full">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
              className="text-center font-semibold text-5xl md:text-6xl lg:text-[62px] leading-[1.1] tracking-[-0.02em] text-white max-w-4xl mt-0 mb-4"
            >
              Let AI take your sales<br />
              to the <span className="italic">next level</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
              className="text-center text-base md:text-lg text-white/90 max-w-[480px] leading-relaxed mb-8"
            >
              The smarter way to manage sales starts with using tools that streamline every step of the process
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
              className="flex flex-col items-center gap-3"
            >
              <button
                className="rounded-full px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all shadow-2xl hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
              >
                Get 14 Days Free Trial
              </button>
              <span className="text-sm text-white/60">
                No Credit Card Required
              </span>
            </motion.div>

            {/* Dashboard */}
            <div className="mt-10 w-full">
              <Dashboard />
            </div>

          </div>
        </div>
      </section>
    </>

);
}

### File 2 of 8: /components/templates/ai-marketing-landing-page-kelo/Features.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
Activity,
Command,
MousePointer2,
Users,
Zap
} from "lucide-react";

const ACCENT_COLOR = "#00bc7d";

function GridLine({ vertical = false }: { vertical?: boolean }) {
return (
<div
className={
"absolute " +
(vertical ? "w-px h-full top-0" : "h-px w-full left-0") +
" bg-gray-200/60"
}
/>
);
}

function FeatureCard({
title,
description,
icon: Icon,
children,
className = "",
}: {
title: string;
description: string;
icon: React.ElementType;
children?: React.ReactNode;
className?: string;
}) {
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className={"relative p-8 group overflow-hidden flex flex-col " + className} >
<div className="relative z-10 flex flex-col h-full">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#00bc7d] transition-colors duration-300">
<Icon size={20} />
</div>
<h3 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
</div>
<p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[280px]">
{description}
</p>
<div className="flex-1 flex flex-col">
{children}
</div>
</div>
<div className="absolute inset-0 bg-gradient-to-br from-[#00bc7d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</motion.div>
);
}

export default function Features02Kelo({ className }: { className?: string }) {
const [activeMetric, setActiveMetric] = useState(0);

const metrics = [
{ label: "Throughput", value: "1.2GB/s", trend: "+12%" },
{ label: "Latency", value: "14ms", trend: "-2ms" },
{ label: "Uptime", value: "99.99%", trend: "Stable" },
];

return (
<>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />

      <section
        className={"bg-white py-24 px-6 md:px-12 font-sans overflow-hidden " + (className || "")}
      >
        <div className="max-w-7xl mx-auto relative">

          {/* Header Section */}
          <div className="mb-20 relative">
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[48px] font-semibold text-gray-900 tracking-tight leading-[1.1]"
              >
                Engineered for <br />
                Unrivaled Performance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 leading-relaxed max-w-md"
              >
                Our infrastructure combines raw power with elegant simplicity,
                giving your team the tools to scale without friction.
              </motion.p>
            </div>
          </div>

          {/* Main Grid Showcase */}
          <div className="relative border border-gray-200 rounded-[32px] overflow-hidden bg-gray-50/30">

            <GridLine />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gray-200/60 hidden md:block" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200/60 hidden md:block" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-gray-200/60 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">

              {/* Feature 1: Real-time Analytics (Large) */}
              <FeatureCard
                title="Real-time Analytics"
                description="Monitor every interaction as it happens with our low-latency data pipeline."
                icon={Activity}
                className="md:col-span-2 md:row-span-2 border-b md:border-b-0 md:border-r border-gray-200"
              >
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative overflow-hidden group/chart flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-2">
                      {metrics.map((m, i) => (
                        <button
                          key={m.label}
                          onClick={() => setActiveMetric(i)}
                          className={
                            "px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all " +
                            (activeMetric === i
                              ? "bg-[#00bc7d] text-white"
                              : "bg-gray-50 text-gray-400 hover:bg-gray-100")
                          }
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">
                        {metrics[activeMetric].value}
                      </p>
                      <p
                        className={
                          "text-[10px] font-bold " +
                          (metrics[activeMetric].trend.startsWith("+")
                            ? "text-[#00bc7d]"
                            : "text-gray-400")
                        }
                      >
                        {metrics[activeMetric].trend} vs last hour
                      </p>
                    </div>
                  </div>

                  {/* Animated Bars */}
                  <div className="flex-1 flex items-end gap-1.5 min-h-[200px]">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: "20%" }}
                        animate={{
                          height:
                            activeMetric === 0
                              ? (Math.random() * 60 + 40) + "%"
                              : activeMetric === 1
                              ? (Math.random() * 30 + 10) + "%"
                              : "80%",
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity as number,
                          repeatType: "reverse" as const,
                          delay: i * 0.05,
                        }}
                        className={
                          "flex-1 rounded-t-sm " +
                          (i > 18
                            ? "bg-gray-100"
                            : "bg-[#00bc7d]/20 group-hover/chart:bg-[#00bc7d]/40 transition-colors")
                        }
                      />
                    ))}
                  </div>

                  {/* Monospace Data Overlay */}
                  <div className="absolute bottom-2 right-4 font-mono text-[9px] text-gray-300 uppercase tracking-widest">
                    Live_Stream_Active // 0x44F2
                  </div>
                </div>
              </FeatureCard>

              {/* Feature 2: Smart Automations */}
              <FeatureCard
                title="Smart Automations"
                description="Deploy complex workflows in seconds using our visual logic builder."
                icon={Zap}
                className="md:col-span-2 border-b border-gray-200"
              >
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { label: "Trigger: New Lead", status: "Active", color: "#00bc7d" },
                    { label: "Action: Send Email", status: "Pending", color: "#fbbf24" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-medium text-gray-700">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </FeatureCard>

              {/* Feature 3: Developer API */}
              <FeatureCard
                title="Developer API"
                description="Build custom integrations with our robust, type-safe GraphQL API."
                icon={Command}
                className="border-b md:border-b-0 md:border-r border-gray-200"
              >
                <div className="mt-4 bg-gray-900 rounded-xl p-4 font-mono text-[10px] leading-tight overflow-hidden relative group/api">
                  <div className="flex gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <span className="text-purple-400">query</span>
                      <span className="text-blue-400">GetMetrics</span>
                      <span className="text-gray-400">{"{"}</span>
                    </div>
                    <div className="pl-4 flex gap-2">
                      <span className="text-blue-400">system</span>
                      <span className="text-gray-400">{"{"}</span>
                    </div>
                    <div className="pl-8 text-[#00bc7d]">uptime</div>
                    <div className="pl-8 text-[#00bc7d]">latency</div>
                    <div className="pl-4 text-gray-400">{"}"}</div>
                    <div className="text-gray-400">{"}"}</div>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity as number,
                    }}
                    className="absolute bottom-4 left-[90px] w-1.5 h-3 bg-[#00bc7d]/60"
                  />
                </div>
              </FeatureCard>

              {/* Feature 4: Team Collaboration */}
              <FeatureCard
                title="Team Collaboration"
                description="Sync your entire organization with shared workspaces and live presence."
                icon={Users}
                className=""
              >
                <div className="mt-4 relative h-24 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-dashed border-gray-200 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-20 h-20 rounded-full border border-dashed border-gray-100 animate-[spin_15s_linear_infinite_reverse]" />
                  </div>
                  <div className="relative flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="relative"
                      >
                        <img
                          src={"https://picsum.photos/seed/collab" + i + "/100/100"}
                          alt={"Team member " + i}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {i === 1 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00bc7d] rounded-full border-2 border-white" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                    <MousePointer2 size={10} className="text-[#00bc7d] fill-[#00bc7d]" />
                    <span className="text-[9px] font-bold text-gray-600">Alex is editing...</span>
                  </div>
                </div>
              </FeatureCard>

            </div>
          </div>

        </div>
      </section>
    </>

);
}

### File 3 of 8: /components/templates/ai-marketing-landing-page-kelo/How it Works.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Target, Mail, Zap, BarChart3, CheckCircle2, Search, Brain, Sparkles, TrendingUp, Compass, Wand2, Workflow, BarChart4, ArrowRight } from "lucide-react";

interface StepData {
id: string;
tabLabel: string;
tabIcon: React.ReactNode;
badge: string;
heading: string;
description: string;
image: string;
mockupType: "discovery" | "outreach" | "workflows" | "insights";
}

const steps: StepData[] = [
{
id: "step-1",
tabLabel: "1. Connect & Scan",
tabIcon: <Compass className="w-5 h-5" />,
badge: "PHASE 01: ANALYSIS",
heading: "AI scans your market for hidden gems.",
description: "Our neural engine connects to your data sources and scans millions of profiles to identify high-intent prospects that match your ideal customer profile.",
image: "https://cdn.jiro.build/Kelo/a-breathtaking-3d-rendered-landscape-of-smooth-rol.jpg",
mockupType: "discovery",
},
{
id: "step-2",
tabLabel: "2. Personalize",
tabIcon: <Wand2 className="w-5 h-5" />,
badge: "PHASE 02: STRATEGY",
heading: "Crafting unique strategies for every lead.",
description: "AI analyzes individual prospect behavior, recent news, and social signals to generate hyper-personalized outreach strategies that resonate.",
image: "https://cdn.jiro.build/Kelo/a-worn-vintage-yellow-wooden-desk-sitting-in-an-op.jpeg",
mockupType: "outreach",
},
{
id: "step-3",
tabLabel: "3. Automate",
tabIcon: <Workflow className="w-5 h-5" />,
badge: "PHASE 03: EXECUTION",
heading: "Autonomous agents handle the engagement.",
description: "Deploy AI agents that execute your outreach, handle initial responses, and schedule meetings directly into your calendar.",
image: "https://cdn.jiro.build/Kelo/interior-of-an-old-abandoned-vintage-train-carriag.jpeg",
mockupType: "workflows",
},
{
id: "step-4",
tabLabel: "4. Optimize",
tabIcon: <BarChart4 className="w-5 h-5" />,
badge: "PHASE 04: SCALE",
heading: "Continuous learning for better results.",
description: "The system learns from every interaction, automatically optimizing your messaging and targeting to maximize conversion rates over time.",
image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
mockupType: "insights",
},
];

const discoveryVariants: Variants = {
hidden: { opacity: 0, y: 10 },
visible: { opacity: 1, y: 0 },
};

const staggerVisible: Variants = {
hidden: {},
visible: { transition: { staggerChildren: 0.1 } },
};

function DiscoveryMockup() {
return (
<div className="space-y-6">
<div className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-white/50 shadow-sm">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-[#00bc7d]/10 flex items-center justify-center text-[#00bc7d]">
<Search className="w-4 h-4" />
</div>
<span className="text-xs font-bold text-[#111]">Scanning Market...</span>
</div>
<div className="flex items-center gap-1">
<div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] animate-pulse" />
<span className="text-[10px] font-bold text-[#00bc7d]">ACTIVE</span>
</div>
</div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerVisible}
        className="grid grid-cols-1 gap-3"
      >
        {[
          { name: "TechCorp Inc.", match: "98%", status: "High Intent" },
          { name: "Global Systems", match: "92%", status: "Match" },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={discoveryVariants}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#111] font-bold text-xs">
                {item.name[0]}
              </div>
              <div>
                <p className="font-bold text-sm text-[#111]">{item.name}</p>
                <p className="text-[10px] text-[#888]">{item.status}</p>
              </div>
            </div>
            <div className="bg-[#00bc7d]/5 px-3 py-1 rounded-full border border-[#00bc7d]/10">
              <span className="text-xs font-black text-[#00bc7d]">{item.match}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

);
}

const outreachLineVariants: Variants = {
hidden: { opacity: 0, x: -5 },
visible: { opacity: 1, x: 0 },
};

const outreachStagger: Variants = {
hidden: {},
visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

function OutreachMockup() {
return (
<div className="space-y-5">
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" >
<div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
<span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">AI Draft Engine</span>
<Sparkles className="w-3 h-3 text-[#00bc7d]" />
</div>
<div className="p-5 space-y-3">
<div className="flex items-center gap-2 mb-2">
<div className="w-6 h-6 rounded-full bg-gray-200" />
<div className="h-2 w-24 bg-gray-100 rounded-full" />
</div>
<motion.div
initial="hidden"
animate="visible"
variants={outreachStagger}
className="space-y-2" >
{[1, 2, 3].map((i) => (
<motion.div
key={i}
variants={outreachLineVariants}
className={"h-2 rounded-full " + (i === 3 ? "w-4/5 bg-gray-50" : "w-full bg-gray-50")}
/>
))}
<motion.div
variants={outreachLineVariants}
className="h-2 w-3/4 bg-[#00bc7d]/10 rounded-full"
/>
</motion.div>
</div>
</motion.div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.5 }}
className="flex items-center justify-between px-2" >
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
<Mail className="w-4 h-4 text-[#888]" />
</div>
<span className="text-[11px] font-bold text-[#111]">Personalization Ready</span>
</div>
<div className="px-3 py-1.5 bg-[#00bc7d] text-white rounded-lg text-[10px] font-bold shadow-lg shadow-[#00bc7d]/20">
Approve Draft
</div>
</motion.div>
</div>
);
}

const workflowNodeVariants: Variants = {
hidden: { opacity: 0, scale: 0.8 },
visible: { opacity: 1, scale: 1 },
};

function WorkflowsMockup() {
return (
<div className="space-y-6">
<motion.div
initial="hidden"
animate="visible"
variants={staggerVisible}
className="flex items-center justify-around py-4 relative" >
<div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2" />
{[
{ icon: <Search />, active: true },
{ icon: <Wand2 />, active: true },
{ icon: <Workflow />, active: true },
{ icon: <CheckCircle2 />, active: false },
].map((item, i) => (
<motion.div
key={i}
variants={workflowNodeVariants}
className={"relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 " + (item.active ? "bg-white border-[#00bc7d] text-[#00bc7d] shadow-md" : "bg-gray-50 border-gray-100 text-gray-300")} >
{React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
</motion.div>
))}
</motion.div>
<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4 }}
className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4" >
<div className="flex items-center justify-between">
<span className="text-[11px] font-bold text-[#111]">Automation Status</span>
<span className="text-[10px] font-bold text-[#00bc7d] bg-[#00bc7d]/5 px-2 py-0.5 rounded">94% Efficient</span>
</div>
<div className="space-y-2">
<div className="flex justify-between text-[10px] font-bold text-[#888]">
<span>Processing Tasks</span>
<span>12/15</span>
</div>
<div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
<motion.div
initial={{ width: 0 }}
animate={{ width: "80%" }}
className="h-full bg-[#00bc7d]"
/>
</div>
</div>
</motion.div>
</div>
);
}

const insightCardVariants: Variants = {
hidden: { opacity: 0, y: 10 },
visible: { opacity: 1, y: 0 },
};

function InsightsMockup() {
return (
<div className="space-y-5">
<motion.div
initial="hidden"
animate="visible"
variants={staggerVisible}
className="grid grid-cols-2 gap-4" >
{[
{ icon: <TrendingUp />, value: "8.4x", label: "ROI Lift", color: "#00bc7d", isGreen: true },
{ icon: <Brain />, value: "92%", label: "Accuracy", color: "#111", isGreen: false },
].map((stat, i) => (
<motion.div
key={i}
variants={insightCardVariants}
className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm" >
<div
className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
style={{ backgroundColor: stat.isGreen ? "rgba(0, 188, 125, 0.05)" : "#f9fafb", color: stat.color }} >
{React.cloneElement(stat.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
</div>
<p className="text-2xl font-black text-[#111]">{stat.value}</p>
<p className="text-[10px] font-bold text-[#888] uppercase">{stat.label}</p>
</motion.div>
))}
</motion.div>
<motion.div
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.3 }}
className="bg-[#111] p-5 rounded-2xl text-white shadow-xl" >
<div className="flex items-center gap-2 mb-3">
<div className="w-2 h-2 rounded-full bg-[#00bc7d]" />
<span className="text-[10px] font-bold uppercase tracking-widest text-[#00bc7d]">AI Recommendation</span>
</div>
<p className="text-xs text-gray-300 leading-relaxed">
"Shift focus to mid-market segments. Engagement data suggests a 24% higher conversion probability this week."
</p>
</motion.div>
</div>
);
}

export default function HowItWroks03Kelo({ className }: { className?: string }) {
const [activeTab, setActiveTab] = useState(0);

const renderMockup = () => {
switch (steps[activeTab].mockupType) {
case "discovery": return <DiscoveryMockup />;
case "outreach": return <OutreachMockup />;
case "workflows": return <WorkflowsMockup />;
case "insights": return <InsightsMockup />;
default: return null;
}
};

return (
<>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={"bg-white py-24 px-6 md:px-20 font-sans overflow-hidden " + (className || "")}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-medium text-4xl md:text-[48px] text-[#111111] leading-tight mb-4 tracking-tight">
              AI-Powered Sales Automation
            </h2>
            <p className="text-[16px] text-[#888888] max-w-[520px] mx-auto leading-relaxed">
              Harness the power of neural networks to automate your entire sales pipeline from discovery to close.
            </p>
          </div>

          <div className="bg-[#f4f4f4] rounded-t-[32px] flex flex-row overflow-x-auto no-scrollbar border-x border-t border-[#e5e5e5] p-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                className={"flex-1 min-w-[180px] md:min-w-0 py-4 px-6 flex items-center justify-center gap-3.5 transition-all duration-500 relative rounded-[22px] group outline-none border " + (activeTab === index ? "bg-white border-gray-100 text-[#111]" : "border-transparent text-[#777] hover:text-[#333] hover:bg-white/50")}
              >
                <div className={"w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 " + (activeTab === index ? "bg-[#00bc7d] text-white shadow-[0_8px_20px_-4px_rgba(0,188,125,0.4)]" : "bg-white border border-gray-200 text-[#888] group-hover:border-[#00bc7d]/30 group-hover:text-[#00bc7d]")}>
                  <motion.div
                    animate={activeTab === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity as number, duration: 2 }}
                  >
                    {React.cloneElement(step.tabIcon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                  </motion.div>
                </div>
                <span className={"text-[15px] whitespace-nowrap tracking-tight transition-all duration-300 " + (activeTab === index ? "font-bold" : "font-medium")}>
                  {step.tabLabel}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="bg-white rounded-b-[32px] border-x border-b border-[#eeeeee] min-h-[520px] p-8 md:p-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="grid lg:grid-cols-[45%_55%] gap-16 items-center"
              >
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="inline-block border border-[#00bc7d]/20 rounded-full px-4 py-1 text-[11px] font-bold tracking-[2px] text-[#00bc7d] bg-[#00bc7d]/5 mb-4 uppercase">
                      {steps[activeTab].badge}
                    </span>
                    <h3 className="font-medium text-3xl md:text-[40px] text-[#111111] leading-[1.2] mt-2 tracking-tight line-clamp-2">
                      {steps[activeTab].heading}
                    </h3>
                  </div>

                  <p className="text-[16px] text-[#666666] leading-[1.7] max-w-[440px]">
                    {steps[activeTab].description}
                  </p>

                  <div className="mt-4">
                    <button className="relative overflow-hidden bg-[#111] text-white rounded-2xl px-10 py-5 text-[16px] font-bold flex items-center gap-3 hover:bg-[#00bc7d] transition-all duration-500 group">
                      <span className="relative z-10">Start Automating Now</span>
                      <div className="relative z-10 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-[600px] aspect-[4/3] bg-[#f9f9f9] rounded-[48px] p-10 md:p-14 flex items-center justify-center overflow-hidden group border border-gray-100">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={steps[activeTab].image}
                        alt="Step visualization"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity as number, duration: 4, ease: "easeInOut" as const }}
                      className="w-full relative z-10 bg-white/60 backdrop-blur-[24px] border border-white/80 rounded-[32px] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden"
                    >
                      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rotate-45 pointer-events-none" />
                      <div className="relative z-10">
                        {renderMockup()}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>

);
}

### File 4 of 8: /components/templates/ai-marketing-landing-page-kelo/Integration.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Integration03Kelo({ className }: { className?: string }) {
const integrations = [
{
name: "Framer",
description: "Deploy websites and manage content automatically.",
icon: (
<div className="w-[52px] h-[52px] bg-[#f3f4f6] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/framer/0055FF" alt="Framer" className="w-6 h-6" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Gmail",
description: "Write emails, sort your inbox, and summarize conversations.",
icon: (
<div className="w-[52px] h-[52px] bg-[#fef2f2] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Gmail" className="w-7 h-7" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Notion",
description: "Read pages, add to databases, and create summaries.",
icon: (
<div className="w-[52px] h-[52px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/notion/000000" alt="Notion" className="w-6 h-6" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Vercel",
description: "Deploy and host web applications with ease and speed.",
icon: (
<div className="w-[52px] h-[52px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/vercel/000000" alt="Vercel" className="w-6 h-6" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Discord",
description: "Connect with your community and manage server interactions.",
icon: (
<div className="w-[52px] h-[52px] bg-[#f5f6ff] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/discord/5865F2" alt="Discord" className="w-7 h-7" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Dropbox",
description: "Save and share files in your cloud storage.",
icon: (
<div className="w-[52px] h-[52px] bg-[#eff6ff] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/dropbox/0061FE" alt="Dropbox" className="w-7 h-7" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Airtable",
description: "Update database records and track information.",
icon: (
<div className="w-[52px] h-[52px] bg-[#fff7ed] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/airtable/18BFFF" alt="Airtable" className="w-7 h-7" referrerPolicy="no-referrer" />
</div>
)
},
{
name: "Shopify",
description: "Manage products, orders, and inventory.",
icon: (
<div className="w-[52px] h-[52px] bg-[#f0fdf4] rounded-[12px] flex items-center justify-center mb-7">
<img src="https://cdn.simpleicons.org/shopify/7AB55C" alt="Shopify" className="w-7 h-7" referrerPolicy="no-referrer" />
</div>
)
}
];

return (
<section className={"bg-[#ffffff] py-20 px-[60px] font-sans " + (className || "")}>
<div className="max-w-[1200px] mx-auto">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
<div className="w-full md:w-[55%]">
<h2 className="text-[#111111] font-semibold text-[36px] md:text-[48px] leading-[1.1] mb-4 tracking-tight">
Works With Your Entire Tech Stack
</h2>
<p className="text-[#666666] text-[15px] leading-[1.65] max-w-[480px]">
Kilo integrates with 5000+ apps. Link your accounts in one click and let your agents work across all your platforms.
</p>
</div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-[#f3f4f6] text-[#111111] border border-[#e5e7eb] rounded-full px-[22px] py-3 text-sm font-medium hover:bg-[#e5e7eb] transition-colors cursor-pointer">
              Request app
            </button>
            <button className="flex-1 md:flex-none bg-[#00bc7d] text-white rounded-full px-[22px] py-3 text-sm font-semibold hover:bg-[#00a36c] transition-all hover:shadow-lg cursor-pointer">
              See all integrations
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#ffffff] border border-[#f0f0f0] rounded-[16px] p-8 md:px-7 md:py-8 flex flex-col hover:border-[#00bc7d] hover:shadow-xl transition-all duration-300 group cursor-default"
            >
              {app.icon}
              <h3 className="text-[#111111] font-bold text-lg mb-2">
                {app.name}
              </h3>
              <p className="text-[#666666] text-sm leading-[1.6]">
                {app.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

);
}

### File 5 of 8: /components/templates/ai-marketing-landing-page-kelo/Metric.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
{
index: "001",
value: "1500+",
label: "HOURS SAVED FOR CLIENTS MONTHLY",
barHeights: [40, 60, 30, 80],
litCount: 1,
},
{
index: "002",
value: "94%",
label: "AVERAGE ERROR REDUCTION RATE",
barHeights: [30, 50, 80, 40],
litCount: 2,
},
{
index: "003",
value: "312%",
label: "AVERAGE ROI IN FIRST 90 DAYS",
barHeights: [20, 40, 60, 90],
litCount: 3,
},
{
index: "004",
value: "3X",
label: "AVERAGE OUTPUT WITHOUT NEW HIRES",
barHeights: [30, 50, 70, 100],
litCount: 4,
},
];

function MiniBarChart({ heights, litCount }: { heights: number[]; litCount: number }) {
return (
<div className="flex items-end gap-[2px] h-4">
{heights.map((h: number, i: number) => (
<div
key={i}
className="w-[3px] rounded-full transition-colors duration-500"
style={{
            height: h + "%",
            backgroundColor: i < litCount ? "hsl(var(--accent))" : "hsl(var(--border))",
          }}
/>
))}
</div>
);
}

export default function StatsMetrics02Kelo({ className }: { className?: string }) {
return (
<section className={"w-full bg-white py-20 font-sans " + (className || "")}>
{/_ Header Area _/}
<div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="text-5xl md:text-6xl font-bold text-black leading-tight tracking-tight" >
Real Systems.<br />Real Results.
</motion.h2>
<motion.p
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.2 }}
className="text-sm md:text-base text-gray-500 max-w-xs md:text-right leading-relaxed" >
Clear performance indicators reflecting consistent workflow automation and sustainable business growth.
</motion.p>
</div>

      {/* Metrics Panel with Background Image */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[400px] md:h-[450px] w-full">
          {/* Background Image */}
          <img
            src="https://cdn.jiro.build/Kelo/the-interior-of-a-vintage-retro-train-carriage-wit.jpg"
            alt="Vintage train interior"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* White Stats Panel */}
          <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white w-full rounded-[16px] shadow-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
            >
              {stats.map((stat) => (
                <div
                  key={stat.index}
                  className="px-8 py-12 flex flex-col justify-between min-h-[220px]"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-medium text-gray-400 tracking-widest">
                      {stat.index}
                    </span>
                    <MiniBarChart heights={stat.barHeights} litCount={stat.litCount} />
                  </div>

                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-black mb-4 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-[0.15em] leading-tight uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>

);
}

### File 6 of 8: /components/templates/ai-marketing-landing-page-kelo/Pricing.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function Pricing02Kelo({ className }: { className?: string }) {
const containerVariants: Variants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.15,
delayChildren: 0.1
}
}
};

const itemVariants: Variants = {
hidden: { opacity: 0, y: 20 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.6, ease: "easeOut" as const }
}
};

return (
<>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"w-full bg-white py-[80px] px-6 md:px-[60px] font-sans overflow-hidden " + (className || "")}>
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-[56px] flex flex-col items-center"
          >
            <h2 className="font-sans font-semibold text-[48px] text-[#111111] leading-[1.15] mb-3 max-w-[800px]">
              Simple, Unified Pricing for <br /> Smarter Workflows
            </h2>
            <p className="text-[16px] text-[#888888] font-normal">
              Choose the plan that fits your team&apos;s needs
            </p>
          </motion.div>

          {/* Pricing Cards Row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full flex flex-col lg:flex-row gap-6 items-stretch"
          >

            {/* CARD 1 - Pro */}
            <motion.div
              variants={itemVariants}
              className="flex-1 bg-[#f7f7f8] rounded-[20px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px] border border-black/5"
            >
              <div className="relative z-10">
                <h3 className="font-medium text-[28px] text-[#111111] mb-3">Pro</h3>
                <p className="text-[14px] text-[#111111] font-medium leading-[1.5] mb-6 opacity-90">
                  Perfect for lean teams looking to reduce manual work and bring scattered workflows together
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="font-medium text-[44px] text-[#111111] tracking-tight">$50</span>
                  <span className="text-[15px] text-[#888888] font-normal ml-2">per month</span>
                </div>

                <div className="h-[1px] w-full bg-[#e0e0e0] mb-6" />

                <ul className="space-y-[10px]">
                  {[
                    "Core workflow automation tools",
                    "Integrate up to 3 team members",
                    "Real-time sync across key apps",
                    "Monthly performance reports"
                  ].map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-[#666666] font-medium">
                      <span className="text-[#999999] text-[10px]">&#8226;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10">
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-[#00bc7d] blur-xl opacity-30 rounded-full" />
                <button className="relative z-10 bg-[#00bc7d] hover:bg-[#00a66e] text-white rounded-[14px] py-[14px] px-7 text-[15px] font-bold flex items-center gap-2.5 transition-all duration-200">
                  Get in Touch
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <path d="M7 7v6a4 4 0 0 0 4 4h9" />
                    <path d="m17 14 3 3-3 3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* CARD 2 - Premium */}
            <motion.div
              variants={itemVariants}
              className="flex-1 bg-[#f7f7f8] rounded-[20px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px] border border-black/5"
            >
              <div className="relative z-10">
                <h3 className="font-medium text-[28px] text-[#111111] mb-3">Premium</h3>
                <p className="text-[14px] text-[#111111] font-medium leading-[1.5] mb-6 opacity-90">
                  Built for scaling teams that need efficiency and deeper insight without the tool fatigue.
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="font-medium text-[44px] text-[#111111] tracking-tight">$80</span>
                  <span className="text-[15px] text-[#888888] font-normal ml-2">per month</span>
                </div>

                <div className="h-[1px] w-full bg-[#e0e0e0] mb-6" />

                <ul className="space-y-[10px]">
                  {[
                    "Everything in Pro",
                    "Advanced automation & analytics",
                    "Unlimited users",
                    "Multi-tool integrations"
                  ].map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-[#666666] font-medium">
                      <span className="text-[#999999] text-[10px]">&#8226;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10">
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-[#00bc7d] blur-xl opacity-30 rounded-full" />
                <button className="relative z-10 bg-[#00bc7d] hover:bg-[#00a66e] text-white rounded-[14px] py-[14px] px-7 text-[15px] font-bold flex items-center gap-2.5 transition-all duration-200">
                  Get in Touch
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <path d="M7 7v6a4 4 0 0 0 4 4h9" />
                    <path d="m17 14 3 3-3 3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* CARD 3 - Enterprise (DARK) */}
            <motion.div
              variants={itemVariants}
              className="flex-1 rounded-[20px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px] group"
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('https://cdn.jiro.build/Kelo/67594d4535b941c71eee76123efaf48a.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div className="absolute inset-0 bg-black/70 z-0" />

              <div className="relative z-10">
                <h3 className="font-medium text-[28px] text-white mb-3">Enterprise</h3>
                <p className="text-[14px] text-white font-medium leading-[1.5] mb-6">
                  End-to-end solution for large teams ready to unify operations and accelerate growth
                </p>

                <div className="flex items-baseline mb-6">
                  <span className="font-medium text-[44px] text-white tracking-tight">$150</span>
                  <span className="text-[16px] text-white/80 font-normal ml-2">per month</span>
                </div>

                <div className="h-[1px] w-full bg-white/30 mb-6" />

                <ul className="space-y-[10px]">
                  {[
                    "Everything in Premium",
                    "Advanced automation & analytics",
                    "Full API access",
                    "Dedicated onboarding specialist"
                  ].map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-white font-medium">
                      <span className="text-white/60 text-[10px]">&#8226;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <button className="relative z-10 bg-[#00bc7d] hover:bg-[#00a66e] text-white rounded-[12px] py-[14px] px-8 text-[15px] font-bold transition-all duration-200">
                  Get in Touch
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>

);
}

### File 7 of 8: /components/templates/ai-marketing-landing-page-kelo/FAQ.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
{
question: "Do I need experience?",
answer: "Not at all. Erie is built for everyone — from first-time creators to seasoned designers. Our intuitive interface guides you through every step, so you can generate stunning 3D visuals without any technical background."
},
{
question: "Can I use my images commercially?",
answer: "Yes! All images generated on Erie are fully yours. You retain complete commercial rights to use them in products, marketing materials, client work, or any other commercial application."
},
{
question: "Will the style stay consistent?",
answer: "Erie's AI models are trained to maintain visual consistency across generations. You can lock style settings, use reference images, or apply style presets to keep a coherent look throughout your project."
},
{
question: "Is there a limit to what I can generate?",
answer: "Generation limits depend on your plan. Free users get a set number of credits per month, while Pro and Business plans offer significantly higher or unlimited generations. Check our pricing page for details."
},
{
question: "Can I use the generated assets in commercial projects?",
answer: "Absolutely. Assets created with Erie — including 3D renders, images, and animations — come with a commercial license, meaning you can use them in client projects, products, advertising, and more."
},
{
question: "Does the tool keep all my 3D creations in one place?",
answer: "Yes. Erie includes a personal gallery where all your generations are saved and organized automatically. You can browse, tag, download, or share any creation at any time from your dashboard."
}
];

export default function Faq05Kelo({ className }: { className?: string }) {
const [openIndex, setOpenIndex] = useState<number | null>(null);

return (
<>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"w-full bg-white py-20 px-6 font-sans " + (className || "")}>
        <div className="max-w-[620px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-[#111111] font-sans text-[48px] font-semibold leading-[1.1] tracking-tight mb-5 text-center">
              Curious about <br /> something?
            </h2>
            <p className="text-[#888888] text-[16px] leading-[1.6] text-center max-w-[450px] mx-auto">
              Simple explanations to help you get the most out of your 3D generations.
            </p>
          </div>

          {/* Accordion Area with Background Image Box */}
          <div className="relative max-w-[580px] mx-auto group">
            {/* Background Image Box */}
            <div className="absolute -inset-4 md:-inset-8 bg-gray-100 rounded-[40px] overflow-hidden z-0 shadow-inner">
              <img
                src="https://cdn.jiro.build/Kelo/a-breathtaking-3d-rendered-landscape-of-smooth-rol.jpg"
                alt="3D Landscape Background"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
            </div>

            {/* FAQ Accordion Container */}
            <div className="relative z-10 bg-white/40 backdrop-blur-2xl rounded-[32px] border border-white/40 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
              {faqs.map((faq: { question: string; answer: string }, index: number) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={"relative bg-transparent transition-colors duration-150 border-b border-white/20 last:border-b-0 " + (!isOpen ? "hover:bg-white/20" : "")}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left p-[24px_28px] flex items-center justify-between cursor-pointer focus:outline-none"
                    >
                      <span className="text-[#111111] text-[16px] font-semibold tracking-tight">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                        className="text-[#111111]/60 text-[18px] flex items-center justify-center"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={"faq-answer-" + index}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                          className="overflow-hidden"
                        >
                          <div className="px-7 pb-7 pt-0">
                            <p className="text-[#333333] text-[15px] leading-[1.7] font-medium">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>

);
}

### File 8 of 8: /components/templates/ai-marketing-landing-page-kelo/Footer.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Footer05Kelo({ className }: { className?: string }) {
const [email, setEmail] = useState("");
const [status, setStatus] = useState("Subscribe");
const [isError, setIsError] = useState(false);

const handleSubscribe = () => {
if (email.includes("@")) {
setStatus("\u2713 Subscribed!");
setEmail("");
setIsError(false);
setTimeout(() => {
setStatus("Subscribe");
}, 2000);
} else {
setIsError(true);
setTimeout(() => {
setIsError(false);
}, 1500);
}
};

const companyLinks = ["About", "Press and Media", "Careers", "Partners", "Legal", "Privacy & Policy", "Affiliates"];
const supportLinks = ["Merchant support", "Help center", "Term of Services", "Hire a Partner", "Shopify Community", "Shopify Events"];
const developerLinks = ["Salehstore.dev", "API documentation", "Office Hours"];
const productLinks = ["Shop", "Salehstore Plus", "Linkpop", "Shopify for enterprise"];
const solutionLinks = ["Online store builder", "Website builder", "Ecommerce website"];

const socialIcons: Array<{ id: string; path: string; fill: boolean; isInsta?: boolean }> = [
{ id: "facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", fill: true },
{ id: "linkedin", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", fill: true },
{ id: "twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25z", fill: true },
{ id: "instagram", path: "", fill: false, isInsta: true }
];

return (
<footer className={"w-full pt-20 bg-[#f4f5f7] " + (className || "")}>
<div className="w-full bg-[#000000] overflow-hidden">

        {/* TOP SECTION — Newsletter Bar */}
        <div className="px-6 md:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#2e2e2a]">
          <h2 className="text-white font-bold text-[28px] leading-[1.25] max-w-[280px] mb-6 md:mb-0">
            Subscribe to our news later
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={"w-full sm:w-[320px] bg-[#2a2a28] border " + (isError ? "border-[#00bc7d]" : "border-[#3a3a36]") + " rounded-[10px] px-5 py-3.5 text-white text-[14px] placeholder-[#666660] outline-none focus:border-[#555550] transition-colors"}
            />
            <button
              onClick={handleSubscribe}
              className={"w-full sm:w-auto px-6 py-3.5 rounded-[10px] text-white text-[14px] font-semibold transition-all cursor-pointer whitespace-nowrap " + (status === "\u2713 Subscribed!" ? "bg-[#2ecc71]" : "bg-[#00bc7d] hover:bg-[#00a36c]")}
            >
              {status}
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION — 5-Column Nav Links */}
        <div className="px-6 md:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-[#2e2e2a]">

          {/* Column 1 — Company */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[14px] mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              {companyLinks.map((link: string) => (
                <a key={link} href="#" className="text-[#888880] text-[13px] leading-[2.2] hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 2 — Support */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[14px] mb-4">Support</h3>
            <div className="flex flex-col gap-2">
              {supportLinks.map((link: string) => (
                <a key={link} href="#" className="text-[#888880] text-[13px] leading-[2.2] hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 3 — Developers */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[14px] mb-4">Developers</h3>
            <div className="flex flex-col gap-2">
              {developerLinks.map((link: string) => (
                <a key={link} href="#" className="text-[#888880] text-[13px] leading-[2.2] hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 4 — Products */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[14px] mb-4">Products</h3>
            <div className="flex flex-col gap-2">
              {productLinks.map((link: string) => (
                <a key={link} href="#" className="text-[#888880] text-[13px] leading-[2.2] hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Column 5 — Solutions */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-[14px] mb-4">Solutions</h3>
            <div className="flex flex-col gap-2">
              {solutionLinks.map((link: string) => (
                <a key={link} href="#" className="text-[#888880] text-[13px] leading-[2.2] hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="px-6 md:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-8">
            {/* Logo */}
            <img
              src="https://cdn.jiro.build/Kelo/Kelo%20White.svg"
              alt="Kelo Logo"
              className="h-6 w-auto"
              referrerPolicy="no-referrer"
            />

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-[#888880] hover:text-white transition-colors cursor-pointer group">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-80 group-hover:opacity-100">
                <circle cx="8" cy="8" r="7"/>
                <ellipse cx="8" cy="8" rx="3" ry="7"/>
                <line x1="1" y1="6" x2="15" y2="6"/>
                <line x1="1" y1="10" x2="15" y2="10"/>
              </svg>
              <span className="text-[13px]">English (UK)</span>
              <span className="text-[13px]">▾</span>
            </div>
          </div>

          {/* CENTER: Copyright */}
          <div className="text-[#666660] text-[13px] text-center">
            &copy; 2026 Kelo. All right Reserved
          </div>

          {/* RIGHT: Social Icons */}
          <div className="flex items-center gap-2">
            {socialIcons.map((social, i) => (
              <button
                key={social.id || i}
                className="w-9 h-9 rounded-full border border-[#333330] flex items-center justify-center bg-transparent hover:bg-[#2a2a28] hover:border-[#555550] transition-all cursor-pointer group"
              >
                {social.isInsta ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888880" strokeWidth="2" className="group-hover:stroke-white transition-colors">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#888880" stroke="none"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#888880" className="group-hover:fill-white transition-colors">
                    <path d={social.path} />
                  </svg>
                )}
              </button>
            ))}
          </div>

        </div>

      </div>
    </footer>

);
}

### Install Dependencies:

npm install framer-motion lucide-react

### Update /app/page.tsx:

Replace the contents of /app/page.tsx with:

"use client";

import Hero from "@/components/templates/ai-marketing-landing-page-kelo/Hero";
import Features from "@/components/templates/ai-marketing-landing-page-kelo/Features";
import HowItWorks from "@/components/templates/ai-marketing-landing-page-kelo/How it Works";
import Integration from "@/components/templates/ai-marketing-landing-page-kelo/Integration";
import Metric from "@/components/templates/ai-marketing-landing-page-kelo/Metric";
import Pricing from "@/components/templates/ai-marketing-landing-page-kelo/Pricing";
import FAQ from "@/components/templates/ai-marketing-landing-page-kelo/FAQ";
import Footer from "@/components/templates/ai-marketing-landing-page-kelo/Footer";

export default function Home() {
return (
<main className="min-h-screen">
<Hero />
<Features />
<HowItWorks />
<Integration />
<Metric />
<Pricing />
<FAQ />
<Footer />
</main>
);
}

### Rules:

- Copy each file EXACTLY as provided
- Do NOT modify, refactor, or rename anything
- Do NOT change any Tailwind classes
- Do NOT add features or "improvements"
- Just create the 8 files and update page.tsx
