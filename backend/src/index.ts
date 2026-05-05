import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

app.listen(PORT, () => {
	console.log(`server on: http://localhost:${PORT}`);
})