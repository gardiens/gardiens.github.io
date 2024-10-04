---
date: 08-03-2022
title : Scheduling Problem
tags: ["Optimization", "Mixed Integer Linear Programming", "Tabu Search", "Genetic Algorithm"]
stags: ["Optimization", "MILP", "Tabu Search", "GA"]
links: ["https://github.com/julien-rsbrg/Optimization_Decision_Brain"]
linksDescription: ["Github"]
image: "schedule.png"
---

## Abstract

A project to solve the $1|r_j|\sum_j w_jT_j$ Scheduling problem.

A task squedulling problem on **one machine** whith :
- $r_j$ : release dates
- $p_j$ : processing times
- $d_j$ : due dates
- $w_j$ : weights

# Schedulling Problem

## Problem

The problem to solve is the following : $1|r_j|\sum w_jT_j$

The objective is to minimize the sum of the weighted delays on one machine according to minimal starting dates ($r_j$) and due dates ($d_j$)

$$
(P)=\left\{ 
    \begin{array}{ll}
        \min & \sum w_jT^\sigma_j \\
        & T^\sigma_j = \max(0,c_{\sigma(j)}-d_j) & \forall j\\
        & c_{\sigma(j)} \geq r_j + p_j & \forall j \\
        & \sigma \in S(n) \text{ : permutation}
    \end{array}
\right.
$$

We want to find a permutation of the tasks $\sigma (j)$

### Heuristics

We defined 7 heuristics to solve the problem. The heuristics are the following :

- EDD : Earliest Due Date, by sorting the jobs by due date in ascending order
- LPT : Longest Processing Time, by sorting the jobs by processing time in descending order
- SPT : Shortest Processing Time, by sorting the jobs by processing time in ascending order
- Minimum Slack : by sorting the jobs by slack in ascending order. A slack is the difference between the due date and the processing time
- Weighted SPT : by sorting the jobs by the ratio of weight and processing time in ascending order
- FIFO : First In First Out, by sorting the jobs by their arrival time in ascending order
- Weight First : by sorting the jobs by weight in descending order

### Linear Programming


We can express it as a linear programming problem by adapting the formulation that we saw during the class :

$$
(LP)=\left\{ 
    \begin{array}{ll}
        \min & \sum w_jT_j \\
        & T_j \geq 0 & \forall j\\
        & T_j \geq c_j - d_j & \forall j\\
        & c_j \geq r_j + p_j & \forall j\\
        & x_{ij} + x_{ji} = 1 & \forall i,j, i \neq j\\
        & c_j \geq c_i + p_j + M(x_{ij} - 1)& \forall i,j, i\neq j\\
        & x_{ij} \in \{0,1\}, c_j \in \mathbb{N}& \forall i,j, i\neq j\\
    \end{array}
\right.
$$

$x_{ij}$ set to 1 if job i is before job j, otherwise set to 0

$M$ is set to a high value, so that $M \geq \max (c_i+p_j)$

#### Simplified Linear Programming Problem

We can keep only the top triangle of the matrix as the relation $x_{ij} = 1-x_{ji}$ stands for the bottom triange

$$
(LP')=\left\{
    \begin{array}{ll}
        \min & \sum w_jT_j \\
        & T_j \geq 0 & \forall j\\
        & T_j \geq c_j - d_j & \forall j\\
        & c_j \geq r_j + p_j & \forall j\\
        & c_j \geq c_i + p_j + M(x_{ij} - 1)& \forall i,j, i\text{<}j\\
        & c_j \geq c_i + p_j - Mx_{ji}& \forall i,j, i\text{>}j\\
        & x_{ij} \in \{0,1\}, c_j \in \mathbb{N}& \forall i,j, i\text{<}j
    \end{array}
\right.
$$

This way we get 2x fewer variables and less constraints


### Evaluation 

For small instances (n<10), we can compare the results with the optimal solution found with the linear programming problem. For bigger instances, we can compare the results with the best heuristic (tabou multi-start).

### Aim of the Study

We build an algorithm/formula that decides wich algorithm/heuristic to use according to the parameter distributions : which one performs the best 
