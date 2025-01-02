const ytStream = require('yt-stream');

app.get('/stream', async (req, res) => {
    const videoURL = req.query.url;

    try {
        const stream = await ytStream.stream(videoURL, { audioOnly: true });
        res.header('Content-Type', 'audio/mpeg');
        stream.stream.pipe(res);
    } catch (error) {
        console.error('Erreur lors du streaming audio:', error);
        res.status(500).send('Erreur lors du streaming audio');
    }
});