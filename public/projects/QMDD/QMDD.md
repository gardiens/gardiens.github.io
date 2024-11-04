---
date: 01-09-2022
title : Matrices synthesis with QMDD
tags: ["Quantum Computing, ZX Diagram"]
stags: ["Quantum Computing"]
links: ["Nowebsite"]
linksDescription: ["Github repo"]
image: "screen.png"
---

## Abstract 
Une des problématiques de l’informatique quantique est de trouver le nombre minimal de portes
quantiques pour préparer synthétiser des circuits quantiques. Pour cela, nous avons étudié une piste
qui consiste à utiliser de Quantums Multiple Decisions Diagrams (QMDDs).Alors que certains auteurs se sont intéressés à la synthèse de QMDD à l’aide de la logique classique [6], nous nous sommes
concentrés à traduire le QMDD dans un langage graphique appelé ZX. Notre apport est une implémentation des QMDDs en python, une proposition de synthèse des générateurs des QMDDs et
une identification de pistes supplémentaires pour la synthèse en diagramme ZX. 
Un rapport détaillé est disponible [ici](https://github.com/gardiens/gardiens.github.io/tree/main/public/projects/QMDD_rapport.pdf)

## Main body


Lors de ce pôle projet, nous avons pu étudier la synthèse de circuit quantique à l’aide des QMDDs.
Pour cela, nous avons d’abord réimplémenté les QMDDs en python pour pouvoir être manipulable
avec une documentation clair, puis nous avons trouvé des équivalents en ZX des éléments fondamentaux des QMDDs. Ces générateurs peuvent se traduire en informatique quantique au prix de mesures
post-sélections.Nous avons obtenu des résultats à première vue prometteurs, mais qui nécessiterait
des travaux supplémentaires. En effet, il faudrait réussir à quantifier la probabilité d’obtenir le résultat à l’aide de nos mesures post-sélections et nous pourrions aussi regarder nos résultats avec des
librairies qui utilisent déjà les mesures post-sélections. Concernant les QMDDs en tant que tel, je
pense qu’ils existent plusieurs pistes d’amélioration.

— Il faudrait réussir à mieux comprendre l’interaction entre les QMDD et la synthèse des coefficients sur les arêtes. Pour cela, on pourrait étudier leurs interactions en ZH pour essayer de
trouver des représentations intermédiaires pour faire de simplifier ces coefficients.

— On pourrait aussi regarder à quelles conditions sur les arêtes un QMDD possède ou non un
g-flow [3], ce qui devrait être possible, car dans certains cas, il existe une traduction en circuit
quantique de ces QMDDs.

— Enfin, une autre piste d’amélioration serait de creuser l’interaction entre les QMDDs et les
BDDs. Une voie serait de regarder s’il est possible de voir à quelles conditions nous pourrions
utiliser les mêmes algorithmes que les BDDs mais appliqué sur les QMDDs.

Nous pensons que ces différentes voies permettraient d’améliorer nos résultats obtenus lors de ce
parcours recherche