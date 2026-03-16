const express = require('express'); const app = express(); app.listen(5005, () => console.log('Listening 5005')).on('error', e => console.error(e));
