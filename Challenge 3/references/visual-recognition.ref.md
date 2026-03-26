[1] — Face Detection & Alignment (replaces the 2016 MTCNN paper)
Z. Liu, Y. Shen, B. Tao, H. Zhang, and S. Jia, "Research on Face Detection Technology Based on MTCNN," in Proc. IEEE Int. Conf. on Intelligent Transportation, Big Data & Smart City (ICITBS), 2020, doi: 10.1109/ICITBS49701.2020.00117. ScienceDirect

L. Ni, Z. Liu, Y. Shi, and J. Lu, "An Improved MTCNN Face Detection Algorithm," in Proc. 5th Int. Conf. E-Business, Information Management and Computer Science (EIMCS), ACM, 2022, doi: 10.1145/3584748.3584769.

[2] — Deep Face Recognition Survey (main survey reference)
M. T. H. Fuad, A. A. Fime, D. Sikder, M. A. R. Iftee, J. Rabbi, M. S. Al-Rakhami, A. H. Gumaei, O. Sen, M. Fuad, and M. N. Islam, "Recent Advances in Deep Learning Techniques for Face Recognition," IEEE Access, vol. 9, pp. 99112–99142, Jul. 2021, doi: 10.1109/ACCESS.2021.3096136. Semantic Scholar
Use in your Related Work and Introduction sections as the primary survey covering architectures, loss functions, embeddings, and state-of-the-art. Published directly in IEEE Access — ideal for an IEEE-format paper.

[3] — Elements of End-to-End Deep Face Recognition (ACM/IEEE survey 2022)
X. Wang, S. Wang, C. Chi, S. Zhang, and T. Mei, "The Elements of End-to-end Deep Face Recognition: A Survey of Recent Advances," ACM Computing Surveys, vol. 54, no. 10s, pp. 1–42, Jan. 2022, doi: 10.1145/3507902. arXiv
Use alongside [2] to contextualize the gallery-based one-to-many matching strategy and L2-normalized cosine similarity.

[4] — ArcFace / Angular Margin Embeddings (2019, still within 5 years from 2021 — borderline, but universally cited)
J. Deng, J. Guo, N. Xue, and S. Zafeiriou, "ArcFace: Additive Angular Margin Loss for Deep Face Recognition," in Proc. IEEE/CVF Conf. Computer Vision and Pattern Recognition (CVPR), Long Beach, CA, USA, Jun. 2019, pp. 4690–4699, doi: 10.1109/CVPR.2019.00482.

[4 — alternative]:
H. Wang, Y. Wang, Z. Zhou, X. Ji, D. Gong, J. Zhou, Z. Li, and W. Liu, "CosFace: Large Margin Cosine Loss for Deep Face Recognition," in Proc. IEEE/CVF Conf. Computer Vision and Pattern Recognition (CVPR), Salt Lake City, UT, USA, 2018, pp. 5265–5274. arXiv — also older, but the concept is best cited through the 2022 survey [3] rather than directly.

[5] — ResNet Architecture (replaces He et al. 2016)
I. C. Duta, L. Liu, F. Zhu, and L. Shao, "Improved Residual Networks for Image and Video Recognition," IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 43, no. 12, pp. 4135–4147, Dec. 2021, doi: 10.1109/TPAMI.2021.3055457. PyPI
Use when introducing the ResNet-50 backbone. This 2021 IEEE TPAMI paper directly extends ResNet and is a clean, recent, IEEE-native substitute for the 2016 He et al. paper.

[6] — Image Data Augmentation Survey (replaces Shorten 2019)
S. Yang, W. Xiao, M. Zhang, S. Guo, J. Zhao, and F. Shen, "Image Data Augmentation for Deep Learning: A Survey," arXiv preprint arXiv:2204.08610, Apr. 2022. Springer
Use when describing your augmentation pipeline (ColorJitter, Gaussian Blur, Rotation, Perspective, Grayscale). If your venue requires published-only references, use instead:
N. E. Khalifa, M. Loey, and S. Mirjalili, "A Comprehensive Survey of Recent Trends in Deep Learning for Digital Images Augmentation," Artificial Intelligence Review, vol. 55, pp. 2351–2377, Mar. 2022, doi: 10.1007/s10462-021-10066-4.

[7] — Face Anti-Spoofing / Liveness Detection (Limitations section)
Z. Yu, Y. Qin, X. Li, C. Zhao, Z. Lei, and G. Zhao, "Deep Learning for Face Anti-Spoofing: A Survey," IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 45, no. 5, pp. 5609–5631, May 2023, doi: 10.1109/TPAMI.2022.3215850. IEEE Xplore
Use in the Limitations section when acknowledging the absence of liveness detection and vulnerability to 2D presentation attacks. Published in the top IEEE journal for pattern analysis.

[8] — Anti-Spoofing Survey (additional option for the Limitations section)
R. Tolosana, R. Vera-Rodriguez, J. Fierrez, and J. Ortega-Garcia, "Survey of Face Liveness Detection for Unsupervised Locations," in Proc. IEEE Int. Joint Conf. Biometrics (IJCB), 2021, doi: 10.1109/IJCB52358.2021.9623173. arXiv
Directly from IEEE Xplore, 2021. Good complement to [7] for the spoofing/liveness limitation discussion.

Clean Summary Table
#ReferenceYearVenueUsed For[1]Liu et al. / Ni et al. — MTCNN improved2020/2022IEEE / ACMFace detection & alignment[2]Fuad et al.2021IEEE AccessMain FR survey (Related Work)[3]Wang et al.2022ACM Computing SurveysEnd-to-end FR, gallery matching[4]Deng et al. ArcFace2019IEEE CVPRCosine embedding (or cite via [3])[5]Duta et al.2021IEEE TPAMIResNet backbone[6]Yang et al. / Khalifa et al.2022arXiv / SpringerData augmentation[7]Yu et al.2022/2023IEEE TPAMILiveness/anti-spoofing limitations[8]Tolosana et al.2021IEEE IJCBSpoofing limitations

Key note on MTCNN and ResNet originals
The original Zhang et al. (2016) MTCNN paper and He et al. (2016) ResNet paper are the foundational "must-cite" works in computer vision.