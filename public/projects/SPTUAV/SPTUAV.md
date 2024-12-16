---
date: 09-09-2024
title : Semantic Segmentation on UAV 
tags: ["Semantic Segmentation,3D,Lidar Point clouds"]
stags: ["Semantic Segmentation","3D","Lidar Point Clouds"]
links: ["https://github.com/gardiens/superpoint_transformer_OS"]
linksDescription: ["Github repo"]
image: "prediction-bags.png"
---

## Abstract
We published a [paper about it](https://isprs-archives.copernicus.org/articles/XLVIII-2-W8-2024/45/2024/)
With the rapid development of 3D sensing technologies, 3D point cloud semantic segmentation has seen a rise in adoption from many fields. Indeed, while RGB cameras remain a popular choice under good visibility conditions, such sensors are inefficient in indoor environments where visibility can be hindered, for example by dust or fog. The more robust LiDAR sensors therefore play a growing role in 3D building reconstruction, high-level task planning, and robot navigation. Traditionally, point clouds are generated using expensive, heavy, high-precision sensors, with practitioners focusing on constructing accurate reconstructions without any time constraint. 

However, when autonomously exploring an indoor environment, mobile vehicles typically construct an internal map of the environment on the go. As they have limited fuel/energy, they need to understand their environment with lightweight sensors in real-time to make decisions. Moreover, in certain real-time applications, such as high-level task planning, quick scene understanding is a helpful feature to support decision-making.

Most existing 3D semantic segmentation methods focus on sparse outdoor LiDAR scans for autonomous navigation. However, there is limited research on indoor semantic segmentation with mobile mapping platforms due to a lack of available open-source data. For example, S3DIS, a popular indoor dataset, does not provide any sensor trajectory, and the sensors used for acquisition were primarily RGBD sensors.

In this paper, we present a real-time capable semantic segmentation approach for LiDAR point clouds (at the example of an indoor UAV platform). The input point cloud is assumed to be acquired with a dome LiDAR scanner with a non-repeatable scan pattern and preprocessed with a real-time mapping and state estimation algorithm. Our goal is therefore to design a semantic segmentation pipeline that collects point cloud submaps every $n$ seconds and predicts per-point labels. Such point clouds may suffer from inaccuracies due to the cheaper sensor's accuracy and the time-optimized SLAM algorithm. Model inference is also made more challenging by the lack of RGB features, without which small items may be unrecognizable. In this uncooperative setup, we focus on important structural classes within indoor environments, specifically walls, ceilings, floors, doors, and windows.

Our contributions are as follows:

- We adapt the Superpoint Transformer model to near real-time semantic segmentation, which entails both robustness and speed improvements of the pipeline. Specifically, we increase the number of neighbors in the preprocessing pipeline by a factor of 10 from 50 to 500 and change the partitioning algorithm to a simple but efficient voxel grid. 
- We propose a training procedure to train semantic segmentation models on available open-source datasets without any sensor trajectory for semantic segmentation in near real-time indoor environments.
- We conduct a comprehensive analysis of the impact of near real-time constraints on a deep learning model's performance in this domain. For example, we analyze the effects of distance-based filtering and modifying the prediction interval.
- We collect a real-world dataset in an office building environment to validate our findings. On this dataset, our modifications improve the IoU significantly for hard classes (from 0.8 to 14.1 on windows, from 9.1 to 16 on doors, and from 32.6 to 44.9 on floor points) while maintaining similar performance on other classes (from 64.9 to 65.2 on ceiling and 57.4 to 55.4 on walls).


# Method

## Superpoint Transformer

We use Superpoint Transformer as our baseline model. It is designed to handle large and small point clouds by computing a superpoint-based intermediate representation. The model can be separated into four key components. First, the point cloud is enriched with handcrafted features such as local linearity or verticality. Second, it is partitioned into a superpoint representation. Third, a graph is built from those superpoints. Finally, an attention-based model segments the nodes in the graph.

## Training Procedure

When training with S3DIS, most works give complete point clouds or spherical sections to the model. However, this is unrealistic in a real-time mobile mapping setting due to the model having access to points in occluded areas. Motivated by use cases similar to others, we structure our training process in two stages. First, a pretraining phase on S3DIS gives us a benchmark to compare to and a simpler task to initialize our model. Then, different fine-tuning phases teach the model to avoid relying on data that wouldn't be visible in real scenarios and to be more robust to noise.

### S3DIS:

Pretraining on S3DIS without adding any new data augmentation proves insufficient in our setup. For example, the model fails to properly detect doors and windows.

### Hidden Point Removal (HPR):

We fine-tune the model with additional data augmentation using an HPR algorithm. To process each input point cloud at training time, a random point in the point cloud is chosen as the center for the algorithm, then points that would not be visible from this center are removed. This randomness simulates different viewpoints and helps the model generalize better by exposing it to various perspectives and occlusion scenarios. This data augmentation makes use of the original data and doesn't require any additional information or simulation.

### Simulating trajectory: S3DIS\_sim:

Given that meshes are available in public datasets such as S3DIS and a digital twin of our robot and sensor is available, we recreate the robot's trajectory in Gazebo within the mesh, from which we acquire a new dataset S3DIS\_sim. The collected sensor data is then split into 10-second intervals to form S3DIS\_10s. Fine-tuning on S3DIS\_sim and S3DIS\_10s provides a more realistic training environment for the model, which translates to higher robustness to our setup's difficulties.

## Noisier Point Clouds and the Lack of RGB Features

Most prior studies, including the original SuperPoint Transformer paper, use RGB as additional input features in the point cloud, which constitutes a very semantically rich feature. To compensate for its absence, we identify the anisotropy feature as a good discriminator for doors and windows against walls and ceilings. Furthermore, we remove the elevation feature which can no longer be reliably computed in our setup. Based on a hyperparameter search, we also remove the surface feature.

Because LiDAR SLAM point clouds are noisier than the point cloud from S3DIS, important features such as linearity might lack robustness due to their sensitivity to noise. To reduce this effect, we compute the features over a larger neighborhood of 500 points (from 50).

## Achieving Near Real-time Inference

### Prediction Interval Selection:

As we infer more often on smaller point clouds, we note a decrease in segmentation quality due to the reduced context. We opt to infer every $n=10$ seconds, as this interval produces results comparable to those obtained by processing the entire map. We provide an extensive analysis of the size of the time window in the paper.

### Computation Trade-off:

Although the authors of the Superpoint Transformer claim an inference time close to 2 seconds, preprocessing can take on average up to 20 seconds for 10-second intervals (on an Intel(R) Xeon(R) Silver 4116 CPU at 2.10 GHz, equipped with 48 CPUs and two GeForce RTX 3090 GPUs, each with 24 GiB of VRAM). As we aim to infer on mapped point clouds in near real-time, we identify the Cut-Pursuit partition algorithm as one major time expenditure. We replace Parallel Cut Pursuit with a voxel grid partition at no significant cost in accuracy for our setup.

# Experiments

## Datasets

### S3DIS

S3DIS is an RGB-D dataset that consists of 6 indoor areas. It is one of the most widely used indoor datasets in the literature, and meshes and point clouds are provided. We discard its RGB features.

### S3DIS\_sim and S3DIS\_10s

We simulate our robot's trajectory in S3DIS with Gazebo. SLAM is performed based on the UAV's trajectory. The resulting point cloud S3DIS\_sim is annotated by aligning the mesh with the resulting point cloud. This point cloud is then further split into 10-second intervals, which serve as the model's inputs. We denote this new data as S3DIS\_10s, which we will open-source.

### Office\_10s

Using our mobile mapping platform, we map a working office consisting of a building with two floors, one hall, and 16 rooms. We manually label the resulting point cloud. Small items such as tables and chairs exhibit significant noise due to the sensor and SLAM limitations.

## Results

We comprehensively analyze our proposed modifications and pretraining schemes for each different dataset. We notice that although our modifications improve the performance of the model across the board (for example, from 0.8 IoU on windows to up to 14.1 with our changes on our collected test data), they do not do so homogeneously across all datasets. We advance hypotheses to explain these differences between datasets. Finally, we analyze the impact of modifying the prediction interval and provide an extensive speed benchmark of every key component of Superpoints Transformers to bring the processing time below the duration of the prediction interval. We show encouraging results of 38% of mIoU with a prediction interval of 10s on real data (from 31.6% with no modifications), going up to 67.6% for 10s intervals of the S3DIS dataset (from 40% with no modifications).

# Conclusion

This paper presents a comprehensive analysis of indoor semantic segmentation under near-real-time processing. Specifically, we examine how to train such models using available datasets and how to adapt them to the constraints of a near real-time mobile mapping scenario. From a use
