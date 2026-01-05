import React from 'react';
import { ConfigDoc } from '@/types';
import { IoFlaskSharp } from 'react-icons/io5';

const docs: { [key: string]: ConfigDoc } = {
  'config.name': {
    title: '训练任务名称',
    description: (
      <>
        训练任务的名称。该名称将用于在系统识别任务，并将作为最终模型的文件名。它必须是唯一的，且只能包含字母、数字、下划线和连字符。不允许使用空格或特殊字符。
      </>
    ),
  },
  gpuids: {
    title: 'GPU ID',
    description: (
      <>
        这是将用于训练的 GPU。目前通过 UI 每次任务只能使用单个 GPU。但是，您可以并行启动多个任务，每个任务使用不同的 GPU。
      </>
    ),
  },
  'config.process[0].trigger_word': {
    title: '触发词',
    description: (
      <>
        可选：这将是用触发您的概念或角色的单词或词符。
        <br />
        <br />
        使用触发词时，如果您的标题中不包含触发词，它将自动添加到标题的开头。如果您没有标题，则标题将仅成为触发词。
        如果您希望在标题中使用可变的触发词位置，可以在标题中使用{' '}
        <code>{'[trigger]'}</code> 占位符。它将自动替换为您的触发词。
        <br />
        <br />
        触发词不会自动添加到您的测试提示词中，因此您需要手动添加触发词，或者在测试提示词中同样使用
        <code>{'[trigger]'}</code> 占位符。
      </>
    ),
  },
  'config.process[0].model.name_or_path': {
    title: '名称或路径',
    description: (
      <>
        Huggingface 上的 diffusers 仓库名称，或您想要从中训练的基础模型的本地路径。对于大多数模型，该文件夹需要是 diffusers 格式。对于某些模型（如 SDXL 和 SD1），您可以在此处放置单个 safetensors 检查点的路径。
      </>
    ),
  },
  'datasets.control_path': {
    title: '控制数据集',
    description: (
      <>
        控制数据集的文件需要与训练数据集的文件名相匹配。它们应该是一一对应的文件对。这些图像在训练期间作为控制/输入图像输入。控制图像将被调整大小以匹配训练图像。
      </>
    ),
  },
  'datasets.multi_control_paths': {
    title: '多重控制数据集',
    description: (
      <>
        控制数据集的文件需要与训练数据集的文件名相匹配。它们应该是一一对应的文件对。这些图像在训练期间作为控制/输入图像输入。
        <br />
        <br />
        对于多重控制数据集，控制将按列出的顺序应用。如果模型不需要图像具有相同的纵横比（例如 Qwen/Qwen-Image-Edit-2509），则控制图像不需要匹配目标图像的尺寸或纵横比，它们将自动调整为模型/目标图像的理想分辨率。
      </>
    ),
  },
  'datasets.num_frames': {
    title: '帧数',
    description: (
      <>
        这将设置视频数据集缩减到的帧数。如果此数据集是图像，请将其设置为 1 以表示一帧。如果您的数据集仅包含视频，则将从数据集中的视频中均匀提取帧。
        <br />
        <br />
        最好在训练前将视频修剪到适当的长度。Wan 是每秒 16 帧。执行 81 帧将导致 5 秒的视频。因此，为了获得最佳效果，您希望所有视频都修剪到 5 秒左右。
        <br />
        <br />
        示例：将其设置为 81，并且数据集中有 2 个视频，一个长 2 秒，一个长 90 秒，这将导致每个视频均匀提取 81 帧，使得 2 秒的视频看起来很慢，而 90 秒的视频看起来非常快。
      </>
    ),
  },
  'datasets.do_i2v': {
    title: '执行 I2V',
    description: (
      <>
        对于可以同时处理 I2V（图生视频）和 T2V（文生视频）的视频模型，此选项将此数据集设置为作为 I2V 数据集进行训练。这意味着第一帧将从视频中提取并用作视频的起始图像。如果未设置此选项，则数据集将被视为 T2V 数据集。
      </>
    ),
  },
  'datasets.do_audio': {
    title: 'Do Audio',
    description: (
      <>
        For models that support audio with video, this option will load the audio from the video and resize it to match
        the video sequence. Since the video is automatically resized, the audio may drop or raise in pitch to match the new
        speed of the video. It is important to prep your dataset to have the proper length before training.
      </>
    ),
  },
  'datasets.audio_normalize': {
    title: 'Audio Normalize',
    description: (
      <>
        When loading audio, this will normalize the audio volume to the max peaks. Useful if your dataset has varying audio
        volumes. Warning, do not use if you have clips with full silence you want to keep, as it will raise the volume of those clips.
      </>
    ),
  },
  'datasets.audio_preserve_pitch': {
    title: 'Audio Preserve Pitch',
    description: (
      <>
        When loading audio to match the number of frames requested, this option will preserve the pitch of the audio if
        the length does not match training target. It is recommended to have a dataset that matches your target length,
        as this option can add sound distortions. 
      </>
    ),
  },
  'datasets.flip': {
    title: '水平翻转和垂直翻转',
    description: (
      <>
        您可以通过翻转 x（水平）和/或 y（垂直）轴来动态增强数据集。翻转单个轴将有效地使数据集加倍。它将在正常图像和图像的翻转版本上进行训练。这可能非常有帮助，但请记住它也可能具有破坏性。没有理由把人倒过来训练，翻转人脸可能会混淆模型，因为人的右侧看起来与左侧并不完全相同。对于文本，显然翻转文本不是一个好主意。
        <br />
        <br />
        数据集的控制图像也将被翻转以匹配图像，因此它们将在像素级别上始终匹配。
      </>
    ),
  },
  'train.unload_text_encoder': {
    title: '卸载文本编码器',
    description: (
      <>
        卸载文本编码器将缓存触发词和采样提示词，并从 GPU 卸载文本编码器。数据集的标题将被忽略。
      </>
    ),
  },
  'train.cache_text_embeddings': {
    title: '缓存文本嵌入',
    description: (
      <>
        <small>(实验性)</small>
        <br />
        缓存文本嵌入将处理并将所有文本嵌入从文本编码器缓存到磁盘。文本编码器将从 GPU 卸载。这不适用于动态更改提示词的情况，例如触发词、标题丢弃等。
      </>
    ),
  },
  'model.multistage': {
    title: '训练阶段',
    description: (
      <>
        某些模型具有多阶段网络，在去噪过程中单独训练和使用。最常见的是有 2 个阶段。一个用于高噪声，一个用于低噪声。您可以选择同时训练两个阶段或单独训练它们。如果同时训练，训练器将每隔一定步数在训练每个模型之间交替，并将输出 2 个不同的 LoRA。如果您选择只训练一个阶段，训练器将只训练该阶段并输出单个 LoRA。
      </>
    ),
  },
  'train.switch_boundary_every': {
    title: '切换边界频率',
    description: (
      <>
        训练具有多个阶段的模型时，此设置控制训练器在每个阶段之间切换的频率。
        <br />
        <br />
        对于低显存设置，未在训练的模型将从 GPU 卸载以节省内存。这需要一些时间，因此建议在使用低显存时减少交替频率。对于低显存设置，建议将设置设为 10 或 20。
        <br />
        <br />
        交换发生在批次级别，这意味着它将在梯度累积步骤之间交换。要在单个步骤中训练两个阶段，请将它们设置为每 1 步切换一次，并将梯度累积设置为 2。
      </>
    ),
  },
  'train.force_first_sample': {
    title: '强制首次采样',
    description: (
      <>
        此选项将强制训练器在启动时生成样本。训练器通常仅在尚未训练任何内容时生成第一个样本，但在从现有检查点恢复时不会进行第一次采样。此选项强制每次启动训练器时都进行一次采样。如果您更改了采样提示词并希望立即查看新提示词的效果，这会很有用。
      </>
    ),
  },
  'model.layer_offloading': {
    title: (
      <>
        层卸载{' '}
        <span className="text-yellow-500">
          ( <IoFlaskSharp className="inline text-yellow-500" name="Experimental" /> 实验性)
        </span>
      </>
    ),
    description: (
      <>
        这是一项基于{' '}
        <a className="text-blue-500" href="https://github.com/lodestone-rock/RamTorch" target="_blank">
          RamTorch
        </a>
        的实验性功能。此功能尚处于早期阶段，将会有许多更新和更改，因此请注意它在更新之间可能无法保持一致。它也仅适用于特定模型。
        <br />
        <br />
        层卸载使用 CPU RAM 而不是 GPU RAM 来保存大部分模型权重。假设您有足够的 CPU RAM，这允许在较小的 GPU 上训练更大的模型。这比在纯 GPU RAM 上训练要慢，但 CPU RAM 更便宜且可升级。您仍然需要 GPU RAM 来保存优化器状态和 LoRA 权重，因此通常仍然需要较大的显卡。
        <br />
        <br />
        您还可以选择要卸载的层百分比。通常最好卸载尽可能少的层（接近 0%）以获得最佳性能，但如果需要内存，可以卸载更多。
      </>
    ),
  },
  'model.qie.match_target_res': {
    title: '匹配目标分辨率',
    description: (
      <>
        此设置将使控制图像匹配目标图像的分辨率。Qwen-Image-Edit-2509 的官方推理示例输入的控制图像分辨率为 1MP，无论您生成的尺寸如何。这样做会导致低分辨率训练变得困难，因为无论目标图像多大，都会输入 1MP 的控制图像。匹配目标分辨率将匹配目标图像的分辨率以输入控制图像，从而允许您在使用较小分辨率训练时使用较少的 VRAM。您仍然可以使用不同的纵横比，图像将被调整大小以匹配目标图像中的像素数量。
      </>
    ),
  },
  'train.diff_output_preservation': {
    title: '差分输出保留 (DOP)',
    description: (
      <>
        差分输出保留 (DOP) 是一种有助于在训练期间保留训练概念类别的技术。为此，您必须设置一个触发词以将您的概念与其类别区分开来。例如，您可能正在训练一个名为 Alice 的女性。您的触发词可能是“Alice”。类别是“女人”，因为 Alice 是女人。我们想教模型记住它所知道的关于“女人”类别的知识，同时教它 Alice 的不同之处。在训练期间，训练器将在绕过 LoRA 并将提示词中的触发词替换为类别词的情况下进行预测。将“Alice 的照片”变为“女人的照片”。这个预测称为先验预测。每一步，我们将执行正常的训练步骤，但也使用此先验预测和类别提示词执行另一步骤，以教导我们的 LoRA 保留类别的知识。这不仅应该提高您训练概念的性能，还可以让您做诸如“Alice 站在女人旁边”之类的事情，而不会让两个人都像 Alice。
      </>
    ),
  },
  'train.blank_prompt_preservation': {
    title: '空提示词保留 (BPP)',
    description: (
      <>
        空提示词保留 (BPP) 是一种有助于在无提示词时保留当前模型知识的技术。这不仅有助于模型变得更加灵活，还有助于提高推理过程中概念的质量，尤其是在模型在推理时使用 CFG（无分类器引导）时。在训练期间的每一步，都会使用空提示词并在禁用 LoRA 的情况下进行先验预测。然后将此预测用作带有空提示词的额外训练步骤的目标，以在没有给出提示词时保留模型的知识。这有助于模型不过拟合提示词并保留其泛化能力。
      </>
    ),
  },
  'train.do_differential_guidance': {
    title: '差分引导',
    description: (
      <>
        差分引导将在训练期间放大模型预测与目标之间的差异，以生成新的目标。差分引导比例将是差异的乘数。这仍处于实验阶段，但在我的测试中，它使模型训练更快，并在我尝试过的每种情况下都能更好地学习细节。
        <br />
        <br />
        这个想法是，正常的训练会逐渐接近目标，但从未真正达到目标，因为它受限于学习率。通过差分引导，我们将新目标的差异放大到超出实际目标的范围，这将使模型学习达到或超过目标，而不是达不到目标。
        <br />
        <br />
        <img src="/imgs/diff_guidance.png" alt="Differential Guidance Diagram" className="max-w-full mx-auto" />
      </>
    ),
  },
  'dataset.num_repeats': {
    title: 'Num Repeats',
    description: (
      <>
        Number of Repeats will allow you to repeate the items in a dataset multiple times. This is useful when you are using multiple
        datasets and want to balance the number of samples from each dataset. For instance, if you have a small dataset of 10 images 
        and a large dataset of 100 images, you can set the small dataset to have 10 repeats to effectively make it 100 images, making
        the two datasets occour equally during training.
      </>
    ),
  },
};

export const getDoc = (key: string | null | undefined): ConfigDoc | null => {
  if (key && key in docs) {
    return docs[key];
  }
  return null;
};

export default docs;
