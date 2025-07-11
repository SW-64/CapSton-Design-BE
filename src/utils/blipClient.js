// // utils/blipClient.js
// import { pipeline, env } from '@xenova/transformers';
// import { HF_ACCESS_TOKEN } from '../constants/env.constant.js';

// env.HF_ACCESS_TOKEN = HF_ACCESS_TOKEN;
// // LLaVA 모델 로드 (GPU 사용)
// const llavaModel = await pipeline(
//   'image-to-text',
//   'llava-hf/llava-1.5-7b-hf',
//   { device: 'cuda' }, // RTX 4060 GPU 사용
// );

// export default blipModel;
