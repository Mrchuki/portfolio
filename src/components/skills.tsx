'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code, Users, Cloud, Microchip, Brain, Globe } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

import React, { useState } from 'react';

const Skills = () => {
  // Get skills from configuration
  const config = getConfig();
  
  // Transform skills data with icons
  const skillsData = [
    {
      id: 'programming',
      category: 'Programming Languages',
      icon: <Code className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.programming,
    },
    {
      id: 'ml_ai',
      category: 'ML/AI Technologies',
      icon: <Brain className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.ml_ai,
    },
    {
      id: 'devops',
      category: 'DevOps & Cloud',
      icon: <Cloud className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.devops_cloud,
    },
    {
      id: 'iot',
      category: 'IoT & Hardware',
      icon: <Microchip className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.iot_hardware,
    },
    {
      id: 'soft',
      category: 'Soft Skills',
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.soft_skills,
    },
    {
      id: 'languages',
      category: 'Languages',
      icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: config.skills.languages,
    }
  ].filter(category => category.skills && category.skills.length > 0);

  const [activeTab, setActiveTab] = useState(skillsData[0]?.id);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl px-2 sm:px-6"
    >
      <Card className="w-full bg-transparent border-none px-0 pb-8 sm:pb-12 shadow-none">
        <CardHeader className="px-0 pb-6">
          <CardTitle className="text-primary dark:text-gray-100 px-0 text-2xl sm:text-3xl lg:text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Select a category below to explore my technical and professional skills.
          </p>
        </CardHeader>

        <CardContent className="px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Interactive Tabs */}
            <div className="flex w-full md:w-1/3 flex-row md:flex-col gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {skillsData.map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-left outline-none transition-colors whitespace-nowrap md:whitespace-normal
                      ${isActive 
                        ? 'text-foreground font-semibold' 
                        : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground font-medium'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className={`relative z-10 transition-colors ${isActive ? 'text-primary dark:text-gray-100' : 'text-gray-500'}`}>
                      {section.icon}
                    </div>
                    <span className="relative z-10 text-sm sm:text-base">{section.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Badges Vault */}
            <div className="w-full md:w-2/3 min-h-[250px] rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 p-6 backdrop-blur-md relative overflow-hidden flex items-start align-top">
              {/* Subtle background glow effect based on category */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 w-full">
                {skillsData.map((section) => {
                  if (activeTab !== section.id) return null;
                  
                  return (
                    <motion.div
                      key={section.id}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      className="flex flex-wrap gap-2.5 sm:gap-3"
                    >
                      {(section.skills ?? []).map((skill: string, idx: number) => (
                        <motion.div
                          key={`${section.id}-${idx}`}
                          variants={badgeVariants}
                          whileHover={{
                            scale: 1.08,
                            y: -4,
                            transition: { type: "spring", stiffness: 400, damping: 10 },
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge 
                            className={`px-4 py-2 font-medium text-sm sm:text-base 
                            bg-white hover:bg-gray-100 text-gray-800 
                            dark:bg-zinc-800/80 dark:hover:bg-zinc-700 dark:text-gray-100 
                            border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md transition-colors cursor-pointer`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
