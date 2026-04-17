import type { LearningJournalItem } from '@/shared/types'

export const initialLearningJournals: LearningJournalItem[] = [
  {
    id: 'journal-1',
    title: '深度学习入门学习笔记',
    excerpt: '记录深度学习的基础知识，包括神经网络的基本原理、反向传播算法等核心概念。',
    content: `# 深度学习入门学习笔记

## 什么是深度学习

深度学习是机器学习的一个分支，它使用多层神经网络来学习数据的层次化表示。

## 神经网络基础

### 神经元结构
- 输入层：接收原始数据
- 隐藏层：进行特征提取和转换
- 输出层：产生预测结果

### 激活函数
1. **Sigmoid**: 将输入压缩到 (0,1) 区间
2. **ReLU**: 线性整流函数，计算简单，收敛快
3. **Tanh**: 双曲正切函数，输出范围 (-1,1)

## 反向传播算法

反向传播是训练神经网络的核心算法，通过计算损失函数对每个权重的梯度来更新参数。

### 学习心得
- 理解梯度下降的直观意义很重要
- 学习率的选择对模型训练影响很大
- 过拟合是常见问题，需要使用正则化等技术

## 下一步计划
- 学习卷积神经网络 (CNN)
- 实践图像分类项目
- 探索 Transformer 架构
`,
    category: '深度学习',
    tags: ['深度学习', '神经网络', '基础'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'journal-2',
    title: 'Transformer 模型实验记录',
    excerpt: '记录使用 Transformer 模型进行文本分类的实验过程和结果分析。',
    content: `# Transformer 模型实验记录

## 实验目的
探索 Transformer 模型在文本分类任务上的表现。

## 实验环境
- 框架：PyTorch
- 数据集：IMDB 电影评论情感分析
- 模型：BERT-base

## 实验步骤

### 1. 数据预处理
\`\`\`python
from transformers import BertTokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
\`\`\`

### 2. 模型加载
\`\`\`python
from transformers import BertForSequenceClassification
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
\`\`\`

### 3. 训练配置
- Batch Size: 32
- Learning Rate: 2e-5
- Epochs: 4

## 实验结果
- 训练集准确率：98.5%
- 验证集准确率：92.3%
- 测试集准确率：91.8%

## 心得体会
1. Transformer 模型的预训练非常重要
2. 微调阶段需要较小的学习率
3. 注意力机制让模型能够关注关键词

## 改进方向
- 尝试不同的预训练模型
- 调整超参数
- 增加数据增强
`,
    category: '自然语言处理',
    tags: ['Transformer', 'BERT', '实验'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'journal-3',
    title: 'AI 伦理与技术探索思考',
    excerpt: '对 AI 技术发展中的伦理问题和技术边界的个人思考和探索。',
    content: `# AI 伦理与技术探索思考

## 背景
随着 AI 技术的快速发展，伦理问题日益受到关注。

## 主要伦理问题

### 1. 偏见与公平性
- 训练数据中的偏见会被模型放大
- 需要确保算法决策的公平性
- 多样性数据的重要性

### 2. 隐私保护
- 数据收集与使用的边界
- 联邦学习等隐私保护技术
- 用户知情同意

### 3. 可解释性
- 黑盒模型的决策过程不透明
- 需要提高模型的可解释性
- 建立信任和问责机制

## 技术探索

### 负责任的 AI 开发
1. **数据审计**: 检查数据集中的偏见
2. **模型测试**: 评估不同群体的表现差异
3. **透明文档**: 记录模型的局限性和风险

### 个人思考
- 技术发展需要与伦理考量并行
- 开发者应承担社会责任
- 跨学科合作的重要性

## 参考资料
- [AI Ethics Guidelines](https://example.com)
- [Responsible AI Practices](https://example.com)
`,
    category: '技术思考',
    tags: ['AI 伦理', '技术探索', '思考'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
