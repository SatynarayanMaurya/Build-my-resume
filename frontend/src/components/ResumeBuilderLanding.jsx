import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Download, Layout, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResumeBuilderLanding() {
    const navigate = useNavigate()
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Build Your Resume",
      description: "Create professional resumes with our intuitive builder. Easy-to-use interface that guides you through every step."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "ATS Score Checker",
      description: "Check your resume's ATS compatibility score and get intelligent suggestions to improve your chances of getting noticed."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download as PDF",
      description: "Export your polished resume as a high-quality PDF, ready to send to employers instantly."
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Multiple Templates",
      description: "Choose from a variety of professionally designed templates that suit your industry and style."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Build Your Dream
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Resume</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Create professional, ATS-friendly resumes in minutes. Choose from multiple templates, check your ATS score, and land your dream job.
          </motion.p>
          
          <motion.button
            onClick={()=>navigate("/create-resume")}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Building Free
          </motion.button>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={()=>navigate("/create-resume")}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white cursor-pointer rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <motion.div 
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Our Resume Builder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Customize with multiple professional templates",
              "Real-time ATS score checking",
              "Instant PDF download"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center mt-24"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who landed their dream jobs
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/create-resume")}
            className="bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}