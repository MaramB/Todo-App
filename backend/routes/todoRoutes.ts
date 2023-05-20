import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;

        const todos = await prisma.todo.findMany({
            where: { userId },
        });

        res.json({ todos });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        const { title } = req.body;

        const todo = await prisma.todo.create({
            data: {
                title,
                user: { connect: { id: userId } },
            },
        });

        res.json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

export default router;