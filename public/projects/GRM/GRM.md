---
date: 09-09-2025
title : Re-implementation of Dynamic Hybrid Algorithms for MAP Inference in Discrete MRFs
tags: ["Graph-Cut"]
stags: ["Graph cut"]
links: ["https://github.com/abatifol/graphCut_image_segmentation"]
linksDescription: ["Github repo"]
image: "result_grm.png"
---

## Abstract
Image segmentation is a fundamental problem in computer vision, with applications ranging from medical
imaging to object recognition. Traditional neural network models, such as CNNs, require large amount of labeled data and extensive computational resources to perform image segmentation. In contrast graph-cut based
segmentation can perform one-shot segmentation and
also handle multi-label segmentation. In this project,
we explore graph cut algorithm to perform multi-label
segmentation.The code is available on GitHub
#  Dynamic Hybrid Algorithms for MAP Inference in Discrete MRFs


## Objective

In this project, we implemented the following:

- Reimplementation of the max-flow/min-cut algorithm and comparison of our implementation against networkx and pymaxflow python modules.
- Multi-label segmentation with α-expansion.
- Comparison of performance with different pairwise and unary costs.
- Graph recycling to improve computational efficiency.
- Extensions: interactive binary (background/foreground) and multi-label segmentation.

## Problem Formulation

### Graph Cut and Energy Minimization

The image segmentation problem can be expressed as an energy minimization problem, where images are represented as a directed graph $ G = (V, E) $. $ V $ is the set of vertices corresponding to the image pixels, and $ E $ represents the edges. We consider a 4-connected neighborhood, where each pixel is connected with its right, left, above, and below neighbors (except on the edges). These connections are represented by the edges. If we denote by $ \mathcal{L} $ the set of labels, $ n $ the number of pixels, and $ x \in \mathcal{L}^n $ a possible labeling, we would like to minimize an energy $ E: \mathcal{L}^n \to \mathbf{R} $ that maps any possible labeling to a global cost.

The energy function typically adopted in computer vision, and considered herein, is expressed as a sum of unary $ \phi_i $ and pairwise $ \phi_{ij} $ potential terms:

$$
E(\mathbf{x}) = \sum_{i \in V} \phi_i(x_i) + \sum_{(i,j) \in E} \phi_{ij}(x_i, x_j).
$$

The **unary potential** $ \phi_i(x_i) $ acts as a data fidelity term. It represents the cost of assigning a pixel to a label. Conversely, the **pairwise potential** $ \phi_{ij}(x_i, x_j) $ enforces spatial coherence by penalizing label differences between neighboring pixels.

We detail the different unary potentials we considered in Section [Unary Potential](#unary-potential). For the pairwise potentials, we restrict ourselves to potential models like the Potts model with $ \gamma = 200 $.

The Potts model is defined as:

$$
\phi_{ij}(x_i, x_j) =
\begin{cases}
\gamma & \text{if } x_i = x_j \\
0 & \text{otherwise}
\end{cases}
$$

### α-expansion Algorithm

Since most multi-label energy functions are not submodular, proposed algorithms only focus on finding approximate or partially optimal solutions. In this project, we reimplemented the α-expansion algorithm. At each iteration, we choose a label and apply graph cut to find the optimal expansion that decreases the energy. At each iteration, we consider a binary sub-problem and separate the pixels between being labeled as α or keeping their old label. To do so, we construct a new graph at each iteration, introducing two additional nodes, the **source (α)** and **sink (ᾱ)**, as well as auxiliary nodes. The weights of the edges represent the unary and pairwise costs. We then compute the maxflow, and each node is assigned a label depending on the partition of the mincut it belongs to (label as α if it belongs to the source partition and keep the old label otherwise). We perform these expansion moves until the energy stops decreasing.

### Max-flow/Min-cut with Ford-Fulkerson Algorithm

We used the Ford-Fulkerson algorithm to calculate the maxflow from the source $ s $ to the sink $ t $ and find the minimum S/T-cut.

**Algorithm:**

1. Initialize flow $ f(u,v) = 0 $ for all edges.
2. While there exists an **augmenting path** from source $ s $ to sink $ t $ in the residual graph:
   - Find an augmenting path using BFS.
   - Compute the minimum residual capacity along the path.
   - Increase flow along this path by this capacity.
   - Update the residual capacities:
     $$
     c_f(u,v) = c(u,v) - f(u,v) \quad \text{and} \quad c_f(v,u) = f(u,v) \quad \text{(reverse flow)}
     $$
3. Repeat until no more augmenting paths exist.
4. Find the edges that have no residual capacity and are thus part of the cut.

For the project, we reimplemented the max-flow algorithm from scratch using only basic Python libraries like numpy. We then compared our performance against other libraries like pymaxflow, which is a Python wrapper for the C++ library, and networkx. We compared both the execution time and the maxflow value to ensure the correctness of our implementation for multiple node numbers, keeping the same type of 4-connected network.

While our implementation consistently produced correct max-flow values, it exhibited significantly slower execution times compared to the other libraries. For instance, processing a graph with 20,000 nodes required over six minutes, making it unsuitable for practical use, even for low-resolution images (e.g., $ 256 \times 256 \approx 65,000 $ nodes), which would entail prohibitively long runtimes.

Consequently, for the remainder of the project, we utilized `pymaxflow` due to its high efficiency stemming from its underlying C++ implementation. This performance limitation illustrates one of the challenges we encountered when developing graph algorithms in high-level interpreted languages such as Python.

## Results

One of the difficulties we encountered was finding the proper unary and pairwise costs that yield good quality segmentation.
<figure id="fig:test">
    <img src="images/cow_convergence_3l.png" style="width: 300px; display: block; margin: 0 auto;">
    <figcaption  style="text-align: center;"> Result of the alpha-expansion on a cow </figcaption>

</figure>



### Unary Potential

We evaluated different formulations for the unary potential:

- **Semi-automatic approach:** Using the k-means clustering method, we computed histograms in the pixel space for each label. These histograms were then modeled as Gaussian distributions, which were used to define the corresponding unary terms.
- **L2-based potential:** Given the reference colors of each label, we computed the L2 norm in a color metric space between the assigned label colors and the actual pixel colors. Initially, this was performed in the standard RGB space. However, a limitation of the RGB space is that perceptually similar colors may not be close in Euclidean distance. To address this, we experimented with an alternative metric space that accounts for perceptual color differences: the CIELAB color space.

The results of the L2 norm in RGB and CIELAB spaces are promising. Applying the L2 norm in both RGB and CIELAB spaces improved segmentation accuracy, successfully identifying structural elements such as the cow's legs. The CIELAB-based unary potential further enhanced segmentation, even correctly identifying the cow’s horns.

However, increasing the number of labels introduced more noise. As a consequence, parts of the cow’s back and some regions of the grass were misclassified. These findings highlight the sensitivity of color-based segmentation using graph cuts to input parameters, unary potential formulations, and hyperparameter tuning, emphasizing the importance of proper scaling and term weighting.

### Energy Minimization with Graph Recycling

To enhance the efficiency of energy minimization, we implemented the graph recycling algorithm. Following the approach introduced by Kovtun, the method aims to reduce the number of unknown variables by solving a set of auxiliary binary problems $ P_m $, one for each label $ l_m \in \mathcal{L} $. This strategy allows partial labeling of the image before applying more computationally intensive multi-label optimization. We used the same unary potential as defined in the original article.

**Graph Recycling Algorithm:**

1. Initialize all pixels as unlabeled ($ \epsilon $).
2. For each label $ \alpha \in \mathcal{L} $, solve the binary subproblem:
   - Assign label $ \alpha $ to pixel $ i $ if $ x_i^\alpha = 1 $.
3. Update unary potentials for remaining unlabeled pixels and apply α-expansion on this subset.

After the recycling step, the majority of pixels are already labeled, significantly reducing the number of variables requiring optimization during the subsequent α-expansion phase. This leads to a substantial reduction in computational complexity while maintaining segmentation quality.

## Interactive Image Segmentation

We implemented an extension of our previous work where we allow user interaction and used pairwise costs based on pixel value instead of only pixel labeling.

At the beginning, the user must indicate with a small brush some pixels that belong to the background ($ \mathcal{B} $) and others that belong to the foreground ($ \mathcal{F} $). These pixels, named seeds, will be linked to the terminal nodes, which represent background (the sink) and foreground (the source). We implemented a simplified version where only seeds get strong unary costs. The pairwise cost between two pixels $ p $ and $ q $ was defined as $ V_{\{p,q\}} = \frac{1}{1 + \| I(p) - I(q) \|} $ where $ I $ maps a pixel to its color value and $ K = 10^9 $.

We compute the maxflow and find the min-cut to assign the labels. Nodes that belong to the source partition will be labeled as foreground and background otherwise.

We also extended this method to multi-label segmentation.

As the interactive segmentation was only an extension of our model, we implemented a simple model which could benefit from more complex unary costs that also take into account non-seeds pixels.

## Conclusion

We successfully applied the α-expansion algorithm and graph recycling strategies to perform multi-label segmentation within a reasonable computational time.

In this work, we adhered to the same qualitative evaluation criteria as defined in the original study. Commonly used image segmentation datasets are primarily designed for object segmentation tasks, which rely on complex priors and high-level semantic cues, thereby requiring more than color-based energy terms alone. Consequently, when such datasets are used in the context of purely color-based segmentation, the resulting masks often encompass large, semantically inconsistent regions that do not correspond to any meaningful object boundaries. Finding a dataset that encompasses these color priors constitutes an interesting and valuable direction for future research.

Furthermore, we encountered significant challenges in the definition and tuning of the unary and pairwise cost functions. These terms are inherently image-dependent and lack intuitive parametrization, which often led to suboptimal visual segmentations. Systematic approaches for estimating these parameters merit further investigation.
