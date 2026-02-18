import { Router, Request, Response } from 'express';
import { pool } from "../node-db";
import {getConnection} from "oracledb";
import {RowDataPacket} from "mysql2";

const router = Router();

router.get('/nodeList', async (req: Request, res: Response) => {
    let conn;

    const page = parseInt(req.query.page as string) || 1;
    const rowSize = 10;
    const start = (page - 1) * rowSize;

    try {
        conn = await pool.getConnection();

        const listSql = `
            SELECT no, subject, name, DATE_FORMAT(regdate, '%Y-%m-%d') AS dbday, hit
            FROM board
            ORDER BY no DESC
            LIMIT ?, ?
        `;

        const totalSql = `SELECT CEIL(COUNT(*) / ?) AS totalpage FROM board`;

        const [listRows] = await conn.query(listSql, [start, rowSize]);
        const [totalRows] = await conn.query(totalSql, [rowSize]);

        const totalPages:number = (totalRows as { totalpage: number }[])[0].totalpage;
        const startPage:number = Math.floor((page - 1) / rowSize) * rowSize + 1;
        let endPage:number = startPage + rowSize - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
        }

        res.json({
            currentPage: page,
            totalPages: totalPages,
            boardList: listRows,
            startPage: startPage,
            endPage: endPage
        })
    } catch (error) {
        console.error("DB ERROR:", error);
        res.status(500).json({ message: "Database Error" });
    } finally {
        if (conn) conn.release();
    }
});

router.post('/nodeInsert', async (req: Request, res: Response) => {
    let conn;
    const {name, subject, content, password} = req.body;

    try {
        conn = await pool.getConnection();

        const insertSql = `
            INSERT INTO board (name, subject, content, password)
            VALUES(?, ?, ?, ?);
        `

        await conn.query(insertSql, [name, subject, content, password]);
        res.json({ msg: "success"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "fail" });
    } finally {
        if (conn) conn.release();
    }
})

router.get('/nodeDetail', async (req: Request, res: Response) => {
    let conn;
    const no = req.query.no;

    try {
        conn = await pool.getConnection();

        const hitIncrementSql = 'UPDATE board SET hit = hit + 1 WHERE no = ?';
        await conn.execute(hitIncrementSql, [no]);

        const detailSql = `
            SELECT no, subject, content, name, hit, DATE_FORMAT(regdate, '%Y-%m-%d') AS dbday
            FROM board WHERE no = ?
        `;
        const [rows] = await conn.execute<RowDataPacket[]>(detailSql, [no]);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "fail" });
    } finally {
        if (conn) conn.release();
    }
})

router.post('/nodeDelete', async (req: Request, res: Response) => {
    const {no, password} = req.body;
    let conn;

    try {
        conn = await pool.getConnection();

        const checkSql = `SELECT COUNT(*) AS cnt FROM board WHERE no = ? AND password = ?`;
        const [checkRows] = await conn.execute<RowDataPacket[]>(checkSql, [no, password]);
        const count = checkRows[0].cnt;

        if (count === 0) {
            return res.json({ msg: 'notFound' })
        }

        const deleteSql = `DELETE FROM board WHERE no = ?`;
        await conn.execute(deleteSql, [no]);

        res.json({ msg: "success"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "fail" });
    } finally {
        if (conn) conn.release();
    }
})

router.get('/nodeUpdateDetail', async (req: Request, res: Response) => {
    let conn;
    const no = req.query.no;

    try {
        conn = await pool.getConnection();

        const detailSql = `
            SELECT no, subject, content, name, hit, DATE_FORMAT(regdate, '%Y-%m-%d') AS dbday
            FROM board WHERE no = ?
        `;
        const [rows] = await conn.execute<RowDataPacket[]>(detailSql, [no]);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "fail" });
    } finally {
        if (conn) conn.release();
    }
})

router.post('/nodeUpdate', async (req: Request, res: Response) => {
    let conn;
    const {no, subject, name, content, password} = req.body;

    try {
        conn = await pool.getConnection();

        const checkSql = 'SELECT COUNT(*) AS cnt FROM board WHERE no = ? AND password = ?';
        const [checkRows] = await conn.execute<RowDataPacket[]>(checkSql, [no, password]);
        const count = checkRows[0].cnt;

        if (count === 0) {
            return res.json({ msg: 'notFound' })
        }

        const updateSql = `UPDATE board SET subject = ?, name = ?, content = ? WHERE no = ?`
        await conn.execute(updateSql, [subject, name, content, no]);

        res.json({ msg: "success"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "fail" });
    } finally {
        if (conn) conn.release();
    }
})

export default router;