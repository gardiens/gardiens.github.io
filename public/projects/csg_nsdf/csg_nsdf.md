---
date: 09-09-2024
title : Constructive Solid Geometry on Neural Signed Distance Fields 
tags: ["3D Deep Learning"]
stags: ["3D deep Learning"]
links: ["https://dl.acm.org/doi/fullHtml/10.1145/3610548.3618170"]
linksDescription: ["Paper"]
image: "csg_nsdf.PNG"
---

## Abstract

Signed Distance Fields (SDFs) parameterized by neural networks have recently gained popularity as a fundamental geometric representation. However, editing the shape encoded by a neural SDF remains an open challenge. A tempting approach is to leverage common geometric operators (e.g., boolean operations), but such edits often lead to incorrect non-SDF outputs (which we call Pseudo-SDFs), preventing them from being used for downstream tasks. In this paper, we characterize the space of Pseudo-SDFs, which are eikonal yet not true distance functions, and derive the closest point loss, a novel regularizer that encourages the output to be an exact SDF. We demonstrate the applicability of our regularization to many operations in which traditional methods cause a Pseudo-SDF to arise, such as CSG and swept volumes, and produce a true (neural) SDF for the result of these operations.

We proposed a presentation of the paper that can be found [here](https://github.com/gardiens/gardiens.github.io/blob/main/public/projects/csg_nsdf/Slide_proj_mva_geom.pptx)



## Constructive Solid Geometry on Neural Signed Distance Fields

### Introduction

Signed Distance Functions (SDFs) provide a canonical representation for implicit functions, essential for 3D modeling and complex Boolean operations. Despite their utility, SDFs face challenges when undergoing shape editing operations, such as Boolean combinations, as these operations often disrupt the stability required for rendering (e.g., ray marching). A key question is how to recover a true SDF after such transformations. One promising approach involves applying morphological operations like erosion and dilation.

### Context: Taxonomy of Implicit Functions

In 3D modeling, various implicit functions allow for the representation and manipulation of shapes. However, SDFs stand out for their ability to precisely define the distance to the nearest surface, making them ideal for certain applications. The challenge lies in maintaining this precision across transformations and ensuring rendering robustness.

#### Shape Editing with SDFs
While SDFs enable easy execution of Boolean operations for shape editing, they are not inherently stable. This instability can lead to rendering inaccuracies and limits their usability in certain applications.

#### Proposed Solution
To address these limitations, the paper introduces a novel loss function designed to regularize the output of implicit functions. This loss enhances the stability of SDFs under transformations, providing a more robust foundation for advanced shape editing techniques.

### Highlights of the Loss Function

The new loss function is defined as:

\[
\theta^* = \arg \min_{\theta} \mathcal{L}(\theta) + \lambda_c E_{\text{CP}}(\theta, X) + \lambda_e E_{\text{eik}}(\theta, X),
\]

where:

- \( \mathcal{L}(\theta) \): A loss term that measures how far the model is from the initial approximation.
- \( E_{\text{CP}}(\theta, X) \): A **conservative loss** that enforces the implicit function to adhere to Signed Distance Function (SDF) properties.
- \( E_{\text{eik}}(\theta, X) \): The **eikonal loss**, which enforces the implicit function to satisfy the eikonal equation, ensuring smoothness and geometric consistency.
- \( \lambda_c \) and \( \lambda_e \): Regularization coefficients that balance the contributions of the respective loss terms.

1. **Construction**: The proposed loss function combines regularization with constraints tailored to maintain SDF properties. 
2. **Application**: It is versatile and can be seamlessly integrated into existing frameworks.
3. **Efficiency**: While initial implementations required significant computational effort (e.g., 4 hours for regularization of a simple shape), optimizations through targeted reimplementations demonstrate considerable speed-ups.

### Applications

1. **Constructive Solid Geometry (CSG)**:
   - Facilitates the composition of complex 3D models using Boolean operations.
   - Ensures stability of SDFs during these operations.

2. **Swept Volumes**:
   - Enables the modeling of shapes resulting from motion paths, a critical capability in animation and mechanical design.

### Results and Limitations

#### Results
- The proposed loss function effectively corrects SDFs for simple shapes.
- Integration with importance sampling further improves efficiency by focusing computation on points near the zero level set.

#### Limitations
- Computational cost remains high for complex shapes, necessitating manual parameter tuning.
- The regularization process, while improved, still requires refinement for practical applications.

### Importance Sampling

To enhance performance, importance sampling was employed. This technique prioritizes sampling near points of interest (e.g., the zero level set), reducing computational overhead compared to uniform random sampling.

### Conclusions

This work proposes a new loss function for regularizing implicit functions, significantly improving the stability of SDFs during transformations. The approach is adaptable and can be incorporated into existing frameworks, making it a valuable contribution to 3D modeling and shape editing. However, further optimization and automation are needed to fully realize its potential in practical settings.

---
**Future Work**:
- Investigating more efficient sampling strategies.
- Extending the method to handle more complex shapes.
- Exploring automated tuning of loss function parameters to enhance usability.