#!/bin/bash
# 预下载 LTX-2 模型到 HuggingFace 默认缓存目录
cd /workspace/

# 来自于 tree -a /workspace/.hf_home/hub/*/snapshots/*/ | sed 's/ -> .*//'

export HF_HUB_ENABLE_HF_TRANSFER=1

# 下载 LTX-2 模型的所有文件
hf download Lightricks/LTX-2 \
    "audio_vae/config.json" \
    "audio_vae/diffusion_pytorch_model.safetensors" \
    "connectors/config.json" \
    "connectors/diffusion_pytorch_model.safetensors" \
    "text_encoder/config.json" \
    "text_encoder/generation_config.json" \
    "text_encoder/model-00001-of-00011.safetensors" \
    "text_encoder/model-00002-of-00011.safetensors" \
    "text_encoder/model-00003-of-00011.safetensors" \
    "text_encoder/model-00004-of-00011.safetensors" \
    "text_encoder/model-00005-of-00011.safetensors" \
    "text_encoder/model-00006-of-00011.safetensors" \
    "text_encoder/model-00007-of-00011.safetensors" \
    "text_encoder/model-00008-of-00011.safetensors" \
    "text_encoder/model-00009-of-00011.safetensors" \
    "text_encoder/model-00010-of-00011.safetensors" \
    "text_encoder/model-00011-of-00011.safetensors" \
    "text_encoder/model.safetensors.index.json" \
    "tokenizer/added_tokens.json" \
    "tokenizer/chat_template.jinja" \
    "tokenizer/special_tokens_map.json" \
    "tokenizer/tokenizer.json" \
    "tokenizer/tokenizer.model" \
    "tokenizer/tokenizer_config.json" \
    "transformer/config.json" \
    "transformer/diffusion_pytorch_model-00001-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00002-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00003-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00004-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00005-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00006-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00007-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model-00008-of-00008.safetensors" \
    "transformer/diffusion_pytorch_model.safetensors.index.json" \
    "vae/config.json" \
    "vae/diffusion_pytorch_model.safetensors" \
    "vocoder/config.json" \
    "vocoder/diffusion_pytorch_model.safetensors"
