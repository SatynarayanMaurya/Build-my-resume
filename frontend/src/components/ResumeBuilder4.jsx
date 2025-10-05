import React, { useState } from 'react';
import { FileText, Sparkles, Download, Eye, ChevronRight, Plus, Trash2, Briefcase, GraduationCap, Award, User, Mail, Phone, MapPin, Globe, Linkedin, Github, Edit } from 'lucide-react';

const ResumeBuilder4 = () => {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [showAtsAnalysis, setShowAtsAnalysis] = useState(false);
  
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    experiences: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    education: [{
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: ''
    }],
    projects: [{
      name: '',
      technologies: '',
      description: '',
      link: ''
    }],
    achievements: [''],
    skills: ''
  });

  const templates = [
    { id: 1, name: 'Modern Professional', color: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'Minimalist Clean', color: 'from-gray-700 to-gray-900' },
    { id: 3, name: 'Creative Bold', color: 'from-orange-500 to-red-600' },
    { id: 4, name: 'Tech Gradient', color: 'from-cyan-500 to-blue-600' }
  ];

  const updatePersonalInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: ''
      }]
    }));
  };

  const updateExperience = (idx, field, value) => {
    const updated = [...formData.experiences];
    updated[idx][field] = value;
    setFormData(prev => ({ ...prev, experiences: updated }));
  };

  const removeExperience = (idx) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== idx)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '', institution: '', location: '', graduationDate: '', gpa: ''
      }]
    }));
  };

  const updateEducation = (idx, field, value) => {
    const updated = [...formData.education];
    updated[idx][field] = value;
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const removeEducation = (idx) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx)
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', technologies: '', description: '', link: '' }]
    }));
  };

  const updateProject = (idx, field, value) => {
    const updated = [...formData.projects];
    updated[idx][field] = value;
    setFormData(prev => ({ ...prev, projects: updated }));
  };

  const removeProject = (idx) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const updateAchievement = (idx, value) => {
    const updated = [...formData.achievements];
    updated[idx] = value;
    setFormData(prev => ({ ...prev, achievements: updated }));
  };

  const removeAchievement = (idx) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== idx)
    }));
  };

  const handleGenerateResume = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const score = calculateAtsScore();
      setAtsScore(score);
      setIsGenerating(false);
      setStep(5);
    }, 2000);
  };

  const calculateAtsScore = () => {
    let score = 0;
    const suggestions = [];

    if (formData.personalInfo.fullName) score += 5;
    if (formData.personalInfo.email) score += 5;
    if (formData.personalInfo.phone) score += 5;
    if (formData.personalInfo.linkedin || formData.personalInfo.github) {
      score += 5;
    } else {
      suggestions.push('Add LinkedIn or GitHub profile');
    }

    const validExperiences = formData.experiences.filter(exp => exp.title && exp.company);
    if (validExperiences.length > 0) {
      score += 15;
      if (validExperiences.some(exp => exp.description && exp.description.length > 50)) {
        score += 15;
      } else {
        suggestions.push('Add detailed descriptions to your experiences');
      }
    } else {
      suggestions.push('Add at least one work experience');
    }

    const validEducation = formData.education.filter(edu => edu.degree && edu.institution);
    if (validEducation.length > 0) {
      score += 15;
    } else {
      suggestions.push('Add your education details');
    }

    const validProjects = formData.projects.filter(proj => proj.name && proj.description);
    if (validProjects.length > 0) {
      score += 10;
      if (validProjects.length >= 2) {
        score += 5;
      } else {
        suggestions.push('Add more projects to strengthen your resume');
      }
    } else {
      suggestions.push('Add at least one project');
    }

    if (formData.skills && formData.skills.split(',').length >= 5) {
      score += 10;
    } else if (formData.skills) {
      score += 5;
      suggestions.push('Add more skills (at least 5 recommended)');
    } else {
      suggestions.push('Add your technical skills');
    }

    const validAchievements = formData.achievements.filter(ach => ach.trim().length > 0);
    if (validAchievements.length > 0) {
      score += 10;
    } else {
      suggestions.push('Add achievements or awards');
    }

    return { score, suggestions };
  };

  const downloadPDF = () => {
    const printContent = document.getElementById('resume-preview-content');
    if (!printContent) return;
    
    const originalTitle = document.title;
    document.title = `${formData.personalInfo.fullName || 'Resume'}_Resume`;
    
    // Get the current template styles
    const styles = getTemplateStyles(selectedTemplate);
    
    // Create print-friendly HTML with inline styles
    const printWindow = window.open('', '', 'width=800,height=600');
    
    let templateStyles = '';
    
    // Template-specific styles
    switch(selectedTemplate) {
      case 1: // Modern Professional
        templateStyles = `
          body { background: #f3f4f6; }
          .resume-container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .resume-header { background: linear-gradient(to right, #2563eb, #9333ea); color: white; padding: 40px; text-align: center; }
          .resume-header h1 { font-size: 36px; font-weight: bold; margin-bottom: 10px; color: white; }
          .contact-info { font-size: 13px; color: #dbeafe; margin-top: 15px; }
          .contact-info span { margin: 0 10px; }
          .resume-content { padding: 40px; background: white; }
          .section-title { font-size: 22px; font-weight: bold; color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
          .job-title { font-size: 17px; font-weight: bold; color: #1f2937; }
          .company { color: #6b7280; margin-bottom: 8px; }
          .description { font-size: 14px; color: #4b5563; margin-top: 8px; line-height: 1.6; }
          .skill-badge { display: inline-block; padding: 6px 14px; background: #dbeafe; color: #1e40af; border-radius: 20px; margin: 4px; font-size: 13px; font-weight: 600; }
        `;
        break;
      case 2: // Minimalist Clean
        templateStyles = `
          body { background: white; }
          .resume-container { background: white; border-left: 4px solid #1f2937; }
          .resume-header { background: white; padding: 40px; border-bottom: 1px solid #d1d5db; text-align: center; }
          .resume-header h1 { font-size: 36px; font-weight: 300; margin-bottom: 10px; color: #1f2937; letter-spacing: -0.5px; }
          .contact-info { font-size: 13px; color: #6b7280; margin-top: 15px; font-weight: 300; }
          .contact-info span { margin: 0 10px; }
          .resume-content { padding: 40px; background: white; }
          .section-title { font-size: 20px; font-weight: 300; color: #1f2937; border-bottom: 1px solid #d1d5db; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
          .job-title { font-size: 16px; font-weight: 600; color: #1f2937; }
          .company { color: #9ca3af; font-weight: 300; margin-bottom: 8px; }
          .description { font-size: 14px; color: #6b7280; margin-top: 8px; font-weight: 300; line-height: 1.6; }
          .skill-badge { display: inline-block; padding: 6px 14px; background: #f3f4f6; color: #374151; border-radius: 4px; margin: 4px; font-size: 13px; font-weight: 400; }
        `;
        break;
      case 3: // Creative Bold
        templateStyles = `
          body { background: linear-gradient(to bottom right, #fff7ed, #fef2f2); }
          .resume-container { background: linear-gradient(to bottom right, #fff7ed, #fef2f2); border-radius: 16px; overflow: hidden; }
          .resume-header { background: linear-gradient(to right, #f97316, #dc2626); color: white; padding: 40px; text-align: center; clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
          .resume-header h1 { font-size: 42px; font-weight: 900; margin-bottom: 10px; color: white; text-transform: uppercase; }
          .contact-info { font-size: 13px; color: #fed7aa; margin-top: 15px; font-weight: 600; }
          .contact-info span { margin: 0 10px; }
          .resume-content { padding: 40px; margin: 20px; background: white; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .section-title { font-size: 24px; font-weight: 900; color: #ea580c; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
          .job-title { font-size: 18px; font-weight: 900; color: #1f2937; }
          .company { color: #ea580c; font-weight: 700; margin-bottom: 8px; }
          .description { font-size: 14px; color: #4b5563; margin-top: 8px; line-height: 1.6; }
          .skill-badge { display: inline-block; padding: 6px 14px; background: #ffedd5; color: #c2410c; border-radius: 20px; margin: 4px; font-size: 13px; font-weight: 700; }
        `;
        break;
      case 4: // Tech Gradient
        templateStyles = `
          body { background: #111827; }
          .resume-container { background: #111827; border-radius: 12px; overflow: hidden; }
          .resume-header { background: linear-gradient(to right, #06b6d4, #2563eb); padding: 40px; text-align: center; }
          .resume-header h1 { font-size: 36px; font-weight: bold; margin-bottom: 10px; color: white; }
          .contact-info { font-size: 13px; color: #cffafe; margin-top: 15px; }
          .contact-info span { margin: 0 10px; }
          .resume-content { padding: 40px; background: #1f2937; color: #f3f4f6; }
          .section-title { font-size: 20px; font-weight: bold; background: linear-gradient(to right, #22d3ee, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; text-transform: uppercase; }
          .job-title { font-size: 17px; font-weight: bold; color: #22d3ee; }
          .company { color: #d1d5db; margin-bottom: 8px; }
          .description { font-size: 14px; color: #9ca3af; margin-top: 8px; line-height: 1.6; }
          .skill-badge { display: inline-block; padding: 6px 14px; background: #164e63; color: #67e8f9; border-radius: 20px; margin: 4px; font-size: 13px; font-weight: 600; }
        `;
        break;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${formData.personalInfo.fullName || 'Resume'}</title>
          <style>
            @media print {
              @page { 
                margin: 0;
                size: letter;
              }
              body { 
                margin: 0; 
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .resume-container {
              max-width: 8.5in;
              margin: 0 auto;
              min-height: 11in;
            }
            .section { 
              margin-bottom: 25px; 
              page-break-inside: avoid;
            }
            .job-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: start;
              margin-bottom: 8px;
            }
            .date { 
              font-size: 13px; 
              white-space: nowrap;
            }
            .tech-stack { 
              font-size: 13px;
              margin-bottom: 6px;
              font-weight: 600;
            }
            ul { 
              margin: 10px 0; 
              padding-left: 20px; 
            }
            li { 
              margin: 6px 0;
            }
            .skill-container {
              margin-top: 10px;
            }
            ${templateStyles}
          </style>
        </head>
        <body>
          <div class="resume-container">
            <div class="resume-header">
              <h1>${formData.personalInfo.fullName || 'Your Name'}</h1>
              <div class="contact-info">
                ${formData.personalInfo.email ? `<span>📧 ${formData.personalInfo.email}</span>` : ''}
                ${formData.personalInfo.phone ? `<span>📱 ${formData.personalInfo.phone}</span>` : ''}
                ${formData.personalInfo.location ? `<span>📍 ${formData.personalInfo.location}</span>` : ''}
              </div>
              <div class="contact-info">
                ${formData.personalInfo.linkedin ? `<span>💼 ${formData.personalInfo.linkedin}</span>` : ''}
                ${formData.personalInfo.github ? `<span>💻 ${formData.personalInfo.github}</span>` : ''}
                ${formData.personalInfo.website ? `<span>🌐 ${formData.personalInfo.website}</span>` : ''}
              </div>
            </div>
            
            <div class="resume-content">
              ${formData.experiences.some(exp => exp.title) ? `
                <div class="section">
                  <h2 class="section-title">Experience</h2>
                  ${formData.experiences.map(exp => exp.title ? `
                    <div style="margin-bottom: 20px;">
                      <div class="job-header">
                        <h3 class="job-title">${exp.title}</h3>
                        <span class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <div class="company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
                      ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                    </div>
                  ` : '').join('')}
                </div>
              ` : ''}
              
              ${formData.education.some(edu => edu.degree) ? `
                <div class="section">
                  <h2 class="section-title">Education</h2>
                  ${formData.education.map(edu => edu.degree ? `
                    <div style="margin-bottom: 20px;">
                      <div class="job-header">
                        <h3 class="job-title">${edu.degree}</h3>
                        <span class="date">${edu.graduationDate || ''}</span>
                      </div>
                      <div class="company">${edu.institution}${edu.location ? ` • ${edu.location}` : ''}</div>
                      ${edu.gpa ? `<div class="description">GPA: ${edu.gpa}</div>` : ''}
                    </div>
                  ` : '').join('')}
                </div>
              ` : ''}
              
              ${formData.projects.some(proj => proj.name) ? `
                <div class="section">
                  <h2 class="section-title">Projects</h2>
                  ${formData.projects.map(proj => proj.name ? `
                    <div style="margin-bottom: 20px;">
                      <h3 class="job-title">${proj.name}</h3>
                      ${proj.technologies ? `<div class="tech-stack">${proj.technologies}</div>` : ''}
                      ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
                      ${proj.link ? `<div class="description" style="margin-top: 4px;">${proj.link}</div>` : ''}
                    </div>
                  ` : '').join('')}
                </div>
              ` : ''}
              
              ${formData.skills ? `
                <div class="section">
                  <h2 class="section-title">Skills</h2>
                  <div class="skill-container">
                    ${formData.skills.split(',').map(skill => `<span class="skill-badge">${skill.trim()}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${formData.achievements.some(ach => ach) ? `
                <div class="section">
                  <h2 class="section-title">Achievements</h2>
                  <ul>
                    ${formData.achievements.map(ach => ach ? `<li class="description">${ach}</li>` : '').join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      document.title = originalTitle;
    }, 500);
  };

  const handleEditResume = () => {
    setShowPreview(false);
    setStep(1);
  };

  const getTemplateStyles = (templateId) => {
    switch(templateId) {
      case 1: // Modern Professional
        return {
          container: 'bg-white',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-xl',
          headerText: 'text-white',
          name: 'text-4xl font-bold mb-2 text-center',
          contact: 'text-blue-100 text-sm',
          sectionTitle: 'text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4',
          contentBg: 'bg-white p-8',
          jobTitle: 'font-bold text-gray-800 text-lg',
          company: 'text-gray-600',
          description: 'text-gray-700 text-sm mt-2'
        };
      case 2: // Minimalist Clean
        return {
          container: 'bg-white border-l-4 border-gray-800',
          header: 'bg-white p-8 border-b border-gray-300',
          headerText: 'text-gray-800',
          name: 'text-4xl font-light mb-2 tracking-tight text-center',
          contact: 'text-gray-600 text-sm font-light',
          sectionTitle: 'text-xl font-light text-gray-800 border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider',
          contentBg: 'bg-white p-8',
          jobTitle: 'font-semibold text-gray-800',
          company: 'text-gray-500 font-light',
          description: 'text-gray-600 text-sm mt-2 font-light'
        };
      case 3: // Creative Bold
        return {
          container: 'bg-gradient-to-br from-orange-50 to-red-50',
          header: 'bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 clip-path-polygon',
          headerText: 'text-white',
          name: 'text-5xl font-black mb-2 uppercase text-center',
          contact: 'text-orange-100 text-sm font-semibold',
          sectionTitle: 'text-2xl font-black text-orange-600 mb-4 uppercase tracking-wide',
          contentBg: 'bg-white p-8 m-4 rounded-2xl shadow-lg',
          jobTitle: 'font-black text-gray-800 text-lg',
          company: 'text-orange-600 font-bold',
          description: 'text-gray-700 text-sm mt-2'
        };
      case 4: // Tech Gradient
        return {
          container: 'bg-gray-900',
          header: 'bg-gradient-to-r from-cyan-500 to-blue-600 p-8',
          headerText: 'text-white',
          name: 'text-4xl font-bold mb-2 text-white text-center',
          contact: 'text-cyan-100 text-sm',
          sectionTitle: 'text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 uppercase',
          contentBg: 'bg-gray-800 p-8 text-gray-100',
          jobTitle: 'font-bold text-cyan-400 text-lg',
          company: 'text-gray-300',
          description: 'text-gray-400 text-sm mt-2'
        };
      default:
        return getTemplateStyles(1);
    }
  };

  const renderResumePreview = () => {
    const styles = getTemplateStyles(selectedTemplate);
    
    return (
      <div id="resume-preview-content" className={`${styles.container} rounded-xl shadow-2xl overflow-hidden min-h-[800px]`}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.name}>
            {formData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className={`${styles.contact} flex flex-wrap justify-center gap-3 mt-3`}>
            {formData.personalInfo.email && <span>📧 {formData.personalInfo.email}</span>}
            {formData.personalInfo.phone && <span>📱 {formData.personalInfo.phone}</span>}
            {formData.personalInfo.location && <span>📍 {formData.personalInfo.location}</span>}
          </div>
          <div className={`${styles.contact} flex flex-wrap justify-center gap-3 mt-2`}>
            {formData.personalInfo.linkedin && <span>💼 {formData.personalInfo.linkedin}</span>}
            {formData.personalInfo.github && <span>💻 {formData.personalInfo.github}</span>}
            {formData.personalInfo.website && <span>🌐 {formData.personalInfo.website}</span>}
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.contentBg}>
          {/* Experience */}
          {formData.experiences.some(exp => exp.title) && (
            <div className="mb-8 section">
              <h2 className={styles.sectionTitle}>Experience</h2>
              {formData.experiences.map((exp, idx) => (
                exp.title && (
                  <div key={idx} className="mb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={styles.jobTitle}>{exp.title}</h3>
                      <span className={`${styles.company} text-sm date`}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className={`${styles.company} mb-2 company`}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.description && (
                      <p className={`${styles.description} description`}>{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {formData.education.some(edu => edu.degree) && (
            <div className="mb-8 section">
              <h2 className={styles.sectionTitle}>Education</h2>
              {formData.education.map((edu, idx) => (
                edu.degree && (
                  <div key={idx} className="mb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={styles.jobTitle}>{edu.degree}</h3>
                      <span className={`${styles.company} text-sm date`}>{edu.graduationDate}</span>
                    </div>
                    <div className={`${styles.company} company`}>
                      {edu.institution} {edu.location && `• ${edu.location}`}
                    </div>
                    {edu.gpa && (
                      <div className={`${styles.description} text-sm`}>GPA: {edu.gpa}</div>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Projects */}
          {formData.projects.some(proj => proj.name) && (
            <div className="mb-8 section">
              <h2 className={styles.sectionTitle}>Projects</h2>
              {formData.projects.map((proj, idx) => (
                proj.name && (
                  <div key={idx} className="mb-6">
                    <h3 className={styles.jobTitle}>{proj.name}</h3>
                    {proj.technologies && (
                      <div className={`${selectedTemplate === 4 ? 'text-cyan-400' : selectedTemplate === 3 ? 'text-orange-600' : 'text-blue-600'} text-sm mb-1 font-semibold tech-stack`}>
                        {proj.technologies}
                      </div>
                    )}
                    {proj.description && (
                      <p className={`${styles.description} description`}>{proj.description}</p>
                    )}
                    {proj.link && (
                      <a href={proj.link} className={`${selectedTemplate === 4 ? 'text-cyan-400' : selectedTemplate === 3 ? 'text-orange-600' : 'text-blue-600'} text-sm underline`}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {formData.skills && (
            <div className="mb-8 section">
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.split(',').map((skill, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedTemplate === 4 ? 'bg-cyan-900 text-cyan-300' :
                    selectedTemplate === 3 ? 'bg-orange-100 text-orange-700' :
                    selectedTemplate === 2 ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {formData.achievements.some(ach => ach) && (
            <div className="mb-8 section">
              <h2 className={styles.sectionTitle}>Achievements</h2>
              <ul className="list-disc list-inside space-y-2">
                {formData.achievements.map((ach, idx) => (
                  ach && (
                    <li key={idx} className={styles.description}>{ach}</li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />Full Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />Email *
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />Phone *
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="+1 234 567 8900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />Location
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Linkedin className="inline w-4 h-4 mr-2" />LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Github className="inline w-4 h-4 mr-2" />GitHub
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="github.com/johndoe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="inline w-4 h-4 mr-2" />Website
                </label>
                <input
                  type="url"
                  value={formData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Work Experience</h2>
              <p className="text-gray-600">Share your professional journey</p>
            </div>
            
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl relative border border-gray-200">
                {formData.experiences.length > 1 && (
                  <button
                    onClick={() => removeExperience(idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Experience {idx + 1}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(idx, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tech Corp"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(idx, 'location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(idx, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(idx, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200"
                    />
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(idx, 'current', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">Currently working here</label>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addExperience}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Experience
            </button>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Education</h2>
              <p className="text-gray-600">Tell us about your academic background</p>
            </div>
            
            {formData.education.map((edu, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl relative border border-gray-200">
                {formData.education.length > 1 && (
                  <button
                    onClick={() => removeEducation(idx)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Education {idx + 1}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="University Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(idx, 'location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(idx, 'graduationDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(idx, 'gpa', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addEducation}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Education
            </button>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Projects & Achievements</h2>
              <p className="text-gray-600">Showcase your best work and accomplishments</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                Projects
              </h3>
              
              {formData.projects.map((project, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl mb-4 border border-gray-200 relative">
                  {formData.projects.length > 1 && (
                    <button
                      onClick={() => removeProject(idx)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(idx, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(idx, 'description', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the project and your role..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => updateProject(idx, 'link', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addProject}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                Achievements & Awards
              </h3>
              
              {formData.achievements.map((achievement, idx) => (
                <div key={idx} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your achievement..."
                  />
                  {formData.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(idx)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={addAchievement}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
              <textarea
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js, Python, SQL)"
              />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Template</h2>
              <p className="text-gray-600">Select a design that represents you best</p>
            </div>

            {/* ATS Score Card */}
            {atsScore && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    ATS Score Analysis
                  </h3>
                  <button
                    onClick={() => setShowAtsAnalysis(!showAtsAnalysis)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    {showAtsAnalysis ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={atsScore.score >= 80 ? '#10b981' : atsScore.score >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(atsScore.score / 100) * 351.86} 351.86`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${atsScore.score >= 80 ? 'text-green-600' : atsScore.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {atsScore.score}
                        </div>
                        <div className="text-xs text-gray-600">out of 100</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        atsScore.score >= 80 ? 'bg-green-100 text-green-700' : 
                        atsScore.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {atsScore.score >= 80 ? 'Excellent' : atsScore.score >= 60 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      Your resume is {atsScore.score >= 80 ? 'well-optimized' : atsScore.score >= 60 ? 'fairly optimized' : 'not well-optimized'} for Applicant Tracking Systems (ATS).
                    </p>
                    
                    {showAtsAnalysis && atsScore.suggestions.length > 0 && (
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Suggestions to improve:</h4>
                        <ul className="space-y-1">
                          {atsScore.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'ring-4 ring-blue-500 scale-105 shadow-2xl'
                      : 'hover:scale-102 shadow-lg'
                  }`}
                >
                  <div className={`h-64 bg-gradient-to-br ${template.color} p-6 flex items-center justify-center`}>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 w-full h-full flex flex-col">
                      <div className="h-3 bg-white bg-opacity-40 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-white bg-opacity-30 rounded w-1/2 mb-4"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-white bg-opacity-30 rounded"></div>
                        <div className="h-2 bg-white bg-opacity-30 rounded w-5/6"></div>
                        <div className="h-2 bg-white bg-opacity-30 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                    <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Preview Resume
              </button>
              <button
                onClick={downloadPDF}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Resume Builder
                </h1>
                <p className="text-sm text-gray-600">Create professional resumes with AI</p>
              </div>
            </div>
            {step < 5 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">Step {step} of 4</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              {[
                { num: 1, label: 'Personal Info', icon: User },
                { num: 2, label: 'Experience', icon: Briefcase },
                { num: 3, label: 'Education', icon: GraduationCap },
                { num: 4, label: 'Projects', icon: Award }
              ].map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        step >= s.num
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <s.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-blue-600' : 'text-gray-500'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-500 ${
                          step > s.num ? 'translate-x-0' : '-translate-x-full'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {isGenerating ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Generating Your Resume</h2>
              <p className="text-gray-600 mb-8">AI is crafting your professional resume...</p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-[loading_2s_ease-in-out_infinite]" />
              </div>
            </div>
          ) : (
            <>
              {renderStepContent()}

              {/* Navigation Buttons */}
              {step < 5 && (
                <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleGenerateResume}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Generate Resume with AI
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-2xl font-bold text-gray-800">Resume Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {renderResumePreview()}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-4 rounded-b-2xl">
              <button
                onClick={handleEditResume}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit Resume
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                Change Template
              </button>
              <button
                onClick={downloadPDF}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0%, 100% { width: 0%; margin-left: 0%; }
          50% { width: 100%; margin-left: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder4