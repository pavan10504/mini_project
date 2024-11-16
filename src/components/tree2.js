import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MoveRight } from 'lucide-react';

const treeData = {
  Name:'10th',
  Children :[
      {Name:'PUC',
          Children:[
              {Name:'SCIENCE',
                  Children:[
                      {Name:'PCMB',
                          Children:[
                              {Name:'Medical and Health Sciences',
                                  Children:[
                                      {Name:'Bachelor of Medicine and Bachelor of Surgery(MBBS)'},
                                      {Name:'Bachelor of Dental Surgery(BDS)'},
                                      {Name:'Bachelor of Ayurvedic Medicine and Surgery(BAMS)'},
                                      {Name:'Bachelor of Homeopathic Medicine and Surgery(BHMS)'},
                                      {Name:'Bachelor of Naturopathy and Yogic Sciences(BNYS)'},
                                      {Name:'Bachelor of Physiotherapy(BPT)'},
                                      {Name:'B.Sc. Nursing'},
                                      {Name:'Bachelor of Pharmacy(B.Pharm)'},
                                      {Name:'Doctor of Pharmacy(Pharm D)'},
                                      {Name:'B.Sc. Medical Laboratory Technology'},
                                      {Name:'B.Sc. Radiology and Imaging Technology'},
                                      {Name:'B.Sc. Operation Theatre Technology'},
                                      {Name:'B.Sc. Anesthesia Technology'},
                                      {Name:'B.Sc. Cardiovascular Technology'},
                                      {Name:'B.Sc. Respiratory Therapy'},
                                      {Name:'B.Sc. Audiology and Speech Therapy'},
                                      {Name:'B.Sc. Optometry'},
                                      {Name:'B.Sc. Nutrition and Dietetics'},
                                      {Name:'B.Sc. Occupational Therapy'},
                                      {Name:'B.Sc. Neuroscience Technology'},
                                      {Name:'B.Sc. Dialysis Technology'},
                                      {Name:'B.Sc. Neurophysiology Technology'},
                                      {Name:'B.Sc. Perfusion Technology'},
                                      {Name:'B.Sc. Emergency and Trauma Care Technology'},
                                      {Name:'B.Sc. Orthopedic Technology'},
                                      {Name:'B.Sc. Clinical Research'},
                                      {Name:'B.Sc. Critical Care Technology'},
                                      {Name:'B.Sc. Public Health'},
                                      {Name:'B.Sc. Speech and Language Pathology'},
                                      {Name:'B.Sc. Ophthalmic Technology'},
                                      {Name:'B.Sc. Health Information Management'},
                                      {Name:'B.Sc. Cardiac Care Technology'},
                                      {Name:'B.Sc. Medical Imaging Technology'},
                                      {Name:'B.Sc. Respiratory Therapy Technology'},
                                      {Name:'B.Sc. Renal Dialysis Technology'},
                                      {Name:'Bachelor of Audiology and Speech-Language Pathology(BASLP)'},
                                      {Name:'B.Sc. Medical Microbiology'},
                                      {Name:'B.Sc. Medical Biochemistry'},
                                      {Name:'B.Sc. Medical Genetics'},
                                      {Name:'Bachelor of Public Health (BPH)'}
                                  ]
                              },
                              {Name:'Biological Sciences and Agriculture',
                                  Children:[
                                      {Name:'B.Sc. Biotechnology'},
                                      {Name:'B.Sc. Microbiology'},
                                      {Name:'B.Sc. Genetics'},
                                      {Name:'B.Sc. Botany'},
                                      {Name:'B.Sc. Zoology'},
                                      {Name:'B.Sc. Biochemistry'},
                                      {Name:'B.Sc. Environmental Science'},
                                      {Name:'B.Sc. Agriculture'},
                                      {Name:'B.Sc. Horticulture'},
                                      {Name:'B.Sc. Forestry'},
                                      {Name:'B.Sc. Fisheries Science'},
                                      {Name:'Bachelor of Veterinary Science(BVSc)'},
                                      {Name:'B.Sc. Sericulture'},
                                      {Name:'B.Sc. Food Science and Nutrition'},
                                      {Name:'B.Sc. Marine Biology'},
                                      {Name:'B.Sc. Plant Science'},
                                      {Name:'B.Sc. Animal Science'},
                                      {Name:'B.Sc. Wildlife Science'},
                                      {Name:'B.Sc. Ecology and Environmental Biology'},
                                      {Name:'B.Sc. Soil Science'},
                                      {Name:'B.Sc. Bioinformatics'},
                                      {Name:'B.Sc. Biomedical Science'},
                                      {Name:'B.Sc. Applied Biology'},
                                      {Name:'B.Sc. Agricultural Biotechnology'},
                                      {Name:'B.Sc. Agricultural Economics'},
                                      {Name:'B.Sc. Dairy Technology'},
                                      {Name:'B.Sc. Poultry Science'},
                                      {Name:'B.Sc. Crop Science'},
                                      {Name:'B.Sc. Plant Pathology'}
                                  ]
                              },
                              {Name:'Engineering and Technology',
                                  Children:[
                                      {Name:'Mechanical Engineering'},
                                      {Name:'Civil Engineering'},
                                      {Name:'Electrical Engineering'},
                                      {Name:'Electronics and Communication Engineering'},
                                      {Name:'Computer Science and Engineering'},
                                      {Name:'Artificial Intelligence and Machine Learning'},
                                      {Name:'Data Science and Engineering'},
                                      {Name:'Cybersecurity Engineering'},
                                      {Name:'Materials Science and Engineering'},
                                      {Name:'Aviation Engineering'},
                                      {Name:'Marine Biotechnology Engineering'},
                                      {Name:'Nuclear Engineering'},
                                      {Name:'Information Technology'},
                                      {Name:'Biotechnology'},
                                      {Name:'Biomedical Engineering'},
                                      {Name:'Chemical Engineering'},
                                      {Name:'Aerospace Engineering'},
                                      {Name:'Agricultural Engineering'},
                                      {Name:'Industrial Biotechnology'},
                                      {Name:'Systems Engineering'},
                                      {Name:'Telecommunication Engineering'},
                                      {Name:'Petrochemical Engineering'},
                                      {Name:'Photonics Engineering'},
                                      {Name:'Environmental Engineering'},
                                      {Name:'Food Technology'},
                                      {Name:'Marine Engineering'},
                                      {Name:'Metallurgical Engineering'},
                                      {Name:'Petroleum Engineering'},
                                      {Name:'Automobile Engineering'},
                                      {Name:'Robotics Engineering'},
                                      {Name:'Mechatronics Engineering'},
                                      {Name:'Nanotechnology Engineering'},
                                      {Name:'Textile Engineering'},
                                      {Name:'Production and Industrial Engineering'},
                                      {Name:'Mining Engineering'},
                                      {Name:'Instrumentation Engineering'},
                                      {Name:'Genetic Engineering'},
                                      {Name:'Polymer Engineering'},
                                      {Name:'Bioprocess Engineering'},
                                      {Name:'Ceramic Engineering'},
                                      {Name:'Software Engineering'},
                                      {Name:'Power Engineering'},
                                      {Name:'Structural Engineering'},
                                      {Name:'Transportation Engineering'},
                                      {Name:'Construction Engineering'},
                                      {Name:'Renewable Energy Engineering'},
                                      {Name:'Energy Engineering'}
                                  ]
                              },
                              {Name:'Pure Sciences',
                                  Children:[
                                      {Name:'B.Sc. Physics'},
                                      {Name:'B.Sc. Chemistry'},
                                      {Name:'B.Sc. Mathematics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Mathematics'},
                                      {Name:'B.Sc. Data Science'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. Forensic Science'},
                                      {Name:'B.Sc. Electronics'},
                                      {Name:'B.Sc. Geology'},
                                      {Name:'B.Sc. Applied Physics'},
                                      {Name:'Integrated M.Sc. '}
                                  ]
                              },
                              {Name:'Commerce and Management',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Management Studies(BBS)'}
                                  ]
                              },
                              {Name:'Information Technology and Computer Applications',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. in Information Technology'},
                                      {Name:'B.Sc. in Data Science and Big Data'},
                                      {Name:'B.Sc. in Artificial Intelligence and Machine Learning'},
                                      {Name:'B.Sc. in Cybersecurity'}
                                  ]
                              },
                              {Name:'Architecture and Design',
                                  Children:[
                                      {Name:'Bachelor of Architecture(B.Arch)'},
                                      {Name:'Bachelor of Design(B.Des)'},
                                      {Name:'Bachelor of Planning(B.Plan)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Visual Arts (BVA)'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychlogy'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Economics'},
                                      {Name:'BA Anthropology'},
                                      {Name:'BA Geography'},
                                      {Name:'BA Philosophy'},
                                      {Name:'BA History'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'Bachelor of Law(LLB)'},
                                      {Name:'BA LLB,BBA LLB,B.Com.LLB,B.Sc.LLB(Integrated)'}
                                  ]
                              },
                              {Name:'Education and Physical Education',
                                  Children:[
                                      {Name:'Bachelor of Education(B.Ed)'},
                                      {Name:'Bachelor of Physical Education(B.P.Ed)'},
                                      {Name:'B.Sc in Physical Education,Health Education and Sports Sciences'}
                                  ]
                              },
                              {Name:'Aviation',
                                  Children:[
                                      {Name:'B.Sc.Aviation'},
                                      {Name:'Commercial Pilot License(CPL)'},
                                      {Name:'Aircraft Maintenance Engineering(AME)'}
                                  ]
                              },
                              {Name:'Hotel Management and Hospitality',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'B.Sc in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of catering and Culinary Arts(BCTCA)'}
                                  ]
                              }
                          ]
                      },
                      {Name:'PCMC',
                          Children:[
                              {Name:'Engineering and Technology(B.Tech / B.E.)',
                                  Children:[
                                      {Name:'Mechanical Engineering'},
                                      {Name:'Civil Engineering'},
                                      {Name:'Electrical Engineering'},
                                      {Name:'Electronics and Communication Engineering'},
                                      {Name:'Computer Science and Engineering'},
                                      {Name:'Artificial Intelligence and Machine Learning'},
                                      {Name:'Data Science and Engineering'},
                                      {Name:'Cybersecurity Engineering'},
                                      {Name:'Information Technology'},
                                      {Name:'Biotechnology'},
                                      {Name:'Biomedical Engineering'},
                                      {Name:'Chemical Engineering'},
                                      {Name:'Aerospace Engineering'},
                                      {Name:'Agricultural Engineering'},
                                      {Name:'Environmental Engineering'},
                                      {Name:'Food Technology'},
                                      {Name:'Marine Engineering'},
                                      {Name:'Metallurgical Engineering'},
                                      {Name:'Petroleum Engineering'},
                                      {Name:'Automobile Engineering'},
                                      {Name:'Robotics Engineering'},
                                      {Name:'Mechatronics Engineering'},
                                      {Name:'Nanotechnology Engineering'},
                                      {Name:'Textile Engineering'},
                                      {Name:'Production and Industrial Engineering'},
                                      {Name:'Mining Engineering'},
                                      {Name:'Instrumentation Engineering'},
                                      {Name:'Genetic Engineering'},
                                      {Name:'Polymer Engineering'},
                                      {Name:'Bioprocess Engineering'},
                                      {Name:'Ceramic Engineering'},
                                      {Name:'Software Engineering'},
                                      {Name:'Power Engineering'},
                                      {Name:'Structural Engineering'},
                                      {Name:'Transportation Engineering'},
                                      {Name:'Construction Engineering'},
                                      {Name:'Renewable Energy Engineering'},
                                      {Name:'Energy Engineering'},
                                      {Name:'Materials Science and Engineering'},
                                      {Name:'Systems Engineering'},
                                      {Name:'Telecommunication Engineering'},
                                      {Name:'Photonics Engineering'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. in Information Technology'},
                                      {Name:'B.Sc. in Data Science and Big Data'},
                                      {Name:'B.Sc. in Artificial Intelligence and Machine Learning'},
                                      {Name:'B.Sc. in Cybersecurity'},
                                      {Name:'B.Sc. Animation and Multimedia'},
                                      {Name:'B.Sc. Software Development'}
                                  ]
                              },
                              {Name:'Pure Sciences',
                                  Children:[
                                      {Name:'B.Sc. Physics'},
                                      {Name:'B.Sc. Chemistry'},
                                      {Name:'B.Sc. Mathematics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Mathematics'},
                                      {Name:'B.Sc. Data Science'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. Forensic Science'},
                                      {Name:'B.Sc. Electronics'},
                                      {Name:'B.Sc. Geology'},
                                      {Name:'B.Sc. Applied Physics'},
                                      {Name:'Integrated M.Sc. '}
                                  ]
                              },
                              {Name:'Commerce and Management',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Management Studies(BBS)'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychlogy'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Economics'},
                                      {Name:'BA Anthropology'},
                                      {Name:'BA Geography'},
                                      {Name:'BA Philosophy'},
                                      {Name:'BA History'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'Bachelor of Law(LLB)'},
                                      {Name:'BA LLB,BBA LLB,B.Com.LLB,B.Sc.LLB(Integrated)'}
                                  ]
                              },
                              {Name:'Architecture and Design',
                                  Children:[
                                      {Name:'Bachelor of Architecture(B.Arch)'},
                                      {Name:'Bachelor of Design(B.Des)'},
                                      {Name:'Bachelor of Planning(B.Plan)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Visual Arts (BVA)'}
                                  ]
                              },
                              {Name:'Aviation',
                                  Children:[
                                      {Name:'B.Sc.Aviation'},
                                      {Name:'Commercial Pilot License(CPL)'},
                                      {Name:'Aircraft Maintenance Engineering(AME)'}
                                  ]
                              },
                              {Name:'Hotel Management and Hospitality',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'B.Sc in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of catering and Culinary Arts(BCTCA)'}
                                  ]
                              }
                          ]
                      },
                      {Name:'PCME',
                          Children:[
                              {Name:'Engineering and Technology(B.Tech / B.E.)',
                                  Children:[
                                      {Name:'Mechanical Engineering'},
                                      {Name:'Civil Engineering'},
                                      {Name:'Electrical Engineering'},
                                      {Name:'Electronics and Communication Engineering'},
                                      {Name:'Computer Science and Engineering'},
                                      {Name:'Artificial Intelligence and Machine Learning'},
                                      {Name:'Data Science and Engineering'},
                                      {Name:'Cybersecurity Engineering'},
                                      {Name:'Information Technology'},
                                      {Name:'Biotechnology'},
                                      {Name:'Biomedical Engineering'},
                                      {Name:'Chemical Engineering'},
                                      {Name:'Aerospace Engineering'},
                                      {Name:'Agricultural Engineering'},
                                      {Name:'Environmental Engineering'},
                                      {Name:'Food Technology'},
                                      {Name:'Marine Engineering'},
                                      {Name:'Metallurgical Engineering'},
                                      {Name:'Petroleum Engineering'},
                                      {Name:'Automobile Engineering'},
                                      {Name:'Robotics Engineering'},
                                      {Name:'Mechatronics Engineering'},
                                      {Name:'Nanotechnology Engineering'},
                                      {Name:'Textile Engineering'},
                                      {Name:'Production and Industrial Engineering'},
                                      {Name:'Mining Engineering'},
                                      {Name:'Instrumentation Engineering'},
                                      {Name:'Genetic Engineering'},
                                      {Name:'Polymer Engineering'},
                                      {Name:'Bioprocess Engineering'},
                                      {Name:'Ceramic Engineering'},
                                      {Name:'Software Engineering'},
                                      {Name:'Power Engineering'},
                                      {Name:'Structural Engineering'},
                                      {Name:'Transportation Engineering'},
                                      {Name:'Construction Engineering'},
                                      {Name:'Renewable Energy Engineering'},
                                      {Name:'Energy Engineering'},
                                      {Name:'Materials Science and Engineering'},
                                      {Name:'Systems Engineering'},
                                      {Name:'Telecommunication Engineering'},
                                      {Name:'Photonics Engineering'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. in Information Technology'},
                                      {Name:'B.Sc. in Data Science and Big Data'},
                                      {Name:'B.Sc. in Artificial Intelligence and Machine Learning'},
                                      {Name:'B.Sc. in Cybersecurity'},
                                      {Name:'B.Sc. Animation and Multimedia'},
                                      {Name:'B.Sc. Software Development'}
                                  ]
                              },
                              {Name:'Pure Sciences',
                                  Children:[
                                      {Name:'B.Sc. Physics'},
                                      {Name:'B.Sc. Chemistry'},
                                      {Name:'B.Sc. Mathematics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Mathematics'},
                                      {Name:'B.Sc. Data Science'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Sc. Forensic Science'},
                                      {Name:'B.Sc. Electronics'},
                                      {Name:'B.Sc. Geology'},
                                      {Name:'B.Sc. Applied Physics'},
                                      {Name:'Integrated M.Sc. '}
                                  ]
                              },
                              {Name:'Commerce and Management',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Management Studies(BBS)'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychlogy'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Economics'},
                                      {Name:'BA Anthropology'},
                                      {Name:'BA Geography'},
                                      {Name:'BA Philosophy'},
                                      {Name:'BA History'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'Bachelor of Law(LLB)'},
                                      {Name:'BA LLB,BBA LLB,B.Com.LLB,B.Sc.LLB(Integrated)'}
                                  ]
                              },
                              {Name:'Architecture and Design',
                                  Children:[
                                      {Name:'Bachelor of Architecture(B.Arch)'},
                                      {Name:'Bachelor of Design(B.Des)'},
                                      {Name:'Bachelor of Planning(B.Plan)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Visual Arts (BVA)'}
                                  ]
                              },
                              {Name:'Aviation',
                                  Children:[
                                      {Name:'B.Sc.Aviation'},
                                      {Name:'Commercial Pilot License(CPL)'},
                                      {Name:'Aircraft Maintenance Engineering(AME)'}
                                  ]
                              },
                              {Name:'Hotel Management and Hospitality',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'B.Sc in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of catering and Culinary Arts(BCTCA)'}
                                  ]
                              }
                          ]
                      }
                  ]
              },
              {Name:'COMMERCE',
                  Children:[
                      {Name:'ABMS',
                          Children:[
                              {Name:'Commerce and Management Degrees',
                                  Children:[
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Business Studies(BBS)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hotel Management and Catering Technology(BHMCT)'}
                                  ]
                              },
                              {Name:'Chartered and Professional Courses',
                                  Children:[
                                      {Name:'Chartered Accountancy (CA)'},
                                      {Name:'Company Secretary (CS)'},
                                      {Name:'Cost and Management Accountancy (CMA)'},
                                      {Name:'Certified Financial Planner (CFP)'},
                                      {Name:'Chartered Financial Analyst (CFA)'},
                                      {Name:'Financial Risk Manager (FRM)'},
                                      {Name:'Association of Chartered Certified Accountants (ACCA)'},
                                      {Name:'Certified Public Accountant (CPA)'},
                                      {Name:'Diploma in Banking and Finance (DBF)'},
                                      {Name:'Insurance Institute of India (III)'},
                                      {Name:'Certified Investment Banker'}
                                  ]
                              },
                              {Name:'Economics and Statistics',
                                  Children:[
                                      {Name:'BA Economics'},
                                      {Name:'B.Sc. Economics'},
                                      {Name:'BA Business Economics'},
                                      {Name:'Bachelor in Quantitative Economics'},
                                      {Name:'B.Com in Business Economics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Statistics'},
                                      {Name:'Bachelor of Statistics(B.Stat)'},
                                      {Name:'B.Sc. Data Science and Statistics'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'B.Com. LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'BA LLB'}
                                  ]
                              },
                              {Name:'Finance and Banking',
                                  Children:[
                                      {Name:'Bachelor of Finance and Investment Analysis (BFIA)'},
                                      {Name:'B.Com. in Financial Markets'},
                                      {Name:'B.Com. in Financial Management'},
                                      {Name:'Bachelor of Banking and Insurance (BBI)'},
                                      {Name:'B.Com. in Banking and Finance'},
                                      {Name:'B.Sc. in Finance'},
                                      {Name:'Bachelor in Financial and Investment Planning'},
                                      {Name:'BBA in Finance and Banking'},
                                      {Name:'BBA in Financial Services'}
                                  ]
                              },
                              {Name:'Hospitality and Hotel Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hospitality and Catering Technology'},
                                      {Name:'Bachelor of Tourism and Travel Management'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'Information Technology(B.Sc. IT )'},
                                      {Name:'B.Sc. Computer Science'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA History'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Design and Media',
                                  Children:[
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'Bachelor of Event Management'}
                                  ]
                              },
                          ]
                      },
                      {Name:'ABSCs',
                          Children:[
                              {Name:'Commerce and Management Degrees',
                                  Children:[
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Business Studies(BBS)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hotel Management and Catering Technology(BHMCT)'}
                                  ]
                              },
                              {Name:'Chartered and Professional Courses',
                                  Children:[
                                      {Name:'Chartered Accountancy (CA)'},
                                      {Name:'Company Secretary (CS)'},
                                      {Name:'Cost and Management Accountancy (CMA)'},
                                      {Name:'Certified Financial Planner (CFP)'},
                                      {Name:'Chartered Financial Analyst (CFA)'},
                                      {Name:'Financial Risk Manager (FRM)'},
                                      {Name:'Association of Chartered Certified Accountants (ACCA)'},
                                      {Name:'Certified Public Accountant (CPA)'},
                                      {Name:'Diploma in Banking and Finance (DBF)'},
                                      {Name:'Insurance Institute of India (III)'},
                                      {Name:'Certified Investment Banker'}
                                  ]
                              },
                              {Name:'Economics and Statistics',
                                  Children:[
                                      {Name:'BA Economics'},
                                      {Name:'B.Sc. Economics'},
                                      {Name:'BA Business Economics'},
                                      {Name:'Bachelor in Quantitative Economics'},
                                      {Name:'B.Com in Business Economics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Statistics'},
                                      {Name:'Bachelor of Statistics(B.Stat)'},
                                      {Name:'B.Sc. Data Science and Statistics'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'B.Com. LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'BA LLB'}
                                  ]
                              },
                              {Name:'Finance and Banking',
                                  Children:[
                                      {Name:'Bachelor of Finance and Investment Analysis (BFIA)'},
                                      {Name:'B.Com. in Financial Markets'},
                                      {Name:'B.Com. in Financial Management'},
                                      {Name:'Bachelor of Banking and Insurance (BBI)'},
                                      {Name:'B.Com. in Banking and Finance'},
                                      {Name:'B.Sc. in Finance'},
                                      {Name:'Bachelor in Financial and Investment Planning'},
                                      {Name:'BBA in Finance and Banking'},
                                      {Name:'BBA in Financial Services'}
                                  ]
                              },
                              {Name:'Hospitality and Hotel Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hospitality and Catering Technology'},
                                      {Name:'Bachelor of Tourism and Travel Management'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'Information Technology(B.Sc. IT )'},
                                      {Name:'B.Sc. Computer Science'},
                                      {Name:'B.Com. in Computer Applications'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA History'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Design and Media',
                                  Children:[
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'Bachelor of Event Management'}
                                  ]
                              },
                          ]
                      },
                      {Name:'CEBA',
                          Children:[
                              {Name:'Commerce and Management Degrees',
                                  Children:[
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Business Studies(BBS)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hotel Management and Catering Technology(BHMCT)'}
                                  ]
                              },
                              {Name:'Chartered and Professional Courses',
                                  Children:[
                                      {Name:'Chartered Accountancy (CA)'},
                                      {Name:'Company Secretary (CS)'},
                                      {Name:'Cost and Management Accountancy (CMA)'},
                                      {Name:'Certified Financial Planner (CFP)'},
                                      {Name:'Chartered Financial Analyst (CFA)'},
                                      {Name:'Financial Risk Manager (FRM)'},
                                      {Name:'Association of Chartered Certified Accountants (ACCA)'},
                                      {Name:'Certified Public Accountant (CPA)'},
                                      {Name:'Diploma in Banking and Finance (DBF)'},
                                      {Name:'Insurance Institute of India (III)'},
                                      {Name:'Certified Investment Banker'}
                                  ]
                              },
                              {Name:'Economics and Statistics',
                                  Children:[
                                      {Name:'BA Economics'},
                                      {Name:'B.Sc. Economics'},
                                      {Name:'BA Business Economics'},
                                      {Name:'Bachelor in Quantitative Economics'},
                                      {Name:'B.Com in Business Economics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Statistics'},
                                      {Name:'Bachelor of Statistics(B.Stat)'},
                                      {Name:'B.Sc. Data Science and Statistics'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'B.Com. LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'BA LLB'}
                                  ]
                              },
                              {Name:'Finance and Banking',
                                  Children:[
                                      {Name:'Bachelor of Finance and Investment Analysis (BFIA)'},
                                      {Name:'B.Com. in Financial Markets'},
                                      {Name:'B.Com. in Financial Management'},
                                      {Name:'Bachelor of Banking and Insurance (BBI)'},
                                      {Name:'B.Com. in Banking and Finance'},
                                      {Name:'B.Sc. in Finance'},
                                      {Name:'Bachelor in Financial and Investment Planning'},
                                      {Name:'BBA in Finance and Banking'},
                                      {Name:'BBA in Financial Services'}
                                  ]
                              },
                              {Name:'Hospitality and Hotel Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hospitality and Catering Technology'},
                                      {Name:'Bachelor of Tourism and Travel Management'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'Information Technology(B.Sc. IT )'},
                                      {Name:'B.Sc. Computer Science'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA History'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Design and Media',
                                  Children:[
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'Bachelor of Event Management'}
                                  ]
                              },
                          ]
                      },
                      {Name:'SEBA',
                          Children:[
                              {Name:'Commerce and Management Degrees',
                                  Children:[
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Business Studies(BBS)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hotel Management and Catering Technology(BHMCT)'}
                                  ]
                              },
                              {Name:'Chartered and Professional Courses',
                                  Children:[
                                      {Name:'Chartered Accountancy (CA)'},
                                      {Name:'Company Secretary (CS)'},
                                      {Name:'Cost and Management Accountancy (CMA)'},
                                      {Name:'Certified Financial Planner (CFP)'},
                                      {Name:'Chartered Financial Analyst (CFA)'},
                                      {Name:'Financial Risk Manager (FRM)'},
                                      {Name:'Association of Chartered Certified Accountants (ACCA)'},
                                      {Name:'Certified Public Accountant (CPA)'},
                                      {Name:'Diploma in Banking and Finance (DBF)'},
                                      {Name:'Insurance Institute of India (III)'},
                                      {Name:'Certified Investment Banker'}
                                  ]
                              },
                              {Name:'Economics and Statistics',
                                  Children:[
                                      {Name:'BA Economics'},
                                      {Name:'B.Sc. Economics'},
                                      {Name:'BA Business Economics'},
                                      {Name:'Bachelor in Quantitative Economics'},
                                      {Name:'B.Com in Business Economics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Statistics'},
                                      {Name:'Bachelor of Statistics(B.Stat)'},
                                      {Name:'B.Sc. Data Science and Statistics'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'B.Com. LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'BA LLB'}
                                  ]
                              },
                              {Name:'Finance and Banking',
                                  Children:[
                                      {Name:'Bachelor of Finance and Investment Analysis (BFIA)'},
                                      {Name:'B.Com. in Financial Markets'},
                                      {Name:'B.Com. in Financial Management'},
                                      {Name:'Bachelor of Banking and Insurance (BBI)'},
                                      {Name:'B.Com. in Banking and Finance'},
                                      {Name:'B.Sc. in Finance'},
                                      {Name:'Bachelor in Financial and Investment Planning'},
                                      {Name:'BBA in Finance and Banking'},
                                      {Name:'BBA in Financial Services'}
                                  ]
                              },
                              {Name:'Hospitality and Hotel Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hospitality and Catering Technology'},
                                      {Name:'Bachelor of Tourism and Travel Management'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'Information Technology(B.Sc. IT )'},
                                      {Name:'B.Sc. Computer Science'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA History'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Design and Media',
                                  Children:[
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'Bachelor of Event Management'}
                                  ]
                              },
                          ]
                      },
                      {Name:'MEBA',
                          Children:[
                              {Name:'Commerce and Management Degrees',
                                  Children:[
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Business Studies(BBS)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hotel Management and Catering Technology(BHMCT)'}
                                  ]
                              },
                              {Name:'Chartered and Professional Courses',
                                  Children:[
                                      {Name:'Chartered Accountancy (CA)'},
                                      {Name:'Company Secretary (CS)'},
                                      {Name:'Cost and Management Accountancy (CMA)'},
                                      {Name:'Certified Financial Planner (CFP)'},
                                      {Name:'Chartered Financial Analyst (CFA)'},
                                      {Name:'Financial Risk Manager (FRM)'},
                                      {Name:'Association of Chartered Certified Accountants (ACCA)'},
                                      {Name:'Certified Public Accountant (CPA)'},
                                      {Name:'Diploma in Banking and Finance (DBF)'},
                                      {Name:'Insurance Institute of India (III)'},
                                      {Name:'Certified Investment Banker'}
                                  ]
                              },
                              {Name:'Economics and Statistics',
                                  Children:[
                                      {Name:'BA Economics'},
                                      {Name:'B.Sc. Economics'},
                                      {Name:'BA Business Economics'},
                                      {Name:'Bachelor in Quantitative Economics'},
                                      {Name:'B.Com in Business Economics'},
                                      {Name:'B.Sc. Statistics'},
                                      {Name:'B.Sc. Applied Statistics'},
                                      {Name:'Bachelor of Statistics(B.Stat)'},
                                      {Name:'B.Sc. Data Science and Statistics'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'B.Com. LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'BA LLB'}
                                  ]
                              },
                              {Name:'Finance and Banking',
                                  Children:[
                                      {Name:'Bachelor of Finance and Investment Analysis (BFIA)'},
                                      {Name:'B.Com. in Financial Markets'},
                                      {Name:'B.Com. in Financial Management'},
                                      {Name:'Bachelor of Banking and Insurance (BBI)'},
                                      {Name:'B.Com. in Banking and Finance'},
                                      {Name:'B.Sc. in Finance'},
                                      {Name:'Bachelor in Financial and Investment Planning'},
                                      {Name:'BBA in Finance and Banking'},
                                      {Name:'BBA in Financial Services'}
                                  ]
                              },
                              {Name:'Hospitality and Hotel Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management(BHM)'},
                                      {Name:'Bachelor of Hospitality and Catering Technology'},
                                      {Name:'Bachelor of Tourism and Travel Management'}
                                  ]
                              },
                              {Name:'Computer Applications and Information Technology',
                                  Children:[
                                      {Name:'Bachelor of Computer Applications(BCA)'},
                                      {Name:'Information Technology(B.Sc. IT )'},
                                      {Name:'B.Sc. Computer Science'}
                                  ]
                              },
                              {Name:'Social Sciences and Humanities',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'BA Sociology'},
                                      {Name:'BA Political Science'},
                                      {Name:'BA History'},
                                      {Name:'BA Public Administration'}
                                  ]
                              },
                              {Name:'Design and Media',
                                  Children:[
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'Bachelor of Event Management'}
                                  ]
                              },
                          ]
                      }
                  ]
              },
              {Name:'ARTS',
                  Children:[
                      {Name:'HEPS',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Women’s Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HEPPSy',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HEG',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HEK',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HSK',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'SHPS',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HSPSy',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'GEPSy',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      },
                      {Name:'HPE',
                          Children:[
                              {Name:'Social Sciences and Humanities Degrees',
                                  Children:[
                                      {Name:'Bachelor of Arts(BA)'},
                                      {Name:'Bachelor of Social Work(BSW)'}
                                  ]
                              },
                              {Name:'Language and Literature',
                                  Children:[
                                      {Name:'BA in Kannada'},
                                      {Name:'BA in Language and Literature'},
                                      {Name:'BA in Comparative Literature'},
                                      {Name:'BA in Classical Languages'},
                                      {Name:'BA in Linguistics'},
                                      {Name:'BA in Translation Studies'}
                                  ]
                              },
                              {Name:'Law',
                                  Children:[
                                      {Name:'BA LLB'},
                                      {Name:'BBA LLB'},
                                      {Name:'B.Com. LLB'},
                                      {Name:'Bachelor of Laws(LLB)'}
                                  ]
                              },
                              {Name:'Journalism, Media, and Communication',
                                  Children:[
                                      {Name:'Bachelor of Mass Media (BMM)'},
                                      {Name:'BA Journalism'},
                                      {Name:'BA in Communication and Media'},
                                      {Name:'BA in Film and Television Studies'},
                                      {Name:'B.Sc. in Visual Communication'},
                                      {Name:'Bachelor of Mass Communication (BMC)'},
                                      {Name:'Bachelor of Journalism and Mass Communication (BJMC)'},
                                      {Name:'BA in Multimedia and Mass Communication'},
                                      {Name:'BA in Digital Media'},
                                      {Name:'BA in Advertising and Public Relations'},
                                  ]
                              },
                              {Name:'Management and Commerce',
                                  Children:[
                                      {Name:'Bachelor of Business Administration(BBA)'},
                                      {Name:'Bachelor of Management Studies(BMS)'},
                                      {Name:'Bachelor of Business Management(BBM)'},
                                      {Name:'Bachelor of Commerce(B.Com)'},
                                      {Name:'Bachelor of Retail Management'},
                                      {Name:'Bachelor of Business Economics (BBE)'},
                                      {Name:'Bachelor in International Business and Finance(BIBF)'},
                                      {Name:'Bachelor of Entrepreneurship'}
                                  ]
                              },
                              {Name:'Psychology and Counselling',
                                  Children:[
                                      {Name:'BA Psychology'},
                                      {Name:'Bachelor of Counselling and Psychology'},
                                      {Name:'B.Sc. Psychology'},
                                      {Name:'BA in Applied Psychology'},
                                      {Name:'BA in Clinical Psychology'},
                                      {Name:'Bachelor of Arts in Counseling'},
                                      {Name:'BA in Social Psychology'},
                                      {Name:'BA in Forensic Psychology'}
                                  ]
                              },
                              {Name:'Fine Arts, Design, and Performing Arts',
                                  Children:[
                                      {Name:'Bachelor of Fine Arts (BFA)'},
                                      {Name:'Bachelor of Design (B.Des.)'},
                                      {Name:'Bachelor of Performing Arts (BPA)'},
                                      {Name:'Bachelor of Music'},
                                      {Name:'Bachelor of Dance'}
                                  ]
                              },
                              {Name:'Public Policy, Governance, and Development Studies',
                                  Children:[
                                      {Name:'BA Public Policy'},
                                      {Name:'BA Governance and Public Administration'},
                                      {Name:'Bachelor of Development Studies'},
                                      {Name:'BA in Public Administration'},
                                      {Name:'BA in International Development'},
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Urban Studies'},
                                      {Name:'BA in Social Work with a focus on Development'},
                                      {Name:'BA in Human Rights'}
                                  ]
                              },
                              {Name:'Tourism, Hospitality, and Event Management',
                                  Children:[
                                      {Name:'Bachelor of Hotel Management (BHM)'},
                                      {Name:'Bachelor of Tourism and Travel Management(BTTM)'},
                                      {Name:'Bachelor of Event Management'},
                                      {Name:'Bachelor of Hospitality Management'},
                                      {Name:'BBA in Tourism and Hospitality'},
                                      {Name:'Bachelor of Catering Technology and Culinary Arts'},
                                      {Name:'B.Sc. in Hospitality and Hotel Administration'},
                                      {Name:'Bachelor of Tourism Studies'},
                                      {Name:'Bachelor of Arts in Tourism Administration'},
                                      {Name:'BBA in Event Management and PR'}
                                  ]
                              },
                              {Name:'Library and Information Science',
                                  Children:[
                                      {Name:'Bachelor of Library Science (B.Lib.Sc.)'},
                                      {Name:'Bachelor of Library and Information Science (B.L.I.Sc.)'},
                                      {Name:'BA in Library Science and Information Management'}
                                  ]
                              },
                              {Name:'Rural and Gender Studies',
                                  Children:[
                                      {Name:'BA in Rural Development'},
                                      {Name:'BA in Gender Studies'},
                                      {Name:'BA in Rural Studies'},
                                      {Name:'BA in Womens Studies'},
                                      {Name:'BA in Development Studies with a focus on Rural Development'},
                                      {Name:'BA in Social Work with a focus on Rural and Gender Issues'}
                                  ]
                              }
                          ]
                      } 
                  ]
              }
          ]
      },
      {Name:'DIPLOMO',
          Children:[
              {Name:'Engineering Diploma Courses',
                  Children:[
                      {Name:'Diploma in Civil Engineering'},
                      {Name:'Diploma in Mechanical Engineering'},
                      {Name:'Diploma in Electrical Engineering'},
                      {Name:'Diploma in Electronics & Communication Engineering'},
                      {Name:'Diploma in Computer Science & Engineering'},
                      {Name:'Diploma in Information Technology'},
                      {Name:'Diploma in Automobile Engineering'},
                      {Name:'Diploma in Architecture Engineering'},
                      {Name:'Diploma in Industrial Engineering'},
                      {Name:'Diploma in Chemical Engineering'},
                      {Name:'Diploma in Aeronautical Engineering'},
                      {Name:'Diploma in Mechatronics Engineering'},
                      {Name:'Diploma in Mining Engineering'},
                      {Name:'Diploma in Robotics Engineering'},
                      {Name:'Diploma in Tool & Die Engineering'},
                      {Name:'Diploma in Manufacturing Engineering'},
                      {Name:'Diploma in Marine Engineering'},
                      {Name:'Diploma in Dairy Technology'}
                  ]
              },
              {Name:'Non-Engineering Diploma Courses',
                  Children:[
                      {Name:'Diploma in Fashion Design'},
                      {Name:'Diploma in Interior Design'},
                      {Name:'Diploma in Hotel Management'},
                      {Name:'Diploma in Event Management'},
                      {Name:'Diploma in Travel & Tourism Management'},
                      {Name:'Diploma in Business Administration'},
                      {Name:'Diploma in Banking & Finance'},
                      {Name:'Diploma in Office Management'},
                      {Name:'Diploma in Animation & Multimedia'},
                      {Name:'Diploma in Graphic Design'},
                      {Name:'Diploma in Journalism & Mass Communication'},
                      {Name:'Diploma in Photography'},
                      {Name:'Diploma in Cosmetology'},
                      {Name:'Diploma in Food Technology'},
                      {Name:'Diploma in Retail Management'},
                      {Name:'Diploma in Logistics & Supply Chain Management'},
                      {Name:'Diploma in Agricultural Engineering'},
                      {Name:'Diploma in Real Estate Management'},
                      {Name:'Diploma in Textile Engineering'}
                  ]
              },
              {Name:'Medical and Paramedical Diploma Courses',
                  Children:[
                      {Name:'Diploma in Nursing'},
                      {Name:'Diploma in Pharmacy'},
                      {Name:'Diploma in Medical Laboratory Technology (DMLT)'},
                      {Name:'Diploma in Radiography'},
                      {Name:'Diploma in Physiotherapy'},
                      {Name:'Diploma in Optometry'},
                      {Name:'Diploma in Health Inspector'},
                      {Name:'Diploma in X-ray Technology'},
                      {Name:'Diploma in Dental Hygienist'},
                      {Name:'Diploma in Dialysis Technology'},
                      {Name:'Diploma in Medical Imaging Technology'},
                      {Name:'Diploma in Medical Records & Health Information Management'}
  
  
                  ]
              },
              {Name:'Art & Design Diploma Courses',
                  Children:[
                      {Name:'Diploma in Fine Arts'},
                      {Name:'Diploma in Animation'},
                      {Name:'Diploma in Graphic Design'},
                      {Name:'Diploma in Fashion Design'},
                      {Name:'Diploma in Textile Design'},
                      {Name:'Diploma in Interior Design'},
                      {Name:'Diploma in Web Designing'},
                      {Name:'Diploma in Photography'},
                      {Name:'Diploma in Video Editing'}
                  ]
              },
              {Name:'Vocational and Skill-based Diploma Courses',
                  Children:[
                      {Name:'Diploma in Welding Technology'},
                      {Name:'Diploma in Air Conditioning & Refrigeration'},
                      {Name:'Diploma in Electrical Installation & Maintenance'},
                      {Name:'Diploma in Fitting & Turning'},
                      {Name:'Diploma in Plumbing Engineering'},
                      {Name:'Diploma in Sheet Metal Work'},
                      {Name:'Diploma in Instrumentation Technology'},
                      {Name:'Diploma in Construction Technology'},
                      {Name:'Diploma in Hotel Management & Catering Technology'},
                      {Name:'Diploma in Bakery & Confectionery'},
                      {Name:'Diploma in Ceramic Engineering'},
                      {Name:'Diploma in Leather Technology'}
                  ]
              },
              {Name:'Specialized Diploma Courses',
                  Children:[
                      {Name:'Diploma in Film Making'},
                      {Name:'Diploma in Media Studies'},
                      {Name:'Diploma in Software Engineering'},
                      {Name:'Diploma in Web Development'},
                      {Name:'Diploma in Digital Marketing'},
                      {Name:'Diploma in Cyber Security'},
                      {Name:'Diploma in Artificial Intelligence (AI) & Machine Learning (ML)'},
                      {Name:'Diploma in Blockchain Technology'},
                      {Name:'Diploma in Data Science'}
                  ]
              },
          ]
      },
      {Name:'ITI',
          Children:[
              {Name:'Engineering Trades',
                  Children:[
                      {Name:'ITI in Electrician'},
                      {Name:'ITI in Fitter'},
                      {Name:'ITI in Turner'},
                      {Name:'ITI in Welder'},
                      {Name:'ITI in Draughtsman (Mechanical)'},
                      {Name:'ITI in Draughtsman (Civil)'},
                      {Name:'ITI in Motor Vehicle'},
                      {Name:'ITI in Diesel Engine'},
                      {Name:'ITI in Mechanic (Tractor)'},
                      {Name:'ITI in Machine Tools'},
                      {Name:'ITI in Machinist'},
                      {Name:'ITI in Machinist Grinder'},
                      {Name:'ITI in Tool & Die Maker'},
                      {Name:'ITI in Plastic Processing Operator'},
                      {Name:'ITI in Electronics Mechanic'},
                      {Name:'ITI in Instrument Mechanic'},
                      {Name:'ITI in Surveyor'},
                      {Name:'ITI in Foundryman'},
                      {Name:'ITI in Pattern Maker'},
                      {Name:'ITI in Sheet Metal Worker'},
                      {Name:'ITI in Wireman'},
                      {Name:'ITI in Electrician (Power Distribution)'},
                      {Name:'ITI in Lift Mechanic'},
                      {Name:'ITI in Automobile Body Repair'},
                      {Name:'ITI in Agriculture Machinery'},
                      {Name:'ITI in Electrical Maintenance'},
                      {Name:'ITI in Boiler Attendant'},
                      {Name:'ITI in Mechatronics'},
                      {Name:'ITI in Marine Fitter'},
                      {Name:'ITI in Automation Technician'},
                      {Name:'ITI in Hydraulics and Pneumatics'},
                      {Name:'ITI in Refrigeration and Air-conditioning'},
                      {Name:'ITI in CNC Programming & Operator'},
                      {Name:'ITI in Marine Engine Fitter'},
                      {Name:'ITI in Foundry Technology'}
                  ]
              },
              {Name:'Non-Engineering Trades',
                  Children:[
                      {Name:'ITI in Stenographer & Secretarial Assistant (English)'},
                      {Name:'ITI in Stenographer & Secretarial Assistant (Hindi)'},
                      {Name:'ITI in Computer Operator and Programming Assistant (COPA)'},
                      {Name:'ITI in Data Entry Operator'},
                      {Name:'ITI in Hospital Housekeeping'},
                      {Name:'ITI in Food & Beverage Service Assistant'},
                      {Name:'ITI in Health Sanitary Inspector'},
                      {Name:'ITI in Housekeeper'},
                      {Name:'ITI in Catering and Hospitality Assistant'},
                      {Name:'ITI in Sewing Technology'},
                      {Name:'ITI in Fashion Design Technology'},
                      {Name:'ITI in Baker and Confectioner'},
                      {Name:'ITI in Food Production'},
                      {Name:'ITI in Dress Making'},
                      {Name:'ITI in Front Office Assistant'},
                      {Name:'ITI in Travel and Tour Assistant'},
                      {Name:'ITI in Insurance Agent'},
                      {Name:'ITI in Desktop Publishing Operator'},
                      {Name:'ITI in Litho Offset Machine Minder'},
                      {Name:'ITI in Call Centre Assistant'},
                      {Name:'ITI in Customer Care Executive (Telecommunications)'},
                      {Name:'ITI in Event Management Assistant'},
                      {Name:'ITI in Sales & Marketing Executive'},
                      {Name:'ITI in Retail Operations'}
                  ]
              },
              {Name:'Emerging and Modern Skill Trades',
                  Children:[
                      {Name:'ITI in Renewable Energy Technician (Solar)'},
                      {Name:'ITI in Internet of Things (IoT) Technician - Smart City'},
                      {Name:'ITI in IoT Technician - Smart Agriculture'},
                      {Name:'ITI in Smart Phone Technician cum App Tester'},
                      {Name:'ITI in Drone Operator'},
                      {Name:'ITI in 3D Printing Technology'},
                      {Name:'ITI in Robotic Process Automation (RPA)'},
                      {Name:'ITI in Cyber Security'},
                      {Name:'ITI in Artificial Intelligence (AI) Technician'},
                      {Name:'ITI in Machine Learning (ML) Technician'},
                      {Name:'ITI in Blockchain Technology'},
                      {Name:'ITI in Digital Marketing Executive'},
                      {Name:'ITI in Web Designing & Development'},
                      {Name:'ITI in App Development Technician'},
                      {Name:'ITI in Cloud Computing'}
                  ]
              },
              {Name:'Skill-based & Specialized Trades',
                  Children:[
                      {Name:'ITI in Fireman'},
                      {Name:'ITI in Domestic Painter'},
                      {Name:'ITI in Leather Goods Maker'},
                      {Name:'ITI in Photographer'},
                      {Name:'ITI in Dental Laboratory Technician'},
                      {Name:'ITI in Plumber'},
                      {Name:'ITI in Pump Operator'},
                      {Name:'ITI in Library Assistant'},
                      {Name:'ITI in Spa Therapy'},
                      {Name:'ITI in Yoga Instructor'},
                      {Name:'ITI in Beauty Therapy'},
                      {Name:'ITI in Hair & Skin Care'},
                      {Name:'ITI in Weaving (Textiles)'},
                      {Name:'ITI in Marketing Executive (Retail)'},
                      {Name:'ITI in Sanitary Hardware Fitter'},
                      {Name:'ITI in Carpenter'},
                      {Name:'ITI in Goldsmith'},
                      {Name:'ITI in Jewelry Making & Designing'},
                      {Name:'ITI in Steel Fabricator'},
                      {Name:'ITI in Surface Ornamentation Techniques (Embroidery)'},
                      {Name:'ITI in Leather Technician'},
                      {Name:'ITI in Fire Fighting & Safety Management'},
                      {Name:'ITI in Floriculture and Landscaping'},
                      {Name:'ITI in Waste Management'},
                  ]
              },
              {Name:'Industry-Specific Trades',
                  Children:[
                      {Name:'ITI in Paint Technician'},
                      {Name:'ITI in Heavy Vehicle Driver'},
                      {Name:'ITI in Industrial Automation'},
                      {Name:'ITI in Textile Processing'},
                      {Name:'ITI in Food and Beverage Production'},
                      {Name:'ITI in Horticulture'},
                      {Name:'ITI in Mechanic (Agricultural Implements)'},
                      {Name:'ITI in Oil & Gas Pipeline Maintenance'},
                      {Name:'ITI in VLSI Design Technician'},
                      {Name:'ITI in Water Treatment Plant Operator'}
                  ]
              }
          ]
      }
  ]
};

const PAGE_SIZE = 9;

const AcademicNodeCard = ({ node, onClick }) => (
  <div
    className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 overflow-hidden items-center justify-center cursor-pointer hover:bg-gray-100"
    onClick={() => onClick(node)}
  >
    <h2 className="font-medium text-base">{node.name}</h2>
    {node.children?.length > 0 && (
      <p className="text-gray-500 text-base">
        ({node.children.length} options)
      </p>
    )}
  </div>
);

const AcademicTreeVisualization = () => {
  const [currentNode, setCurrentNode] = useState(treeData);
  const [nodeHistory, setNodeHistory] = useState([treeData]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNodeClick = (node) => {
    setNodeHistory([...nodeHistory, node]);
    setCurrentNode(node);
    setCurrentPage(0);
  };

  const handleGoBack = () => {
    if (nodeHistory.length > 1) {
      setNodeHistory(nodeHistory.slice(0, -1));
      setCurrentNode(nodeHistory[nodeHistory.length - 2]);
      setCurrentPage(0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const filteredChildren = getFilteredChildren();
    const pageCount = Math.ceil(filteredChildren.length / PAGE_SIZE);
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const searchTree = useCallback((node, searchTerm, path = []) => {
    const match = node.name && (
      node.name.toLowerCase() === searchTerm.toLowerCase() ||
      (node.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 2)
    );
    const newPath = [...path, { name: node.name, children: node.children }];

    if (match) {
      return [newPath];
    }
    if(searchTerm === ' ')
    {
      node.name="10th";
      const newPath = [...path, { name: node.name, children: node.children }];
      return [newPath];
    }

    const matchingPaths = (node.children || []).flatMap((child) =>
      searchTree(child, searchTerm, newPath)
    );

    return matchingPaths;
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const matchedPaths = searchTree(treeData, searchTerm);
      if (matchedPaths.length > 0) {
        const firstMatchPath = matchedPaths[0];
        setNodeHistory(firstMatchPath);
        setCurrentNode(firstMatchPath[firstMatchPath.length - 1]);
      } else {
        setCurrentNode({ name: "No results found", children: [] });
      }
    } else {
      setCurrentNode(nodeHistory[nodeHistory.length - 1]);
    }
  }, [searchTerm,nodeHistory, searchTree]);

  const getFilteredChildren = useMemo(() => {
    return currentNode.children || [];
  }, [currentNode]);

  const getPagedChildren = useMemo(() => {
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return getFilteredChildren.slice(startIndex, endIndex);
  }, [getFilteredChildren, currentPage]);

  const getBreadcrumbs = () => {
    return nodeHistory.map((node, index) => (
      <div
        key={index}
        className="flex flex-row items-center justify-center hover:underline cursor-pointer mr-0"
        onClick={() => {
          setNodeHistory(nodeHistory.slice(0, index + 1));
          setCurrentNode(node);
          setCurrentPage(0);
        }}
      >{node.name}{index < nodeHistory.length - 1 && (<MoveRight className='w-4 text-gray-400 m-2 mr-0'/>)}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-0 w-auto">
      <div className="flex justify-between w-full mb-4 p-2">
        <div className="flex items-center gap-2">{getBreadcrumbs()}</div>
        <div className="flex items-center">
          <div className="flex items-center bg-gray-100 rounded-md p-2 mb-2">
            <Search className=" text-gray-500 m-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent py-2 px-2 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full max-w-4xl gap-6">
        <div className="flex items-center justify-center w-1/12 mr-2">
          {(nodeHistory.length > 1 || currentPage > 0) && (
            <button
              className="flex items-center text-black-500 hover:text-gray-500 focus:outline-none"
              onClick={currentPage > 0 ? handlePreviousPage : handleGoBack}
            >
              <ChevronLeft className="mr-2" />
              {currentPage > 0 ? 'Previous' : 'Back'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {getPagedChildren.map((child, index) => (
            <AcademicNodeCard key={index} node={child} onClick={handleNodeClick} />
          ))}
          {getPagedChildren.length === 0 && (
            <p className="text-center text-gray-500">End of Tree</p>
          )}
        </div>

        <div className="flex items-center justify-center w-1/12">
          {getFilteredChildren.length > PAGE_SIZE * (currentPage + 1) && (
            <button
              className="flex items-center text-black-500 hover:text-gray-500 focus:outline-none"
              onClick={handleNextPage}
            >
              Next
              <ChevronRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicTreeVisualization;
