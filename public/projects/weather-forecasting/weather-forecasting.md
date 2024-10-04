---
date: 19-09-2021
title : Short Term Weather Forcasting
tags: ["Computer Vision", "Deep Learning", "Weather Forcasting"]
stags: ["CV", "DL", "Weather Forcasting"]
links: ["https://github.com/Kreyparion/Short-Term-Weather-Forcasting-with-CV"]
linksDescription: ["Github"]
image: "unet.png"
---
## Abstract

Short-term cloud density prediction using Satellite images and Computer Vision. The prediction was made using a U-net and a U-net mixed with LSTM.

# Short Term Weather Forcasting
Short-term cloud density prediction using Satellite images and Computer Vision

## Dataset
You can find the dataset online, made by the EUMETSAT datacenter. I personnaly used images in visible wave length from the geostationary satellite MSG.


<img src="VIS8_MSG4-SEVI-MSG15-0100-NA-20190502092744.jpg" width="150" align="left" style="margin-right: 10px;" />
<img src="VIS8_MSG4-SEVI-MSG15-0100-NA-20190502172744.jpg" width="150" />

I took pictures from 9h27 to 17h27 to have a good view of the atlantic ocean, the area I chose to work on


## Development of the project
All the steps are presented in the PowerPoint (in french)

## Adopted solution

The best performing algorithms were the U-net and the U-net mixed with LSTM

<img src="unet.png" width="600"/>

## Results

Working on 200x200 pictures gives us :

<img src="example-gif.gif" />