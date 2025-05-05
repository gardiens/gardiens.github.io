---

date: 01-09-2025  
title: Workflow and Tips  
tags: ["opinions"]  
stags: ["opinions"]  
links: ["Nowebsite"]  
linksDescription: ["GitHub"]  
image: "image.png"  

---

# Abstract  
This document summarizes the workflow and practical tips I currently follow. Please note that this version is a draft.

# Workflow. 
This section provides an overview of tools and practices aimed at improving reproducibility, experiment tracking, and code reliability in research workflows. Each subsection briefly describes a component of the workflow, its purpose, and recommendations based on practical experience.

## Pre-commit  
Pre-commit is a useful tool for ensuring code standardization in a reproducible manner. I have tested several pre-commit configurations and, for research-oriented projects, I recommend using lightweight hooks such as those described [here](https://github.com/gardiens/research-project-template/blob/main/.pre-commit-config.yaml).  
To set it up, simply run `pre-commit install`. Once installed, the checks will automatically run with each commit.


## Hydra 
When doing more experiments, it is really important to be able to track and backtrack any improvements and changes. Hydra is a python framework that provides a (not) convenient way to create a hierarchical configuration by compisition and override through config files and command lines.  I will ( or should have) created a blogs about it

## TensorBoard / ClearML  
Effective experiment tracking requires a robust logging tool. I have personally used ClearML, which allows monitoring of experiment outcomes. In the future, I plan to systematically store my scripts alongside experiments to facilitate reproducibility and experimentation history. It is really important when writing report and competitions and you can feel the huge difference when you are using it or not.

## Workflows  
Automation workflows (e.g., GitHub Actions) can verify that code executes correctly upon each commit or push. They are especially useful for ensuring reproducibility of installations and validating that tests pass consistently. I recommend combining this with Pytest, although setting up workflows locally can be complex.

## Pytest  
Pytest provides a means to verify the core functionality of your codebase. In deep learning and prototyping contexts, extensive test coverage may not be essential, but testing core scripts such as `main.py` or major functions is beneficial. This ensures peace of mind when collaborating within a team.

## Auto Typer  
This tool has potential, but I do not yet have sufficient experience with it to incorporate it into my current workflow.


## Tips
### Writing the Results Section  
A colleague once recommended a clear structure for writing results:  
" we have **CAUSE** which causes **PROBLEMS**. therefore we or they do **CONTRIBUTION**  and **WHY WE SOLVE IT**"
This framework has significantly improved the clarity of my writing, especially in research papers where structure can make a substantial difference — including my own work.

### Python Notebooks  
Python notebooks have recently gained popularity as a convenient tool for writing and executing code in educational contexts such as labs or tutorials. However, for projects requiring more than one hour of sustained development, notebooks present several critical limitations:

- **Poor version control:** Traditional versioning systems like Git are not well-suited to notebooks. Commits do not clearly show line-by-line code changes, and merge conflicts are difficult to resolve.
- **Non-linear execution:** Notebooks allow cells to be executed in arbitrary order, which undermines reproducibility. It becomes difficult to ensure that the notebook can run from top to bottom without errors.
- **Resource inefficiency:** For memory- or GPU-intensive tasks, Jupyter can be inefficient and place significant load on system resources, making it less suitable for heavy computations.
- **Short lifecycle and poor maintainability:** In practice, notebooks often lack sufficient documentation and structure. Over time, users forget the purpose and logic of the code, leading to repeated, redundant work.

Based on these limitations, I recommend the following workflow:

- Core functions should be defined in `.py` files organized in a standard Python project structure. This promotes clarity, reuse, and traceability of changes through version control.
- The notebook itself should only contain function calls and minimal code for visualization or debugging. It should not serve as the primary implementation file.

In summary, I strongly discourage the use of notebooks as the main development environment. Instead, I advocate for using a proper logging system and structured Python scripts.