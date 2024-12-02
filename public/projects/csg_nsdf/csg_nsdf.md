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

We proposed a presentation of the paper that can be found [here](public\projects\csg_nsdf\Slide_proj_mva_geom.pptx)