import React, { useState } from 'react';
import { FileText, Sparkles, Download, Eye, ChevronRight, Plus, Trash2, Briefcase, GraduationCap, Award, User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { apiConnector } from '../services/apiConnector';
import { askGeminiEndpoints } from '../services/apis';

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResumePreview, setIsResumePreview] = useState(true)
  const [resumeText,setResumeText] = useState("")
  
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

  const handleGenerateResume = async() => {
    console.log(formData)
    // try{
    //     const result = await apiConnector("POST",askGeminiEndpoints.ASK_GEMINI,{resumeData:formData})
    //     console.log("Received response is : ",result?.data?.resume)
    //     // setResumeText(result?.data?.resume)
    //     // setIsResumePreview(true)
    // }
    // catch(error){
    //     console.log("Error in building the resume : ",error)
    // }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(5);
    }, 5000);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
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
            <div className="p-8">
              {/* Resume Preview Content */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 min-h-[800px]">
                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {formData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
                    {formData.personalInfo.phone && <span>• {formData.personalInfo.phone}</span>}
                    {formData.personalInfo.location && <span>• {formData.personalInfo.location}</span>}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                    {formData.personalInfo.linkedin && <span>{formData.personalInfo.linkedin}</span>}
                    {formData.personalInfo.github && <span>• {formData.personalInfo.github}</span>}
                  </div>
                </div>

                {formData.experiences.some(exp => exp.title) && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                      EXPERIENCE
                    </h2>
                    {formData.experiences.map((exp, idx) => (
                      exp.title && (
                        <div key={idx} className="mb-4">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-800">{exp.title}</h3>
                            <span className="text-sm text-gray-600">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <div className="text-gray-700 mb-2">
                            {exp.company} {exp.location && `• ${exp.location}`}
                          </div>
                          {exp.description && (
                            <p className="text-gray-600 text-sm">{exp.description}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {formData.education.some(edu => edu.degree) && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                      EDUCATION
                    </h2>
                    {formData.education.map((edu, idx) => (
                      edu.degree && (
                        <div key={idx} className="mb-4">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                            <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                          </div>
                          <div className="text-gray-700">
                            {edu.institution} {edu.location && `• ${edu.location}`}
                          </div>
                          {edu.gpa && (
                            <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {formData.projects.some(proj => proj.name) && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                      PROJECTS
                    </h2>
                    {formData.projects.map((proj, idx) => (
                      proj.name && (
                        <div key={idx} className="mb-4">
                          <h3 className="font-bold text-gray-800">{proj.name}</h3>
                          {proj.technologies && (
                            <div className="text-sm text-blue-600 mb-1">{proj.technologies}</div>
                          )}
                          {proj.description && (
                            <p className="text-gray-600 text-sm">{proj.description}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {formData.skills && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                      SKILLS
                    </h2>
                    <p className="text-gray-700">{formData.skills}</p>
                  </div>
                )}

                {formData.achievements.some(ach => ach) && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                      ACHIEVEMENTS
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.achievements.map((ach, idx) => (
                        ach && (
                          <li key={idx} className="text-gray-700">{ach}</li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Close Preview
              </button>
              <button
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

export default ResumeBuilder;