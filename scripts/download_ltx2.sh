#!/bin/bash
# 预下载 LTX-2 模型到 HuggingFace 默认缓存目录
cd /workspace/

pip install -U huggingface_hub
hf download Lightricks/LTX-2

git clone https://github.com/xiaoxidashen/ai-toolkit.git
cd ai-toolkit
pip install -r requirements.txt
