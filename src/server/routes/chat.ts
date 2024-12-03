import express from 'express';
import { ChatMessage } from '../models/ChatMessage';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// 获取聊天历史
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'name');
      
    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

export default router; 